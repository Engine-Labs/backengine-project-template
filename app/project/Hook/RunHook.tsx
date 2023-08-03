import { useState } from "react";
import type { Metadata } from "../Hooks";

export default function RunHook({ hookMetadata }: { hookMetadata: Metadata }) {
  const [isError, setIsError] = useState(false);

  let Component = () => null;
  if (!isError) {
    try {
      const sanitisedName = hookMetadata.name.replace("use", "");
      Component =
        require(`@/__backengine__/components/${sanitisedName}`).default;
    } catch {
      setIsError(true);
    }
  }

  if (isError) {
    return <div className="pt-5 text-red-700">Error running hook</div>;
  }

  return <Component />;
}
