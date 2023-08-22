'use client'
import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { BsArrowUp } from 'react-icons/bs'
import { MdKeyboardDoubleArrowUp } from 'react-icons/md'
const ScrollProgressButton = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        const unsubscribeScroll = scrollYProgress.on('change', (latestProgress) => {
            setProgress(latestProgress);
        });
        return () => {
            window.removeEventListener('scroll', handleScroll)

            unsubscribeScroll();
        };
    }, [scrollYProgress]);

    return (
        <div className={`fixed bottom-10 right-4 md:right-20 ${isVisible ? 'visible' : 'invisible'}`}>
            <motion.div className="relative w-14 h-14 cursor-pointer"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
            >
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-[1px] shadow-xl overflow-hidden">
                    <motion.div
                        className="h-full bg-sky-300"
                        style={{
                            width: `${progress * 100}%`,
                        }}
                    />
                </div>
                <motion.button
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent border-none outline-none"

                >
                    <MdKeyboardDoubleArrowUp className='text-2xl text-zinc-600' />
                </motion.button>
            </motion.div>
        </div >
    );
};

export default ScrollProgressButton;