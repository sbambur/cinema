import React, { useEffect, useLayoutEffect, useState } from "react";
import Hall from "./Hall";
import Statistic from "./Statistic";
import seatArray from "../sample-hall";
import debounce from "lodash.debounce";
import { API } from "../api/api";
import { api_key } from "../config";
import SeatModal from "./SeatModal";

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
        <Hall
          seats={seats}
          reserveSeat={reserveSeat}
          openModal={openModal}
          editName={editName}
          debouncedOnChange={debouncedOnChange}
          itemClickHandler={itemClickHandler}
          foundedMovies={foundedMovies}
          isEdit={isEdit}
          currentMovie={currentMovie}
        />
        <Statistic seats={seats} currentMovie={currentMovie} />
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
