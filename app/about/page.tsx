"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Cpu, Globe2, Laptop, Rocket, Users } from "lucide-react";

const MotionDiv = motion.create('div')

export default function AboutPage() {
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
            Transforming Ideas into Digital Reality
          </h1>
          <br />
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            With over a decade of experience in web development and IT
            consulting, I help businesses build powerful digital solutions.
          </p>
        </MotionDiv>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-6 text-3xl font-bold">Your Technology Partner</h2>
            <p className="mb-6 text-gray-300">
              As a freelance IT consultant and web developer, I specialize in
              creating custom digital solutions that help businesses scale and
              succeed in the modern digital landscape. From sophisticated web
              applications to comprehensive IT strategies, I deliver results
              that matter.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-blue-400">Instant</h3>
                <p className="text-gray-400">Response Times</p>
              </div>
              <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-emerald-400">Powerful</h3>
                <p className="text-gray-400">Performance</p>
              </div>
              <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-emerald-400">Modern</h3>
                <p className="text-gray-400">Technology</p>
              </div>
              <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-emerald-400">Scalable</h3>
                <p className="text-gray-400">Architecture</p>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <Image
              src="/images/developer-workspace.webp"
              alt="Developer Workspace"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </MotionDiv>
        </div>

        {/* Services Section */}
        <div className="mt-32">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Core Services
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Globe2 className="h-8 w-8 text-blue-400" />,
                title: "Web Development",
                description:
                  "Custom websites and web applications built with modern technologies",
              },
              {
                icon: <Code2 className="h-8 w-8 text-emerald-400" />,
                title: "Software Solutions",
                description:
                  "Tailored software development to streamline your business processes",
              },
              {
                icon: <Cpu className="h-8 w-8 text-purple-400" />,
                title: "IT Consulting",
                description:
                  "Strategic technology guidance and digital transformation",
              },
            ].map((service, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * i }}
                className="rounded-lg bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* Approach Section */}
        <div className="mt-32">
          <h2 className="mb-12 text-center text-3xl font-bold">My Approach</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Users className="h-8 w-8 text-blue-400" />,
                title: "Collaborative",
                description:
                  "Working closely with clients to understand their unique needs and goals",
              },
              {
                icon: <Laptop className="h-8 w-8 text-emerald-400" />,
                title: "Modern Tech Stack",
                description:
                  "Utilizing cutting-edge technologies for optimal performance",
              },
              {
                icon: <Rocket className="h-8 w-8 text-purple-400" />,
                title: "Results-Driven",
                description:
                  "Focused on delivering measurable business outcomes",
              },
            ].map((item, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * i }}
                className="rounded-lg bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
