import { EDIT_HALL } from "../types"

export const editSeatPrice = (currentHall, id, price) => {
  return (dispatch) => {
    let updatedHall = {
      ...currentHall,
      seats: currentHall.seats.map((seat) => {
        if (seat.id === id) return { ...seat, price: price };
        return seat;
      }),
    };
    dispatch({ type: EDIT_HALL, payload: updatedHall });
  };
}