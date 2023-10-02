import Image from "next/image";
import React from "react";

export default function BackengineLogo() {
  return (
    <>
      <Image
        src="/logo-dark.png"
        alt="backengine"
        width="160"
        height="20"
        className="block dark:hidden"
      />
      <Image
        src="/logo-light.png"
        alt="backengine"
        width="160"
        height="20"
        className="hidden dark:block"
      />
    </>
  );
}
