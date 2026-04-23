import {
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
} from "react";

import { cn } from "@/lib/utils";

const morphTime = 1.4;
const cooldownTime = 5;

const useMorphingText = ({
  texts,
  filterId,
  layersRef,
}: {
  texts: string[];
  filterId: string;
  layersRef: RefObject<HTMLSpanElement | null>;
}) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(cooldownTime);
  const timeRef = useRef<number | null>(null);

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const syncLayerFilter = (isMorphing: boolean) => {
    const layers = layersRef.current;

    if (!layers) {
      return;
    }

    layers.style.filter = isMorphing ? `url(#${filterId}) blur(0.6px)` : "none";
  };

  const syncTextContent = () => {
    const currentText = text1Ref.current;
    const nextText = text2Ref.current;

    if (!currentText || !nextText) {
      return;
    }

    currentText.textContent = texts[textIndexRef.current % texts.length];
    nextText.textContent = texts[(textIndexRef.current + 1) % texts.length];
  };

  const setStyles = (fraction: number) => {
    const currentText = text1Ref.current;
    const nextText = text2Ref.current;

    if (!currentText || !nextText) {
      return;
    }

    syncLayerFilter(true);
    syncTextContent();

    const safeFraction = Math.max(fraction, 0.0001);
    const invertedFraction = Math.max(1 - fraction, 0.0001);

    nextText.style.filter = `blur(${Math.min(8 / safeFraction - 8, 100)}px)`;
    nextText.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    currentText.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
    currentText.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;
  };

  const doMorph = () => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current += 1;
    }
  };

  const doCooldown = () => {
    const currentText = text1Ref.current;
    const nextText = text2Ref.current;

    morphRef.current = 0;
    syncLayerFilter(false);
    syncTextContent();

    if (!currentText || !nextText) {
      return;
    }

    currentText.style.filter = "none";
    currentText.style.opacity = "100%";
    nextText.style.filter = "none";
    nextText.style.opacity = "0%";
  };

  useEffect(() => {
    if (texts.length < 2) {
      return;
    }

    let animationFrameId = 0;

    doCooldown();

    const animate = (time: number) => {
      if (timeRef.current === null) {
        timeRef.current = time;
      }

      const dt = (time - timeRef.current) / 1000;
      timeRef.current = time;
      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) {
        doMorph();
      } else {
        doCooldown();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      syncLayerFilter(false);
      timeRef.current = null;
    };
  }, [filterId, texts]);

  return { text1Ref, text2Ref };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

function MorphingLayers({
  filterId,
  texts,
}: {
  filterId: string;
  texts: string[];
}) {
  const layersRef = useRef<HTMLSpanElement>(null);
  const { text1Ref, text2Ref } = useMorphingText({
    texts,
    filterId,
    layersRef,
  });
  const currentText = texts[0] ?? "";
  const nextText = texts[1] ?? currentText;

  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 block"
      ref={layersRef}
    >
      <span
        ref={text1Ref}
        className="absolute inset-0 block whitespace-nowrap"
        style={{ opacity: 1 }}
      >
        {currentText}
      </span>
      <span
        ref={text2Ref}
        className="absolute inset-0 block whitespace-nowrap"
        style={{ opacity: 0 }}
      >
        {nextText}
      </span>
    </span>
  );
}

function SvgFilters({ filterId }: { filterId: string }) {
  return (
    <svg
      aria-hidden="true"
      className="fixed h-0 w-0"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id={filterId}>
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function MorphingText({ texts, className }: MorphingTextProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const filterId = `morph-${useId().replace(/:/g, "")}`;

  const staticText = texts[0] ?? "";
  const longestText = texts.reduce((longest, candidate) => {
    return candidate.length > longest.length ? candidate : longest;
  }, staticText);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    syncPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncPreference);

      return () => {
        mediaQuery.removeEventListener("change", syncPreference);
      };
    }

    mediaQuery.addListener(syncPreference);

    return () => {
      mediaQuery.removeListener(syncPreference);
    };
  }, []);

  if (!staticText) {
    return null;
  }

  if (!isMounted || prefersReducedMotion || texts.length < 2) {
    return (
      <span className={cn("inline-block whitespace-nowrap", className)}>
        {staticText}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative inline-grid align-baseline whitespace-nowrap",
        className,
      )}
    >
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {longestText}
      </span>
      <span className="sr-only">{staticText}</span>
      <MorphingLayers filterId={filterId} texts={texts} />
      <SvgFilters filterId={filterId} />
    </span>
  );
}
