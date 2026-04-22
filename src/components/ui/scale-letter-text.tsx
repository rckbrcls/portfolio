import { Fragment, type CSSProperties, useState } from "react";

interface ScaleLetterTextProps {
  text: string;
  className?: string;
}

interface WordToken {
  kind: "word";
  key: string;
  letters: Array<{
    index: number;
    key: string;
    value: string;
  }>;
}

interface SpaceToken {
  kind: "space";
  key: string;
  value: string;
}

type ScaleLetterToken = WordToken | SpaceToken;

const SPACE_PATTERN = /^\s+$/;

function tokenizeText(text: string): ScaleLetterToken[] {
  const segments = text.split(/(\s+)/);
  const tokens: ScaleLetterToken[] = [];
  let currentIndex = 0;

  segments.forEach((segment, segmentIndex) => {
    if (!segment) {
      return;
    }

    if (SPACE_PATTERN.test(segment)) {
      tokens.push({
        kind: "space",
        key: `space-${segmentIndex}-${currentIndex}`,
        value: segment,
      });
      currentIndex += segment.length;
      return;
    }

    const startIndex = currentIndex;

    tokens.push({
      kind: "word",
      key: `word-${segmentIndex}-${startIndex}`,
      letters: segment.split("").map((letter, letterIndex) => ({
        index: startIndex + letterIndex,
        key: `letter-${startIndex + letterIndex}`,
        value: letter,
      })),
    });

    currentIndex += segment.length;
  });

  return tokens;
}

export default function ScaleLetterText({
  text,
  className = "",
}: ScaleLetterTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const tokens = tokenizeText(text);

  const getLetterStyle = (index: number): CSSProperties => {
    const isHovered = hoveredIndex === index;
    const distance = hoveredIndex >= 0 ? Math.abs(index - hoveredIndex) : 0;

    let scale = 1;
    let translateY = 0;
    let rotateX = 0;
    let brightness = 1;

    if (hoveredIndex >= 0) {
      if (isHovered) {
        scale = 1.4;
        translateY = -20;
        rotateX = -15;
        brightness = 1.3;
      } else if (distance === 1) {
        scale = 1.2;
        translateY = -10;
        rotateX = -8;
        brightness = 1.15;
      } else if (distance === 2) {
        scale = 1.1;
        translateY = -5;
        rotateX = -4;
        brightness = 1.08;
      }
    }

    return {
      transform: `
        perspective(1000px)
        translateY(${translateY}px)
        rotateX(${rotateX}deg)
        scale(${scale})
        translateZ(${isHovered ? 30 : distance <= 2 ? 15 : 0}px)
      `,
      filter: `brightness(${brightness})`,
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      zIndex: isHovered ? 10 : distance <= 2 ? 5 : 1,
      marginRight: "0.1em",
    };
  };

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {tokens.map((token) => {
          if (token.kind === "space") {
            return <Fragment key={token.key}>{token.value}</Fragment>;
          }

          return (
            <span
              key={token.key}
              className="inline-block whitespace-nowrap align-baseline"
            >
              {token.letters.map((letter) => (
                <span
                  key={letter.key}
                  className="relative inline-block cursor-pointer align-baseline"
                  style={getLetterStyle(letter.index)}
                  onMouseEnter={() => setHoveredIndex(letter.index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <span>{letter.value}</span>
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </span>
  );
}
