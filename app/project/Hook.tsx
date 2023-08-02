import type { Metadata } from "./Hooks";

export default function Hook({ hookMetadata }: { hookMetadata: Metadata }) {
  const { name, entity, location, usage } = hookMetadata;

  const textClass =
    entity === "TABLE" ? "text-brand-green" : "text-brand-lavender";
  const backgroundClass =
    entity === "TABLE" ? "bg-brand-green" : "bg-brand-lavender";

  return (
    <div key={name} className="w-full text-sm rounded-md border py-4 px-4">
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
      <div className="text-xs pt-6">
        <div className="flex items-center font-mono bg-[#1C1C25] px-4 py-6 rounded-md relative justify-between">
          {usage}
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer hover:stroke-brand-green"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
