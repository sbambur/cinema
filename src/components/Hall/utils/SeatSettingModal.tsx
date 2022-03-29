import { FC } from "react";
import { ISeat } from "../../../types/hall";
import Modal from "../../../UI/modal/Modal";

interface SeatSettingModalProps {
  open: boolean;
  closeModal: () => void;
  editSeatPrice: (id: string) => any;
  currentSeat: ISeat
}

const SeatSettingModal: FC<SeatSettingModalProps> = ({ open, closeModal, editSeatPrice, currentSeat }) => {
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
