import { StarIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../lib/timeFormat";
import { useAppContext } from "../context/AppContext";

const MovieCard = ({ movie, isActive }) => {
  const { image_base_url } = useAppContext();
  const navigate = useNavigate();

  // If `isActive` is undefined, treat it as "always active"
  const active = isActive === undefined ? true : isActive;

  return (
    <div className="flex flex-col justify-between p-3 bg-gray-800 rounded hover:-translate-y-1 transition duration-300 w-66">
      <img
        //src={image_base_url + movie.backdrop_path}
        src={`${image_base_url.replace("original", "w780")}${movie.backdrop_path}`}
        alt=""
        className="rounded h-52 w-full object-cover object-right-bottom cursor-pointer"
      />

      <p className="font-semibold mt-4 truncate">{movie.title}</p>

      <p className="text-sm text-gray-400 mt-2">
        {new Date(movie.release_date).getFullYear()} •
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")}
        • {timeFormat(movie.runtime)}
      </p>

      <div className="flex items-center justify-between mt-4 pb-3">
        <button
          onClick={() => {
            if (active) {
              navigate(`/movies/${movie._id}`);
              scrollTo(0, 0);
            }
          }}
          disabled={!active}
          className={`px-4 py-2 text-xs rounded-lg font-medium transition ${
            active
              ? "bg-primary hover:bg-primary-dull cursor-pointer"
              : "bg-gray-600 text-gray-400 cursor-pointer"
          }`}
        >
          Buy Tickets
        </button>

        <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-2">
          <StarIcon className="w-4 h-4 text-primary fill-primary" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
