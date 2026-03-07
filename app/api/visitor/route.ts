import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

const redis = Redis.fromEnv();

export async function GET() {
  const cookieStore = await cookies();
  const visitor = cookieStore.get("visitor");

  let count = await redis.get<number>("visitors");

  if (!visitor) {
    count = await redis.incr("visitors");

    cookieStore.set("visitor", "true", {
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return Response.json({ count });
}