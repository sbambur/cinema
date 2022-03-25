import { ADD_HALL } from "../types"
import { v4 as uuidv4 } from "uuid";
import { generateSeats } from "../../sample-seats";

export const createHall = ({title, count, price}) => {
  return (dispatch) => {
    const newHall = {
      id: uuidv4(),
      title: title,
      reserved: false,
      active: true,
      movie: null,
      seats: generateSeats(count, price),
    };
    dispatch({ type: ADD_HALL, payload: newHall})
  }
}