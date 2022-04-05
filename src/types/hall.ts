interface IPos {
  row: string;
  seat: string;
}

export interface ISeat {
  id: string;
  seatNumber: number;
  price: number;
  reserved: boolean;
  pos: IPos;
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface IMovie {
  id: number;
  title: string;
  overview?: string;
  release_date?: string;
  poster_path?: string;
  backdrop_path?: string;
}

export interface IHall {
  id: string;
  title: string;
  reserved: boolean;
  active: boolean;
  date: Date | null;
  movie: IMovie | null;
  seats: ISeat[];
}

export interface HallState {
  halls: IHall[];
}

export enum TodoActionTypes {
  ADD_HALL = "ADD_HALL",
  EDIT_HALL = "EDIT_HALL",
  DELETE_HALL = "DELETE_HALL",
}

interface AddHallAction {
  type: TodoActionTypes.ADD_HALL;
  payload: IHall;
}
interface EditHallAction {
  type: TodoActionTypes.EDIT_HALL;
  payload: IHall;
}
interface DeleteHallAction {
  type: TodoActionTypes.DELETE_HALL;
  payload: string;
}

export type HallAction = AddHallAction | EditHallAction | DeleteHallAction;
