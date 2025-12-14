'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !containerRef.current) {
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 30,
    });

    timeline
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.3',
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-linear-to-t from-blue-50 to-white dark:from-gray-900 dark:to-black"
    >
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1
            ref={titleRef}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100"
          >
            Find the Car Parts You Need
          </h1>
          <p
            ref={subtitleRef}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400"
          >
            Browse thousands of quality car parts from trusted manufacturers.
            Fast shipping and competitive prices.
          </p>
        </div>
      </div>
    </section>
  );
};
