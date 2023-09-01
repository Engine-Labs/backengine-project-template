"use client";

import { MouseEventHandler, useState } from "react";
import type { Metadata } from "../Hooks";
import Usage from "../Usage";
import RunHook from "./RunHook";

const parseTextClass = (entityType: "TABLE" | "JOIN_TABLE" | "VIEW") => {
  if (entityType === "TABLE") {
    return "text-brand-green";
  }

  if (entityType === "JOIN_TABLE") {
    return "text-brand-blue";
  }

  return "text-brand-lavender";
};

const parseBackgroundClass = (entityType: "TABLE" | "JOIN_TABLE" | "VIEW") => {
  if (entityType === "TABLE") {
    return "bg-brand-green";
  }

  if (entityType === "JOIN_TABLE") {
    return "bg-brand-blue";
  }

  return "bg-brand-lavender";
};

export default function Hook({ hookMetadata }: { hookMetadata: Metadata }) {
  const [isShowRun, setIsShowRun] = useState(false);

  const { name, entityType, location } = hookMetadata;

  const textClass = parseTextClass(entityType);
  const backgroundClass = parseBackgroundClass(entityType);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    setIsShowRun(!isShowRun);
  };

  return (
    <div className="w-full text-sm rounded-md border py-4 px-4">
      <div className="flex justify-between">
        <div className={`flex items-center font-bold flex-1 ${textClass}`}>
          {name}
        </div>
        <div className="flex items-center justify-end basis-[150px]">
          <span className={`rounded-lg px-2 py-1 text-xs ${backgroundClass}`}>
            {entityType.replace("_", " ")}
          </span>
        </div>
      </div>
      <code className="text-xs font-mono">{location}</code>
      <Usage hookMetadata={hookMetadata} />
      {isShowRun && <RunHook hookMetadata={hookMetadata} />}
      {!isShowRun && (
        <button
          className="p-4 space-x-2 bg-white text-black mt-5 w-[200px] rounded-md py-2 px-[10px] flex items-center justify-center"
          onClick={handleClick}
        >
          <span>Run {hookMetadata.name}</span>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{
              height: "20px",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
