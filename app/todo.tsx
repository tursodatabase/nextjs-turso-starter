"use client";

import { useTransition, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { InferSelectModel } from "drizzle-orm";

import { todosTable } from "@/db/schema";
import { removeTodoAction, toggleTodoAction } from "./actions";

// Dynamically import react-confetti to avoid SSR issues
const ReactConfetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});

export function Todo({ item }: { item: InferSelectModel<typeof todosTable> }) {
  const [isPending, startTransition] = useTransition();
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Update window size when mounted
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial size
    updateWindowSize();

    // Add event listener
    window.addEventListener("resize", updateWindowSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  // Handle toggle and trigger confetti if todo becomes completed
  const handleToggle = async () => {
    // If the todo is currently not completed, toggling will complete it
    if (!item.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
    }

    startTransition(async () => {
      await toggleTodoAction(item.id);
    });
  };

  const handleRemove = async () => {
    startTransition(async () => {
      await removeTodoAction(item.id);
    });
  };

  return (
    <li className="flex items-center justify-between rounded bg-white/5 p-6 text-white">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <div className="flex w-full items-center space-x-3">
        <button
          className="p-1 text-3xl"
          onClick={handleToggle}
          disabled={isPending}
        >
          {item.completed ? "✅" : "☑️"}
        </button>
        <span className="flex-1">{item.description}</span>
      </div>
      <button
        className="p-1 flex items-center justify-between transition hover:bg-white/10 rounded"
        onClick={handleRemove}
        disabled={isPending}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
