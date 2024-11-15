"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionDiv = motion.create('div')

export default function PortfolioPage() {
  const projects = [
    {
      title: "Feest",
      description: "A modern, feature-rich event management platform built with Next.js 14, offering comprehensive tools for organizing, managing, and hosting events.",
      image: "/feest.webp",
      tags: ["Next.js", "TypeScript", "Tailwind", "MongoDB", "Clerk"],
      link: "https://feest.vercel.app/",
    },
    {
      title: "Collab Notes",
      description: "",
      image: "/collab.webp",
      tags: ["NextJS", "Node.js", "Clerk"],
      link: "https://collab-notes-drab.vercel.app/",
    },
    {
      title: "Cafe POS System",
      description: "",
      image: "/cafepos.webp",
      tags: ["React", "Firebase", "Redux"],
      link: "https://github.com/alani4837/cafe-pos",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl" />
      </div>

      <MaxWidthWrapper className="relative pb-20 pt-24">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent">
            My Portfolio
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Showcasing our best work and successful projects
          </p>
        </MotionDiv>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm"
            >
              {/* Image Container with Fixed Aspect Ratio */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {/* Project Details */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                <p className="mb-4 text-gray-400">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
