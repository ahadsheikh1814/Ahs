"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconSend } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat, loading]);

  async function ask(suggestionText?: string) {
    const userMsg = suggestionText || message.trim();
    if (!userMsg || loading) return;

    setMessage("");
    setChat((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${res.status}`);
      }

      const data = await res.json();

      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer || "Sorry, I couldn't answer that.",
        },
      ]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    }

    setLoading(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  const suggestions = [
    "Who is Ahad?",
    "What tech stack does he use?",
    "What projects has Ahad built?",
    "How can I contact Ahad?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] py-2">
      {/* Chat Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-2 space-y-2">
        {chat.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-xl font-medium mb-1 text-gray-900 dark:text-gray-100">
              Ask Ahad AI
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-3 text-sm">
              Ask me anything about Ahad
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => ask(suggestion)}
                  className="px-2.5 py-1.5 text-sm text-left rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-gray-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {chat.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-2.5 py-1.5 rounded-md text-sm ${
                    msg.role === "user"
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        div: ({ children }) => <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">{children}</div>
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 dark:bg-gray-800 px-2.5 py-1.5 rounded-md">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t dark:border-gray-800 pt-2">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Ahad..."
            disabled={loading}
            className="w-full px-2.5 py-1.5 pr-9 rounded-md border border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600 focus:outline-none text-sm disabled:bg-gray-50 dark:disabled:bg-gray-900 dark:bg-gray-900 dark:text-gray-100"
          />
          <button
            onClick={() => ask()}
            disabled={!message.trim() || loading}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-md bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
          >
            <IconSend className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}