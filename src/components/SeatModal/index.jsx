import React from "react";
import Modal from "../../UI/modal/Modal";

const SeatModal = ({ open,closeModal,editSeatPrice,currentSeat }) => {
  return (
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
  )
}

export default SeatModal;