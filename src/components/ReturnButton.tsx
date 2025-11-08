"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ReturnButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant={"ghost"} size={"icon"}>
      <ArrowLeftIcon />
    </Button>
  );
}
