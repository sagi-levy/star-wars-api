import { useEffect, useState } from "react";

const FavoritesMovies = ({ favoritesMovies }) => {
  return (
    <>
      {favoritesMovies.map((eachFavorite) => {
        return (
          <ul key={eachFavorite}>
            <li>{eachFavorite}</li>
          </ul>
        );
      })}
    </>
  );
};
export default FavoritesMovies;
