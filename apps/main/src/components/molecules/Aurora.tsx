// @ts-nocheck
"use client";
import { useState, memo, Suspense } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { MeshGradient } from "@mesh-gradient/react";

interface IAuroraProps {
  children?: React.ReactNode;
  dark?: boolean;
  className?: ClassNameValue;
}



// Fallback component while MeshGradient loads
const AuroraFallback = ({
  dark,
  position,
}: {
  dark: boolean;
  position: string;
}) => (
  <div className={twMerge("left-0 top-0 -z-10 min-h-svh w-full", position)}>
    <div
      className="h-full w-full"
      style={{
        background: dark
          ? "linear-gradient(45deg, #000, #222, #444)"
          : "linear-gradient(45deg, #d500f9, #6366f1, #ec4899, #a855f7, #3b82f6)",
      }}
    />
  </div>
);

function AuroraGradient({
  dark,
  palettes,
}: {
  dark: boolean;
  palettes: [string, string, string, string];
}) {
  return (
    <MeshGradient
      className="h-full w-full fixed -z-10"
      options={{
        colors: palettes,
        animationSpeed: 0.5,
      }}
    />
  );
}

function Aurora({ children, dark = false, className }: IAuroraProps) {
  const palettes: [string, string, string, string] = dark
    ? ["#000000", "#222222", "#444444", "#555555"]
    : ["#d500f9", "#6366f1", "#ec4899", "#a855f7"];

  const position = dark ? "fixed" : "absolute";
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 flex h-[96svh] w-[96svw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-zinc-700 max-sm:h-svh max-sm:w-screen",
        position,
        className,
      )}
    >
      <div className="z-50 w-full overflow-scroll p-4">{children}</div>
      <Suspense fallback={<AuroraFallback dark={dark} position={position} />}>
        {isClient ? (
          <AuroraGradient dark={dark} palettes={palettes} />
        ) : (
          <AuroraFallback dark={dark} position={position} />
        )}
      </Suspense>
    </div>
  );
}

export default memo(Aurora);
