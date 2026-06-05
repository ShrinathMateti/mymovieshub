import { useState, useEffect } from "react";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import MovieList from "./components/MovieList";
import AddFavourite from "./components/AddFavourite";
import RemoveFavourites from "./components/RemoveFavourites";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // 👈 NEW

  const getMovieRequest = async (searchValue) => {
    try {
      setLoading(true);
      setShowLoader(true);

      const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=b35a9683`;

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.Search) {
        setMovies(responseJson.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);

    
      setTimeout(() => {
        setShowLoader(false);
      }, 1800);
    }
  };

  useEffect(() => {
    if (searchValue.trim() === "") {
      getMovieRequest("iron");
    } else {
      getMovieRequest(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem(
      "react-movie-app-favourites",
      JSON.stringify(items)
    );
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="w-full px-6 py-8 bg-black min-h-screen text-white">

      <div className="flex items-center justify-between mb-8">
        <MovieListHeading heading="MyMoviesHub" />
        <SearchBox value={searchValue} setSearchValue={setSearchValue} />
      </div>

      
      {showLoader ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <Loader size={80} color="#facc15" />
        </div>
      ) : (
        <>
          {/* MOVIES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <MovieList
              movies={movies}
              handleFavouritesClick={addFavouriteMovie}
              favouriteComponent={AddFavourite}
            />
          </div>

          {/* FAVOURITES */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-12 mb-8">
            <MovieListHeading heading="Favourites" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <MovieList
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
              favouriteComponent={RemoveFavourites}
            />
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;