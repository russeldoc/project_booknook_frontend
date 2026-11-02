"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CardArt, ShelfArt, StackArt } from "./HeroArt";

const slides = [
  {
    title: "Every book on this shelf belongs to a reader like you",
    text: "Browse what other members have shared and pick your next read.",
    bg: "#2744d6",
    fg: "#ffffff",
    Art: ShelfArt,
  },
  {
    title: "Finished a great book? Put it back into circulation",
    text: "Add it to the shelf in a minute and let someone else enjoy it.",
    bg: "#ffcf33",
    fg: "#101a2e",
    Art: CardArt,
  },
  {
    title: "Borrow for seven days, return with one click",
    text: "No library card, no queue. Books simply move from reader to reader.",
    bg: "#0f766e",
    fg: "#ffffff",
    Art: StackArt,
  },
];

function Slide({ slide, active }) {
  const { Art } = slide;
  return (
    <div
      className="grid min-h-[28rem] items-center gap-6 px-8 py-12 md:grid-cols-[1.2fr_1fr] md:px-16"
      style={{ background: slide.bg, color: slide.fg }}
    >
      <motion.div
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="max-w-[20ch] font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          {slide.title}
        </h1>
        <p className="mt-4 max-w-[44ch] text-lg">{slide.text}</p>
        <Link
          href="/books"
          className="btn mt-7 bg-[var(--paper)] text-[var(--color-base-content)]"
        >
          Browse Books
        </Link>
      </motion.div>
      <div className="hidden justify-center md:flex" aria-hidden={false}>
        <Art />
      </div>
    </div>
  );
}

export default function HeroSlider() {
  return (
    <section aria-label="Featured" className="mx-auto max-w-7xl px-4 pt-6">
      <div className="paper-card overflow-hidden">
        <Swiper
          className="hero-swiper"
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation
          pagination={{ clickable: true }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title} style={{ color: slide.fg }}>
              {({ isActive }) => <Slide slide={slide} active={isActive} />}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
