import { EDIT_HALL } from "../types"

export const setMovie = (currentHall, movie) => {
  return (dispatch) => {
    let updatedHall = {
      ...currentHall,
      movie: movie,
    };
    dispatch({ type: EDIT_HALL, payload: updatedHall });
  };
}
