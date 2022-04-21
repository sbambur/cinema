import { FC } from "react";
import { Tooltip } from "antd";

import { ISeat } from "types/scheme";
import { SeatItem } from "components/Session/styles";

interface SeatProps {
  seat: ISeat;
}

const Seat: FC<SeatProps> = ({ seat }) => {
  // Function for reserved displaying
  const reserved = () => {
    return false;
  };

  return (
    <Tooltip title={`Место: ${seat.pos.seat}, Ряд: ${seat.pos.row}`}>
      <SeatItem $reserved={reserved()}>
        {seat.pos.seat}
        <p>{seat.price}₽</p>
      </SeatItem>
    </Tooltip>
  );
};

export default Seat;
