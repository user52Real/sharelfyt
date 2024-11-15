"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Globe2, Laptop } from "lucide-react";
import Scene from "@/components/3D/Scene";
import { Suspense } from "react";
import { PageLoader, SectionLoader } from '../components/loading/page-loader';
import { TechStackGrid } from "@/components/TechStackGrid";
import { useTranslations } from 'next-intl';

const MotionDiv = motion.create('div')
const MotionP = motion.create('p')

export default function Home() {
  const t = useTranslations('home');

  return (
    <Suspense fallback={<PageLoader />}>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]" />
        </div>

        {/* Hero Section */}
        <MaxWidthWrapper className="relative pb-20 pt-32">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <br />
            <br />
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </h1>

            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 max-w-2xl text-xl text-gray-300"
            >
              {t('hero.subtitle')}
            </MotionP>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    className:
                      "group rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600",
                  }),
                )}
              >
                {t('cta.contact')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/portfolio"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className:
                      "rounded-full border-gray-700 text-white hover:bg-white/10",
                  }),
                )}
              >
                {t('cta.portfolio')}
              </Link>
            </MotionDiv>
          </MotionDiv>
          <br />
          <br />

          {/* Tech Stack */}
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative mt-20"
          >
            <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <h2 className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-gray-400">
              {t('techStack.title')}
            </h2>
            <TechStackGrid />
          </MotionDiv>
          <br />
          <br />
          
          {/* Interactive Experience Section */}
          <Scene />        

          <br />
          <br />
          {/* Newsletter Signup */}
          <MaxWidthWrapper className="relative py-20">
            <div className="relative rounded-xl border border-gray-800 bg-black/40 p-8 text-center backdrop-blur-sm">
              <h2 className="mb-4 text-2xl font-bold">{t('newsletter.title')}</h2>
              <p className="mb-6 text-gray-400">
                {t('newsletter.description')}
              </p>
              <div className="mx-auto flex max-w-md gap-4">
                <input
                  type="email"
                  placeholder={t('newsletter.emailPlaceholder')}
                  className="flex-1 rounded-lg border border-gray-800 bg-black/20 px-4 py-2"
                />
                <button className="rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 px-6 py-2 font-medium text-white">
                  {t('newsletter.subscribe')}
                </button>
              </div>
            </div>
          </MaxWidthWrapper>

          {/* Scroll Indicator */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <MotionDiv
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex h-10 w-6 justify-center rounded-full border-2 border-gray-500 p-2"
            >
              <MotionDiv
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-1 rounded-full bg-gray-500"
              />
            </MotionDiv>
          </MotionDiv>
        </MaxWidthWrapper>
      </div>
    </Suspense>
  );
}