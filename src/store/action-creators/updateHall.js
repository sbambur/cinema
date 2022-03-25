import { RESERVE_HALL_SEAT } from "../types"

export const updateHall = (key) => {
  return (dispatch) => {
    dispatch({ type: RESERVE_HALL_SEAT, payload: key })
  };
}