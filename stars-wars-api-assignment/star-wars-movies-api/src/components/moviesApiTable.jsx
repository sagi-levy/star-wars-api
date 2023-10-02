import { useEffect, useState } from "react";
import ChosenMovieDetails from "./chosenMovieDetails";
import FavoritesMovies from "./favorites";

const MoviesApiTable = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [chosenMovieToShow, setChosenMovieToShow] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(`https://swapi.dev/api/films`, {
        method: "GET",
        headers: {
          Origin: "http://localhost:3000/",
        },
      });
      const body = await response.json();
      setMoviesList(body.results);
    };

    getMovies();
  }, []);

  const handleCheckboxChange = (movie) => {
    if (!favorites.includes(movie.title)) {
      setFavorites([...favorites, movie.title]);
    } else {
      const updatedFavorites = favorites.filter((fav) => fav !== movie.title);
      setFavorites(updatedFavorites);
    }
  };
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleClick = (e) => {
    setChosenMovieToShow(e.target.value);
  };

  return (
    <>
      <div className="flexbox-container">
        <div className="flexbox-table">
          {" "}
          {moviesList.map((movie) => {
            return (
              <div key={movie.title} className="toc-wrapper flexbox-item ">
                <div className="toc-header ">
                  {" "}
                  <div className="toc-list-wrapper">
                    <ul className="toc-list ">
                      <li className="toc-list-item" key={movie.title}>
                        <h3>{movie.title}</h3>{" "}
                        <button
                          value={movie.title}
                          onClick={handleClick}
                          className="styled-button show-details"
                        >
                          show more detials
                        </button>{" "}
                        <input
                          type="checkbox"
                          name="add-to-favorites"
                          id="add-to-favorites"
                          checked={favorites.includes(movie.title)}
                          onChange={() => handleCheckboxChange(movie)}
                        />
                        <label htmlFor="add-to-favorites">
                          add to favorites
                        </label>
                      </li>{" "}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}{" "}
        </div>

        <div className="flexbox-item flexbox-item-2">
          {chosenMovieToShow ? (
            <ChosenMovieDetails
              chosenMovie={chosenMovieToShow}
              moviesDetails={moviesList}
            />
          ) : null}
        </div>
      </div>
      <div id="favorites-area">
        <h2>my favorites movies meanwhile:</h2>{" "}
        {favorites.length === 0 ? null : (
          <FavoritesMovies favoritesMovies={favorites} />
        )}
      </div>
    </>
  );
};
export default MoviesApiTable;
