import type { Metadata } from "./Hooks";
import Usage from "./Usage";

export default function Hook({ hookMetadata }: { hookMetadata: Metadata }) {
  const { name, entity, location } = hookMetadata;

  const textClass =
    entity === "TABLE" ? "text-brand-green" : "text-brand-lavender";
  const backgroundClass =
    entity === "TABLE" ? "bg-brand-green" : "bg-brand-lavender";

  return (
    <div className="w-full text-sm rounded-md border py-4 px-4">
      <div className="flex justify-between">
        <div className={`flex items-center font-bold flex-1 ${textClass}`}>
          {name}
        </div>
        <div className="flex items-center justify-end basis-[150px]">
          <span className={`rounded-lg px-2 py-1 text-xs ${backgroundClass}`}>
            {entity}
          </span>
        </div>
      </div>
      <code className="text-xs font-mono">{location}</code>
      <Usage hookMetadata={hookMetadata} />
    </div>
  );
}
