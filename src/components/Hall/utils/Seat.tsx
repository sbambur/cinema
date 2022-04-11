import { FC, useContext } from "react";
import { Tooltip } from "antd";

import { AuthContext } from "context/AuthContext";

import { HallAction, ISeat } from "types/hall";
import { ButtonSeatEdit, SeatItem } from "components/Hall/styles";

interface SeatProps {
  seat: ISeat;
  reserveSeatLocal: (
    id: string
  ) => () => (dispatch: React.Dispatch<HallAction>) => void;
  openModal: (key: string) => ((e: any) => void) | undefined;
}

const Seat: FC<SeatProps> = ({ seat, reserveSeatLocal, openModal }) => {
  const [auth] = useContext(AuthContext);

  return (
    <Tooltip title={`Место: ${seat.pos.seat}, Ряд: ${seat.pos.row}`}>
      <SeatItem
        $x={seat.x}
        $y={seat.y}
        $height={seat.height}
        $width={seat.width}
        $reserved={seat.reserved}
        onClick={reserveSeatLocal(seat._id)}
      >
        {seat.pos.seat}
        <p>{seat.price}₽</p>
        {auth ? (
          <ButtonSeatEdit onClick={openModal(seat._id)}>Edit</ButtonSeatEdit>
        ) : null}
      </SeatItem>
    </Tooltip>
  );
};

export default Seat;
