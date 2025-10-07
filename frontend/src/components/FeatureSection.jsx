// FeatureSection.jsx
import { ArrowRight } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const FeatureSection = () => {
  const { shows } = useAppContext();
  const navigate = useNavigate();

  const items = useMemo(() => shows.slice(0, 12), [shows]);
  const len = items.length;
  const [activeIndex, setActiveIndex] = useState(Math.floor(len / 2) || 0);

  if (len === 0) return null;

  const spacing = 180;
  const half = Math.floor(len / 2);

  const next = () => setActiveIndex((i) => (i + 1) % len);
  const prev = () => setActiveIndex((i) => (i - 1 + len) % len); // 🔥 FIX: prev should decrement

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden items-center">
      {/* Header */}
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
        >
          View All
          <ArrowRight className="group-hover:translate-x-0.5 transition w-4.5 h-4.5" />
        </button>
      </div>

      {/* Carousel wrapper */}

      <div className="w-full flex justify-center">
        <motion.div
          className="relative w-full max-w-[960px] h-[420px] mx-auto"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(event, info) => {
            const threshold = 50; // minimum px to swipe
            if (info.offset.x > threshold) {
              // swipe right → previous movie
              setActiveIndex((i) => (i - 1 + len) % len);
            } else if (info.offset.x < -threshold) {
              // swipe left → next movie
              setActiveIndex((i) => (i + 1) % len);
            }
          }}
        >
          {/* Cards */}
          {items.map((show, idx) => {
            let offset = idx - activeIndex;
            if (offset > half) offset -= len;
            if (offset < -half) offset += len;

            const abs = Math.abs(offset);
            const spacing = window.innerWidth < 640 ? 140 : window.innerWidth < 1024 ? 200 : 240;
            //const spacing = 240;
            const translateX = offset * spacing;
            const scale = Math.max(0.75, 1.1 - 0.15 * abs);
            const opacity = abs > 3 ? 0 : 1 - abs * 0.15;
            const zIndex = 100 - abs;

            return (
              <motion.div
                key={show._id}
                className="absolute left-1/2 top-1/2 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ zIndex }}
                animate={{ x: translateX, scale, opacity }}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 35 }}
              >
                <div
                  className="w-full cursor-pointer"
                  // Only navigate if this is the ACTIVE (center) card
                  onClick={() => {
                    if (idx === activeIndex) {
                      navigate(`/movies/${show._id}`);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                >
                  <MovieCard movie={show} isActive={idx === activeIndex} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-20 space-x-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === activeIndex ? "bg-white" : "bg-gray-400/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Show more */}
      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default FeatureSection;
