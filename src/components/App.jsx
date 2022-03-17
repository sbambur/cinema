import React, { useEffect, useState } from "react";
import Hall from "./Hall";
import Statistic from "./Statistic";
import seatArray from "../sample-hall";
import Modal from "./Modal";
import debounce from "lodash.debounce";
import axios from "axios";

const App = () => {
  const [seats, setSeat] = useState(seatArray);
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [currentSeat, setCurrent] = useState({});
  const [query, setQuery] = useState([]);
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
    setCurrentMovie(query.find((movie) => movie.id === key));
    setEdit(!isEdit);
  };

  const currentName = (event) => {
    setCurrentMovie({ ...currentMovie, title: event.target.value });
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=9113d8d7a27ece3272cc84a40839bea3&query=${currentMovie.title}&language=ru-RU`
      )
      .then((response) => setQuery(response.data.results))
      .catch((err) => setQuery([{ title: "Попробуйте иначе", id: 100002 }]));
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

  useEffect(() => {
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
          date="20.03.2022"
          reserveSeat={reserveSeat}
          openModal={openModal}
          editName={editName}
          debouncedOnChange={debouncedOnChange}
          itemClickHandler={itemClickHandler}
          query={query}
          isEdit={isEdit}
          currentMovie={currentMovie}
        />
        <Statistic seats={seats} currentMovie={currentMovie} />
      </div>
      <Modal open={open} onClose={closeModal}>
        <p>Номер места: {currentSeat.seatNumber}</p>
        <p>Статус: {currentSeat.reserved ? "Забронировано" : "Свободно"}</p>
        <p>
          Цена:
          <input
            type="number"
            value={currentSeat.price}
            onChange={editSeatPrice}
          ></input>
          ₽
        </p>
      </Modal>
    </>
  );
};

export default App;
