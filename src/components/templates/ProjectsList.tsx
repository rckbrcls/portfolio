"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MdOutlineWebAsset } from "react-icons/md";
import { ChevronDown } from "lucide-react";
import Title from "../atoms/Title";
import { MultiSelect } from "../ui/multi-select";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import ProjectCard from "../molecules/ProjectCard";
import { getProjectsFilterOptions } from "../../utils/filterOptionsOptimized";
import { projects } from "../../../data/projects/projects";
import { FaBroom } from "react-icons/fa";

// Estado centralizado para filtros
type FilterState = {
    frameworks: string[];
    languages: string[];
    databases: string[];
    tools: string[];
};

// Estado inicial (tudo vazio)
const initialFilterState: FilterState = {
    frameworks: [],
    languages: [],
    databases: [],
    tools: [],
};

export default function ProjectsList() {
    const [filters, setFilters] = useState<FilterState>(initialFilterState);
    const [maxCount, setMaxCount] = useState(0);
    const filterOptions = getProjectsFilterOptions();

    const resetFilter = () => {
        setFilters(initialFilterState);
    };

    const handleFilterChange = (
        category: keyof FilterState,
        selected: string[],
    ) => {
        setFilters((prev) => ({ ...prev, [category]: selected }));
    };

    // Converte as seleções do usuário em um único array de tecnologias ativas
    const activeFilters = useMemo(() => {
        return [
            ...filters.frameworks,
            ...filters.languages,
            ...filters.databases,
            ...filters.tools,
        ];
    }, [filters]);

    // Sort state
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    const filteredProjects = useMemo(() => {
        let projectsToFilter = [...projects];

        // Filter
        if (activeFilters.length > 0) {
            projectsToFilter = projectsToFilter.filter((project) => {
                const lowerTechs = project.techStack.map((t) =>
                    t.toLowerCase().replace(/\s+/g, "-"),
                );
                return lowerTechs.some((tech) => activeFilters.includes(tech));
            });
        }

        // Sort
        projectsToFilter.sort((a, b) => {
            const orderA = a.order ?? 0;
            const orderB = b.order ?? 0;
            if (sortOrder === "newest") {
                return orderB - orderA; // Descending: 10 (Newest) -> 1 (Oldest)
            } else {
                return orderA - orderB; // Ascending: 1 (Oldest) -> 10 (Newest)
            }
        });

        return projectsToFilter;
    }, [activeFilters, sortOrder]);

    // Ajuste do maxCount conforme a largura de tela
    useEffect(() => {
        if (typeof window !== "undefined") {
            setMaxCount(0);
        }
    }, []);

    return (
        <div className="flex flex-col items-end justify-end gap-4 max-sm:pb-16">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 18,
                    duration: 0.9,
                }}
                className="mb-5 flex w-full flex-col items-end border-b border-zinc-700/30 px-4 text-end max-sm:px-2"
            >
                <Title word="Projects" type="blur" gradient />
            </motion.div>

            {/* Seção de Filtros */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 18,
                    duration: 0.7,
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-md:scrollbar-hidden flex w-11/12 items-end gap-2 max-md:overflow-x-scroll max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] max-sm:px-4"
            >
                <div className="flex w-full flex-col gap-2">
                    <Label htmlFor="sort">Sort By</Label>
                    <div className="glass-dark relative flex w-full min-w-52 items-center rounded-3xl md:min-h-12 max-md:h-12 max-sm:h-10">
                        <select
                            id="sort"
                            className="h-full w-full appearance-none bg-transparent px-4 py-2 pr-8 font-medium text-gray-200 focus:outline-none cursor-pointer"
                            value={sortOrder}
                            onChange={(e) =>
                                setSortOrder(e.target.value as "newest" | "oldest")
                            }
                        >
                            <option value="newest" className="bg-zinc-900">
                                Newest
                            </option>
                            <option value="oldest" className="bg-zinc-900">
                                Oldest
                            </option>
                        </select>
                        <ChevronDown className="text-muted-foreground absolute right-3 h-4 w-4 pointer-events-none" />
                    </div>
                </div>

                <div className="flex w-full flex-col gap-2">
                    <Label htmlFor="frameworks" >
                        Frameworks
                    </Label>
                    <MultiSelect
                        id="frameworks"
                        className="w-full min-w-52 font-medium text-gray-200 max-sm:h-10"
                        options={filterOptions.frameworks}
                        onValueChange={(selected) =>
                            handleFilterChange("frameworks", selected)
                        }
                        defaultValue={filters.frameworks}
                        maxCount={maxCount}
                    />
                </div>

                <div className="flex w-full flex-col gap-2">
                    <Label htmlFor="languages" >
                        Languages
                    </Label>
                    <MultiSelect
                        id="languages"
                        className="w-full min-w-52 font-medium text-gray-200 max-sm:h-10"
                        options={filterOptions.languages}
                        onValueChange={(selected) =>
                            handleFilterChange("languages", selected)
                        }
                        defaultValue={filters.languages}
                        maxCount={maxCount}
                    />
                </div>

                <div className="flex w-full flex-col gap-2">
                    <Label htmlFor="databases" >
                        Databases
                    </Label>
                    <MultiSelect
                        id="databases"
                        className="w-full min-w-52 font-medium text-gray-200 max-sm:h-10"
                        options={filterOptions.databases}
                        onValueChange={(selected) =>
                            handleFilterChange("databases", selected)
                        }
                        defaultValue={filters.databases}
                        maxCount={maxCount}
                    />
                </div>

                <div className="flex w-full flex-col gap-2">
                    <Label htmlFor="tools" >
                        Tools &amp; Libraries
                    </Label>
                    <MultiSelect
                        id="tools"
                        className="w-full min-w-52 font-medium text-gray-200 max-sm:h-10"
                        options={filterOptions.tools}
                        onValueChange={(selected) => handleFilterChange("tools", selected)}
                        defaultValue={filters.tools}
                        maxCount={maxCount}
                    />
                </div>
                <button
                    onClick={resetFilter}
                    className="glass-dark-button-ghost flex h-12 w-min items-center justify-center gap-2 text-nowrap rounded-3xl p-4 font-semibold hover:scale-[1.01] max-sm:h-10"
                >
                    <FaBroom className="h-5 w-5" />
                </button>
            </motion.div>

            {/* Tabs de projetos */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 18,
                    duration: 0.7,
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex w-11/12 flex-col gap-10 max-sm:w-full"
            >
                {filteredProjects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="mb-4 flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-gradient-to-tr from-purple-400 to-purple-700">
                            <MdOutlineWebAsset className="h-7 w-7 text-white" />
                        </div>
                        <span className="text-lg font-semibold drop-shadow">
                            Oops! No projects here yet.
                        </span>
                        <span className="mt-2 text-xs text-purple-300">
                            Try changing your filters!
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
