import { FC, useRef } from "react";

import Modal from "UI/modal/Modal";

import { ModalInput } from "UI/modal/styles";

interface BaseSettingsModalProps {
  basePrice: number;
  open: boolean;
  setBasePrice: (str: number) => void;
  closeModal: () => void;
}

const BaseSettingsModal: FC<BaseSettingsModalProps> = ({
  basePrice,
  setBasePrice,
  open,
  closeModal,
}) => {
  const inputElCount = useRef<HTMLInputElement>(null);

  const basePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const node = Number(e.target.value);
    setBasePrice(node);
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <p>Начальная цена билета:</p>
      <ModalInput
        type="number"
        ref={inputElCount}
        value={basePrice}
        onChange={basePriceChange}
      />
    </Modal>
  );
};

export default BaseSettingsModal;
