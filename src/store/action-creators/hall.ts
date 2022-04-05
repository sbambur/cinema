import { HallAction, TodoActionTypes } from "../../types/hall";
import { Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";

export interface createHallType {
  title: string;
  count: string;
  price: string;
}

const generateSeats = (length: number, basePrice: string): any[] => {
  let rowPos = 0;
  let seatPos = 0;
  let xPos = 85;
  let yPos = 75;

  let content = Array.from({ length }, (a, i) => ({
    id: uuidv4(),
    seatNumber: i + 1,
    price: Number(basePrice),
    reserved: false,
    pos: {
      row: seatPos % 8 || seatPos === 1 ? rowPos : ++rowPos,
      seat: seatPos >= 8 ? (seatPos = 1) : ++seatPos,
    },
    height: 65,
    width: 75,
    x: xPos * seatPos - xPos,
    y: yPos * rowPos - yPos,
  }));

  return content;
};

export const createHall = ({ title, count, price }: createHallType) => {
  return (dispatch: Dispatch<HallAction>) => {
    const newHall = {
      id: uuidv4(),
      title: title,
      reserved: false,
      active: true,
      date: null,
      movie: null,
      seats: generateSeats(+count, price),
    };
    dispatch({ type: TodoActionTypes.ADD_HALL, payload: newHall });
  };
};

export const deleteHall = (key: string) => {
  return (dispatch: Dispatch<HallAction>) => {
    dispatch({ type: TodoActionTypes.DELETE_HALL, payload: key });
  };
};

export const reserveSeat = (currentHall: any, id: string) => {
  return (dispatch: Dispatch<HallAction>) => {
    let updatedHall = {
      ...currentHall,
      seats: currentHall.seats.map((seat: any) => {
        if (seat.id === id) return { ...seat, reserved: !seat.reserved };
        return seat;
      }),
    };
    dispatch({ type: TodoActionTypes.EDIT_HALL, payload: updatedHall });
  };
};

export const setMovie = (currentHall: any, movie: string) => {
  return (dispatch: Dispatch<HallAction>) => {
    let updatedHall = {
      ...currentHall,
      movie: movie,
    };
    dispatch({ type: TodoActionTypes.EDIT_HALL, payload: updatedHall });
  };
};

export const editSeatPrice = (currentHall: any, id: string, price: number) => {
  return (dispatch: Dispatch<HallAction>) => {
    let updatedHall = {
      ...currentHall,
      seats: currentHall.seats.map((seat: any) => {
        if (seat.id === id) return { ...seat, price: price };
        return seat;
      }),
    };
    dispatch({ type: TodoActionTypes.EDIT_HALL, payload: updatedHall });
  };
};
