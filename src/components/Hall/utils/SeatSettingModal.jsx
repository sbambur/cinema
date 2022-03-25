import Modal from "../../../UI/modal/Modal";

const SeatSettingModal = ({ open, closeModal, editSeatPrice, currentSeat }) => {
  const { seatNumber, reserved, price, id } = currentSeat;

  return (
    <Modal open={open} onClose={closeModal}>
      <p>Номер места: {seatNumber} </p>
      <p>Статус: {reserved ? "Забронировано" : "Свободно"}</p>
      <p>
        Цена:
        <input type="number" value={price} onChange={editSeatPrice(id)}></input>
      </p>
    </Modal>
  );
};

export default SeatSettingModal;
