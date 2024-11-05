"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies",
      icon: "/web-dev.svg",
      features: ["Responsive Design", "SEO Optimization", "Performance Tuning"],
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
      icon: "/mobile-dev.svg",
      features: ["iOS & Android", "Flutter", "Progressive Web Apps"],
    },
    {
      title: "Cloud Solutions",
      description: "Scalable and secure cloud infrastructure",
      icon: "/cloud.svg",
      features: ["AWS & On-premises", "DevOps", "Microservices"],
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
            Our Services
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Comprehensive web development solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * i }}
            >
              <Card className="border-gray-800 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={48}
                  height={48}
                  className="mb-4"
                />
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="mb-4 text-gray-400">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-gray-300">
                      <span className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-32">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Process</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your needs and objectives",
              },
              {
                step: "02",
                title: "Planning",
                description: "Creating detailed project roadmap",
              },
              {
                step: "03",
                title: "Development",
                description: "Building your solution with precision",
              },
              {
                step: "04",
                title: "Launch",
                description: "Deploying and maintaining your project",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * i }}
                className="rounded-lg bg-white/5 p-6 backdrop-blur-sm"
              >
                <span className="text-4xl font-bold text-blue-400">
                  {step.step}
                </span>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
