interface IPos {
  row: string;
  seat: string;
}

export interface ISeatReq {
  seatNumber: number;
  price: number;
  reserved: boolean;
  pos: IPos;
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface ISeat {
  _id: string;
  seatNumber: number;
  price: number;
  reserved: boolean;
  pos: IPos;
  height: number;
  width: number;
  x: number;
  y: number;
}

interface IGenres {
  id: number;
  name: string;
}

export interface IMovie {
  id: number;
  title: string;
  vote_average?: number;
  runtime?: number;
  genres?: IGenres[];
  overview?: string;
  release_date?: string;
  poster_path?: string;
  backdrop_path?: string;
}

export interface IHall {
  _id: string;
  title: string;
  reserved: boolean;
  active: boolean;
  date: Date | null;
  movie: IMovie | null;
  seats: ISeat[];
}

export interface HallState {
  halls: IHall[];
  loading: boolean;
  error: any;
}

export enum HallActionTypes {
  FETCH_HALLS = "FETCH_HALLS",
  FETCH_HALLS_SUCCESS = "FETCH_HALLS_SUCCESS",
  FETCH_HALLS_ERROR = "FETCH_HALLS_ERROR",
  DELETE_HALL = "DELETE_HALL",
  ADD_HALL = "ADD_HALL",
  EDIT_HALL = "EDIT_HALL",
}

interface FetchHallAction {
  type: HallActionTypes.FETCH_HALLS;
}

interface FetchHallSuccessAction {
  type: HallActionTypes.FETCH_HALLS_SUCCESS;
  payload: any[];
}

interface FetchHallErrorAction {
  type: HallActionTypes.FETCH_HALLS_ERROR;
  payload: string;
}

interface DeleteHallAction {
  type: HallActionTypes.DELETE_HALL;
  payload: string;
}

interface AddHallAction {
  type: HallActionTypes.ADD_HALL;
  payload: any;
}

interface EditHallAction {
  type: HallActionTypes.EDIT_HALL;
  payload: any;
}

export type HallAction =
  | FetchHallAction
  | FetchHallSuccessAction
  | FetchHallErrorAction
  | DeleteHallAction
  | AddHallAction
  | EditHallAction;
