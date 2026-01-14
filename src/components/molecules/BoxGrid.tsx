import React, { memo } from "react";
import Image from "next/image";
import SubTitle from "@/components/atoms/SubTitle";
import { twMerge } from "tailwind-merge";
import Ororu from "../../../public/images/about-me/ororu.jpg";
import Draw from "../../../public/images/about-me/2D.jpg";
import Me from "../../../public/images/about-me/me.jpg";
import Beach from "../../../public/images/about-me/beach.jpg";
import { IBox } from "@/interface/IBox";

const BoxGrid = memo(() => {
  const aboutMeBoxes: IBox[] = [
    {
      className: "md:col-span-2",
      text: `Coding is my playground. I love experimenting, breaking things (occasionally), and building cool projects. Honestly, I just have a lot of fun doing this.`,
      image: Me,
    },
    {
      className: "md:row-span-2",
      image: Ororu,
      text: `Meet Ororu, my main adventure buddy. She keeps me grounded and reminds me that happiness is usually just a walk away.`,
    },
    {
      className: "md:col-span-2",
      image: Draw,
      text: `When I step away from the keyboard, I'm usually drawing or staying active. Art and sports are my fuel, they keep the creativity flowing.`,
    },
    {
      className: "md:col-span-3",
      text: `Disconnecting to reconnect. You'll mostly find me at the beach or lost in nature. Traveling isn't just a hobby; it's how I reset and find new inspiration.`,
      image: Beach,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      {aboutMeBoxes.map(({ className, image, text }, index) => (
        <div
          key={index}
          className={twMerge(
            `glass-dark group flex min-h-[70svh] items-center overflow-hidden rounded-3xl border-2 border-transparent transition-all duration-300 ${index % 2 === 0 ? "border-purple-500/20 hover:border-purple-400/40" : "border-pink-500/20 hover:border-pink-400/40"} max-md:h-[85svh]`,
            className,
          )}
        >
          {image && (
            <div className="relative h-full w-full">
              <Image
                className="select-none"
                src={image}
                alt="box-image"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                quality={100}
                loading="lazy"
              />
            </div>
          )}

          {text && (
            <div className="absolute -bottom-2 w-full bg-gradient-to-t from-black via-zinc-950/85 to-transparent p-10 pb-12 transition duration-500 group-hover:-translate-y-2 max-md:p-5 max-md:pb-7">
              <SubTitle className="text-left max-md:text-xl md:text-3xl">
                {text}
              </SubTitle>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default BoxGrid;
