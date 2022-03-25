import { DELETE_HALL } from "../types"

export const deleteHall = (key) => {
  return(dispatch) => {
    dispatch({ type: DELETE_HALL, payload: key })
  }
}