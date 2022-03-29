import { FC } from "react";

interface CreateHallProps {
  openModal: (name: string, isOpen: boolean) => any;
}

const CreateHall: FC<CreateHallProps> = ({ openModal }) => {
  return (
    <div className="hall_list__item add_hall" onClick={openModal("hallModal", true)}>
      <div className="hall_item">+</div>
    </div>
  );
};

export default CreateHall;
