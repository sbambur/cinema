import React, { useEffect, useState } from "react";
import Hall from "./Hall";
import Statistic from "./Statistic";
import seatArray from "../sample-hall";
import Modal from "./Modal";

const App = () => {
  const [seats, setSeat] = useState(seatArray);
  const [open, setOpen] = useState(false);
  const [currentSeat, setCurrent] = useState({});

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

  const editSeatPrice = (event) => {
    setCurrent({ ...currentSeat, price: +event.target.value });
  };

  return (
    <>
      <div className="container">
        <Hall
          seats={seats}
          date="20.03.2022"
          reserveSeat={reserveSeat}
          openModal={openModal}
        />
        <Statistic seats={seats} />
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
