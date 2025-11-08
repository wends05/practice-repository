import type React from "react";
import ReturnButton from "@/components/ReturnButton";

export default function EventPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-10 px-8 h-screen space-y-2">
      <ReturnButton />
      <div className="h-full pb-10">{children}</div>
    </div>
  );
}
