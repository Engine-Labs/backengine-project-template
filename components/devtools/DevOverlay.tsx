import React from "react";

type DevOverlayProps = {
  children: React.ReactNode;
  name: string;
};

export default function DevOverlay({ children, name }: DevOverlayProps) {
  if (process.env.NODE_ENV === "production") {
    return children;
  }

  return (
    <div className="relative group">
      <div className="hidden group-hover:block absolute bg-red-600 text-white text-sm p-2">
        {name}
      </div>
      <div className="w-full h-full hidden group-hover:block absolute border border-red-600 pointer-events-none"></div>
      {children}
    </div>
  );
}
