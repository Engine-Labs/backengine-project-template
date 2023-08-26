"use client";

import { useState } from "react";
import type { Metadata } from "../Hooks";

const parseDir = (entityType: "TABLE" | "VIEW") => {
  if (entityType === "TABLE") {
    return "tables";
  }

  return "views";
};

export default function RunHook({ hookMetadata }: { hookMetadata: Metadata }) {
  const [isError, setIsError] = useState(false);

  if (hookMetadata.entityType === "JOIN_TABLE") {
    // TODO: handle other types
    return null;
  }

  let Component = () => null;
  if (!isError) {
    try {
      const sanitisedName = hookMetadata.name.replace("use", "");
      Component = require(`@/__backengine__/components/${parseDir(
        hookMetadata.entityType
      )}/${sanitisedName}`).default;
    } catch {
      setIsError(true);
    }
  }

  if (isError) {
    return <div className="pt-5 text-red-700">Error running hook</div>;
  }

  return <Component />;
}
