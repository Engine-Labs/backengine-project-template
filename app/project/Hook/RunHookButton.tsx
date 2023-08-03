"use client";

import { MouseEventHandler, useState } from "react";
import type { Metadata } from "../Hooks";
import RunHook from "./RunHook";

export default function RunHookButton({
  hookMetadata,
}: {
  hookMetadata: Metadata;
}) {
  const [isRunHook, setIsRunHook] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    setIsRunHook(!isRunHook);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="mt-4 rounded-md bg-white text-black px-4 py-2 flex space-x-2 items-center"
      >
        <div>Run {hookMetadata.name}</div>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
          />
        </svg>
      </button>
      {isRunHook && <RunHook hookMetadata={hookMetadata} />}
    </>
  );
}
