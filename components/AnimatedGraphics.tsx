"use client";

import { motion } from "framer-motion";

const AnimatedGraphics = () => {
  return (
    <div className="relative mt-32 overflow-hidden">
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Central Circle */}
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />

          {/* Animated Code Elements */}
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: "{ }",
                label: "Clean Code",
                color: "from-blue-400 to-blue-600",
              },
              {
                icon: "</>",
                label: "Modern Stack",
                color: "from-emerald-400 to-emerald-600",
              },
              {
                icon: "⚡",
                label: "Performance",
                color: "from-purple-400 to-purple-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-lg border border-gray-800 bg-black/40 p-8 backdrop-blur-sm transition-all hover:border-gray-700 hover:bg-black/60">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl transition-all group-hover:scale-150" />
                  <div className="relative">
                    <div
                      className={`mb-4 bg-gradient-to-r text-4xl font-bold ${item.color} bg-clip-text text-transparent`}
                    >
                      {item.icon}
                    </div>
                    <p className="text-xl font-semibold text-white">
                      {item.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -right-20 top-20"
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -left-10 bottom-20"
          >
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-emerald-500/30 to-blue-500/30 blur-xl" />
          </motion.div>

          {/* Code Lines Background */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"
                style={{ top: `${i * 14}%` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedGraphics;
