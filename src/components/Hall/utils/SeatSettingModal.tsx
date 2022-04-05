import { FC } from "react";
import { ModalInput } from "UI/modal/styles";

import { ISeat } from "types/hall";
import Modal from "UI/modal/Modal";

interface SeatSettingModalProps {
  open: boolean;
  closeModal: () => void;
  editSeatPrice: (id: string) => any;
  currentSeat: ISeat | null;
}

const SeatSettingModal: FC<SeatSettingModalProps> = ({
  open,
  closeModal,
  editSeatPrice,
  currentSeat,
}) => {
  if (!currentSeat) return null;
  const { seatNumber, reserved, price, id } = currentSeat;

  return (
    <Modal open={open} onClose={closeModal}>
      <p>Номер места: {seatNumber} </p>
      <p>Статус: {reserved ? "Забронировано" : "Свободно"}</p>
      <p>
        Цена:
        <ModalInput
          type="number"
          value={price}
          onChange={editSeatPrice(id)}
        ></ModalInput>
      </p>
    </Modal>
  );
};

export default SeatSettingModal;
