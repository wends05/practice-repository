"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexQueryCacheProvider } from "convex-helpers/react/cache/provider";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ConvexProvider client={convex}>
			<ConvexQueryCacheProvider>
				<Toaster />
				{children}
			</ConvexQueryCacheProvider>
		</ConvexProvider>
	);
}
