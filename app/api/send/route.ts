import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Rate limiting store (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// Input validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string()
    .email("Invalid email address")
    .max(254, "Email must be less than 254 characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
    .regex(/^[\s\S]*$/, "Message contains invalid characters")
});

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 requests per window

  const userLimit = rateLimit.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (userLimit.count >= maxRequests) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

// Get client IP
function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return "unknown";
}

// Sanitize input
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, ""); // Remove event handlers
}

export async function POST(req: Request) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Rate limiting
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    
    // Sanitize inputs
    const sanitizedBody = {
      name: sanitizeInput(body.name || ""),
      email: sanitizeInput(body.email || ""),
      message: sanitizeInput(body.message || "")
    };

    // Validate input
    const validationResult = contactSchema.safeParse(sanitizedBody);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Validation failed", 
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified domain
      to: "ahadsheikh1814@outlook.com",
      subject: `New message from ${name} - Portfolio Contact`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `New message from ${name} (${email}):\n\n${message}`,
    });

    // Log successful submission (without sensitive data)
    console.log(`Contact form submitted successfully from IP: ${clientIP}`);

    return NextResponse.json({ 
      success: true, 
      message: "Message sent successfully",
      data: { id: data.data?.id || 'unknown' } 
    });

  } catch (error) {
    // Log error for debugging
    console.error("Contact form error:", error);
    
    // Return generic error message to client
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to send message. Please try again later." 
      },
      { status: 500 }
    );
  }
}
