import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WendsPage() {
  return (
    <div className="flex flex-col p-10 items-center space-y-5">
      <div>Hello world</div>
      <div className="flex flex-col gap-5">
        <Link href={"/wends-pages/events"}>
          <Button className="w-full">Register to an Event</Button>
        </Link>
        <Link href={"/wends-pages/scan"}>
          <Button className="w-full">Sample Registration Check in Page</Button>
        </Link>
      </div>
    </div>
  );
}
