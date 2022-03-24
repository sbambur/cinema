import { useRef } from "react";
import Modal from "../../../UI/modal/Modal";

const BaseSettingsModal = ({ basePrice, setBasePrice, open, closeModal }) => {
  const inputElCount = useRef(null);

  const basePriceChange = () => {
    setBasePrice(Number(inputElCount.current.value));
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <form>
        <p>Начальная цена билета:</p>
        <input
          type="number"
          ref={inputElCount}
          value={basePrice}
          onChange={basePriceChange}
        />
      </form>
    </Modal>
  );
};

export default BaseSettingsModal;
