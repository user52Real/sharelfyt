"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function PortfolioPage() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Modern e-commerce solution with advanced features",
      image: "/project-1.webp",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      link: "#",
    },
    {
      title: "Healthcare Dashboard",
      description: "Comprehensive healthcare management system",
      image: "/project-2.webp",
      tags: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      title: "Mobile Banking App",
      description: "Secure and intuitive banking application",
      image: "/project-3.webp",
      tags: ["React Native", "Firebase", "Redux"],
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl" />
      </div>

      <MaxWidthWrapper className="relative pb-20 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent">
            Our Portfolio
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Showcasing our best work and successful projects
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * i }}
              className="group"
            >
              <Link href={project.link}>
                <div className="relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-0 p-6">
                      <h3 className="mb-2 text-xl font-bold">
                        {project.title}
                      </h3>
                      <p className="mb-4 text-gray-300">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="rounded-full bg-white/10 px-3 py-1 text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
