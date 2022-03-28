import { EDIT_HALL } from "../types"

export const reserveSeat = (currentHall, id) => {
  return (dispatch) => {
    let updatedHall = {
      ...currentHall,
      seats: currentHall.seats.map((seat) => {
        if (seat.id === id) return { ...seat, reserved: !seat.reserved };
        return seat;
      }),
    };
    dispatch({ type: EDIT_HALL, payload: updatedHall });
  };
}