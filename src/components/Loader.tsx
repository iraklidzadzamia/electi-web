'use client';

import { motion } from 'framer-motion';

export default function Loader({ progress }: { progress: number }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center text-white"
        >
            <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>
            <div className="font-mono text-sm tracking-widest opacity-50">
                LOADING {Math.round(progress)}%
            </div>
        </motion.div>
    );
}
