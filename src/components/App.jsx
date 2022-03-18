import React, { useEffect, useLayoutEffect, useState } from "react";
import Hall from "./Hall";
import Statistic from "./Statistic";
import seatArray from "../sample-hall";
import debounce from "lodash.debounce";
import { API } from "../api/api";
import { api_key } from "../config";
import SeatModal from "./SeatModal";
import hallsArray from "../sample-halls";
import HallCard from "./HallCard";

const App = () => {
  const [seats, setSeat] = useState(seatArray);
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [currentSeat, setCurrent] = useState({});
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({
    title: "Название фильма",
    release_date: "",
    backdrop_path: "",
    overview: "",
    poster_path: "",
  });
  const [halls, setHalls] = useState(hallsArray);

  const editName = () => {
    setEdit(!isEdit);
  };

  const itemClickHandler = (key) => {
    setCurrentMovie(foundedMovies.find((movie) => movie.id === key));
    setEdit(!isEdit);
  };

  const currentName = (event) => {
    setCurrentMovie({ ...currentMovie, title: event.target.value });
    API.get(`search/movie`, {
      params: {
        api_key,
        query: currentMovie.title,
        language: "ru-RU",
      },
    })
      .then((response) => setFoundedMovies(response.data.results))
      .catch((err) =>
        setFoundedMovies([{ title: "Попробуйте иначе", id: 100002 }])
      );
  };

  const debouncedOnChange = debounce(currentName, 400);

  const reserveSeat = (key) => {
    setSeat(
      seats.map((seat) => {
        if (seat.id === key) {
          return { ...seat, reserved: !seat.reserved };
        }
        return seat;
      })
    );
  };

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = (e, key) => {
    e.stopPropagation();

    seats.map((seat) => {
      if (seat.id === key) {
        setCurrent(seat);
      }
      return null;
    });

    setOpen(true);
  };

  useLayoutEffect(() => {
    setSeat(
      seats.map((seat) => {
        if (seat.id === currentSeat.id) {
          return { ...seat, price: currentSeat.price };
        }
        return seat;
      })
    );
  }, [currentSeat]);

  const validatePrice = (price) => {
    if (price < 0) return 0;
    if (price > 999) return 999;
    return +price;
  };

  const editSeatPrice = (event) => {
    const price = validatePrice(event.target.value);
    setCurrent({ ...currentSeat, price: price });
  };

  return (
    <>
      <div className="container">
        <div className="cinema_header">
          Кинотеатр: <span>"Название"</span>
        </div>
        <div className="container__info">
          <div className="hall_side">
            <div className="hall_list">
              {halls.map((hall) => {
                return (
                  <HallCard
                    key={hall.id}
                    id={hall.id}
                    title={hall.title}
                    movie={hall.movie}
                  />
                );
              })}
            </div>
          </div>
          {/* <Hall
            seats={seats}
            reserveSeat={reserveSeat}
            openModal={openModal}
            editName={editName}
            debouncedOnChange={debouncedOnChange}
            itemClickHandler={itemClickHandler}
            foundedMovies={foundedMovies}
            isEdit={isEdit}
            currentMovie={currentMovie}
          /> */}

          <div className="info_side">
            <div className="films">
              <div className="films__header">Фильмы</div>
              <div className="films__list">
                <div className="films_item">
                  <p>Название</p>
                  <p>Описание</p>
                </div>
                <div className="films_item">
                  <p>Название</p>
                  <p>Описание</p>
                </div>
              </div>
            </div>
            <Statistic seats={seats} currentMovie={currentMovie} />
          </div>
        </div>
      </div>
      <SeatModal
        open={open}
        closeModal={closeModal}
        currentSeat={currentSeat}
        editSeatPrice={editSeatPrice}
      />
    </>
  );
};

export default App;
