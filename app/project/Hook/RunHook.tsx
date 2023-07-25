"use client";

import { useState } from "react";
import type { Metadata } from "../Hooks";

const parseDir = (entityType: "TABLE" | "VIEW" | "JOIN_TABLE") => {
  if (entityType === "TABLE") {
    return "tables";
  }

  if (entityType === "JOIN_TABLE") {
    return "joinTables";
  }

  return "views";
};

export default function RunHook({ hookMetadata }: { hookMetadata: Metadata }) {
  const [isError, setIsError] = useState(false);

  let Component = () => null;
  if (!isError) {
    try {
      const sanitisedName = hookMetadata.name.replace("use", "");
      Component = require(
        `@/__backengine__/components/${parseDir(
          hookMetadata.entityType
        )}/${sanitisedName}`
      ).default;
    } catch {
      setIsError(true);
    }
  }

  if (isError) {
    return <div className="pt-5 text-red-700">Error running hook</div>;
  }

  return <Component />;
}
