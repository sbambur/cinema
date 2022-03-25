import { imageBase } from "../../api/api";

const MovieDescription = ({ currentMovie }) => {
  return (
    <div className="films">
      <div className="films__header">Фильм</div>
      <div className="film_item">
        {currentMovie ? (
          <>
            <div className="film_poster">
              <img
                src={`${imageBase}${currentMovie.poster_path}`}
                alt={currentMovie.title}
              />
            </div>
            <div className="film_overview">
              <p>{currentMovie.title}</p>
              <p>{currentMovie.overview}</p>
            </div>
          </>
        ) : (
          <p>Нет описания</p>
        )}
      </div>
    </div>
  );
};

export default MovieDescription;
