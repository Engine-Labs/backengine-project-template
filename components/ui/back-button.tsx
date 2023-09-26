"use client";

import { MouseEventHandler } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    router.back();
  };

  return <Button onClick={handleClick}>Back</Button>;
}
