import React from "react";
import { TypeTechStack } from "../../../data/techStack";
import {
    SiReact,
    SiNextdotjs,
    SiFlutter,
    SiExpress,
    SiSolid,
    SiFlask,
    SiSwift,
    SiSvelte,
    SiJavascript,
    SiTypescript,
    SiPython,
    SiDart,
    SiGo,
    SiRust,
    SiMongodb,
    SiPostgresql,
    SiTailwindcss,
    SiNodedotjs,
    SiWebpack,
    SiBun,
    SiDeno,
    SiRedis,
    SiAmazonaws,
    SiSupabase,
} from "react-icons/si";
import { Box } from "lucide-react";

interface TechStackIconProps {
    tech: TypeTechStack;
    className?: string;
}

// Mapeamento de tecnologias para ícones do react-icons
const techIconMap: Record<TypeTechStack, React.ComponentType> = {
    React: SiReact,
    "Next.js": SiNextdotjs,
    Flutter: SiFlutter,
    Express: SiExpress,
    "Solid.js": SiSolid,
    Flask: SiFlask,
    Swift: SiSwift,
    SwiftUI: SiSwift,
    Svelte: SiSvelte,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    Python: SiPython,
    Dart: SiDart,
    Go: SiGo,
    Rust: SiRust,
    MongoDB: SiMongodb,
    PostgreSQL: SiPostgresql,
    Tailwind: SiTailwindcss,
    "Node.js": SiNodedotjs,
    Webpack: SiWebpack,
    Bun: SiBun,
    Deno: SiDeno,
    Redis: SiRedis,
    AWS: SiAmazonaws,
    "React Native": SiReact,
    Supabase: SiSupabase,
    Zustand: Box
};

const TechStackIcon: React.FC<TechStackIconProps> = ({ tech, className }) => {
    const IconComponent = techIconMap[tech];

    if (!IconComponent) {
        return (
            <div
                className={`flex items-center justify-center rounded bg-gray-400 ${className || "h-5 w-5"}`}
                title={tech}
            >
                <span className="text-xs font-bold text-white">
                    {tech.charAt(0).toUpperCase()}
                </span>
            </div>
        );
    }

    return (
        <div
            className={className || "flex h-5 w-5 items-center justify-center"}
            title={tech}
        >
            <IconComponent />
        </div>
    );
};

export default TechStackIcon;
