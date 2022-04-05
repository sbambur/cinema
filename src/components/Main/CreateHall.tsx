import { FC } from "react";
import { HallItemCreate } from "components/Main/styles";

interface CreateHallProps {
  openModal: (name: string, isOpen: boolean) => any;
}

const CreateHall: FC<CreateHallProps> = ({ openModal }) => {
  return (
    <HallItemCreate onClick={openModal("hallModal", true)}>+</HallItemCreate>
  );
};

export default CreateHall;
