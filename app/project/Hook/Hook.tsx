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
  const { name, entityType, location } = hookMetadata;

  const textClass = parseTextClass(entityType);
  const backgroundClass = parseBackgroundClass(entityType);

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
      <RunHook hookMetadata={hookMetadata} />
    </div>
  );
}
