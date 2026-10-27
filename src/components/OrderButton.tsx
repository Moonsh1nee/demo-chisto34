"use client";

import { useApp } from "./AppProvider";

export function OrderButton({ className = "btn sun", children }: { className?: string; children: React.ReactNode }) {
  const { openOrder } = useApp();
  return (
    <button type="button" className={className} onClick={openOrder}>
      {children}
    </button>
  );
}
