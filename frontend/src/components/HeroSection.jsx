import React, { useEffect, useState } from "react";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // 👈 from .env
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const HeroSection = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[currentIndex];
  if (!currentMovie) return null;

  return (
    <div
      className="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen transition-all duration-700"
      style={{
        backgroundImage: `url(${IMAGE_BASE}${currentMovie.backdrop_path})`,
      }}
    >
      <div className="backdrop-blur-sm bg-black/10 p-4 rounded-lg border border-gray-300/30">
        <h1 className="text-5xl md:text-[70px] font-semibold max-w-110">
          {currentMovie.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-100 mt-2 mb-2">
          <span> {currentMovie.vote_average.toFixed(1)} / 10</span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4.5 h-4.5" />{" "}
            {currentMovie.release_date?.split("-")[0]}
          </div>
        </div>

        <p className="max-w-md text-gray-50">{currentMovie.overview}</p>
      </div>

      <button
        onClick={() => navigate("/movies")}
        className="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
      >
        Explore Movies
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HeroSection;
