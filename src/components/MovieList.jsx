import { useState } from "react";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getMovieDetails = async (imdbID) => {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=b35a9683`;
    const response = await fetch(url);
    const data = await response.json();
    if (data) {
      setSelectedMovie(data);
    }
  };

  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          key={index}
          className="flex flex-col justify-between m-3 w-full bg-gray-900 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Poster with favourite hover */}
          <div className="relative group w-full">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-auto object-cover rounded-t-xl"
            />

            {/* Favourite overlay only on poster */}
            <div
              onClick={() => props.handleFavouritesClick(movie)}
              className="absolute inset-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center cursor-pointer transition duration-300 rounded-t-xl"
            >
              <FavouriteComponent />
            </div>
          </div>

          {/* Text + button container */}
          <div className="flex flex-col bg-gray-950 flex-grow justify-between w-full">
            {/* Movie Title */}
            <h3 className="text-sm font-semibold px-3 py-2 text-center line-clamp-2">
              {movie.Title}
            </h3>

            {/* Button to get cast/crew */}
            <button
              onClick={() => getMovieDetails(movie.imdbID)}
              className="w-full bg-yellow-500 text-black py-2 text-sm font-medium hover:bg-yellow-400 transition-colors rounded-b-xl"
            >
              View Cast & Crew
            </button>
          </div>
        </div>
      ))}

      {/* Cast & Crew Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded-xl w-11/12 max-w-md text-white shadow-lg relative">
            <h2 className="text-xl font-bold mb-3 text-center">
              {selectedMovie.Title}
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Director:</span>{" "}
              {selectedMovie.Director}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Writer:</span>{" "}
              {selectedMovie.Writer}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Cast:</span>{" "}
              {selectedMovie.Actors}
            </p>

            {/* Close button */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieList;
