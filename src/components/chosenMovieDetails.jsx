import { useEffect, useState } from "react";

const ChosenMovieDetails = ({ chosenMovie, moviesDetails }) => {
 
  const [chosenMovieDetails, setChosenMovieToDetails] = useState(
    moviesDetails
      .filter((movie) => movie.title === chosenMovie)
      .map((movie) => ({
        producer: movie.producer,
        edited: movie.edited,
        director: movie.director,
        opening_crawl: movie.opening_crawl,
      }))
  );
  useEffect(() => {
    setChosenMovieToDetails(
      moviesDetails
        .filter((movie) => movie.title === chosenMovie)
        .map((movie) => ({
          producer: movie.producer,
          edited: movie.edited,
          director: movie.director,
          opening_crawl: movie.opening_crawl,
        }))
    );
  }, [chosenMovie]);
  
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h1>{chosenMovie}</h1>
        </div>
        <div className="card-body">
          <h2>director:{chosenMovieDetails[0].director}</h2>
          <h2>producer:{chosenMovieDetails[0].producer}</h2>
          <p>summary:{chosenMovieDetails[0].opening_crawl}</p>
        </div>
      </div>
    </>
  );
};
export default ChosenMovieDetails;
