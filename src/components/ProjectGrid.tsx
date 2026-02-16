"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tools: string[];
    link: string;
}

const projects: Project[] = [
    {
        id: "brainary",
        title: "Brainary",
        description: "An AI-powered education platform designed to personalize learning experiences using advanced LLMs.",
        image: "/projects/brainary.png",
        tools: ["Next.js", "OpenAI", "Tailwind CSS"],
        link: "#",
    },
    {
        id: "portfolio",
        title: "Responsive Portfolio",
        description: "A showcase of creative work featuring a glassmorphism design system and seamless page transitions.",
        image: "/projects/portfolio.png",
        tools: ["React", "Framer Motion", "Typescript"],
        link: "#",
    },
    {
        id: "restaurant",
        title: "CraveNow Web App",
        description: "A vibrant food delivery application allowing users to browse menus, customize orders, and track delivery.",
        image: "/projects/restaurant.png",
        tools: ["React", "Postman", "Supabase"],
        link: "#",
    },
    {
        id: "dashboard",
        title: "Interactive Dashboards",
        description: "Complex data analytics visualization tool for monitoring real-time metrics and performance KPIs.",
        image: "/projects/dashboard.png",
        tools: ["D3.js", "React", "Python"],
        link: "#",
    },
];

export default function ProjectGrid() {
    return (
        <section className="w-full py-24 bg-background">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                        Featured Work
                    </h2>
                    <p className="text-lg text-foreground/60 max-w-2xl">
                        A selection of projects that demonstrate my passion for building clean, user-centric web applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group flex flex-col rounded-3xl bg-foreground/5 hover:bg-foreground/10 transition-colors duration-300 overflow-hidden border border-white/10"
                        >
                            {/* Image Container */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-foreground/5">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} Mockup`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            {/* Content Container */}
                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-semibold text-foreground">
                                        {project.title}
                                    </h3>
                                    <a
                                        href={project.link}
                                        className="p-2 rounded-full bg-foreground text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
                                        aria-label={`View ${project.title}`}
                                    >
                                        <ArrowUpRight size={20} />
                                    </a>
                                </div>

                                <p className="text-foreground/70 mb-6 flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tools.map((tool) => (
                                        <span
                                            key={tool}
                                            className="px-3 py-1 text-xs font-medium rounded-full border border-foreground/20 text-foreground/80"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-foreground/10 md:hidden">
                                    <button className="w-full py-2 rounded-lg bg-foreground text-background font-medium text-sm">
                                        Try it
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
