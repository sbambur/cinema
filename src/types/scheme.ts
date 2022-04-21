interface IPos {
  row: string;
  seat: string;
}

export interface ISeat {
  id: string;
  seatNumber: number;
  price: number;
  pos: IPos;
}

export interface IScheme {
  id: string;
  title: string;
  seats: ISeat[];
}
export interface SchemeState {
  scheme: IScheme[];
  loading: boolean;
  error: any;
}

export enum SchemeActionTypes {
  FETCH_SCHEME = "FETCH_SCHEME",
  FETCH_SCHEME_SUCCESS = "FETCH_SCHEME_SUCCESS",
  FETCH_SCHEME_ERROR = "FETCH_SCHEME_ERROR",
  DELETE_SCHEME = "DELETE_SCHEME",
  ADD_SCHEME = "ADD_HSCHEME",
}

interface FetchSchemeAction {
  type: SchemeActionTypes.FETCH_SCHEME;
}

interface FetchSchemeSuccessAction {
  type: SchemeActionTypes.FETCH_SCHEME_SUCCESS;
  payload: any[];
}

interface FetchSchemeErrorAction {
  type: SchemeActionTypes.FETCH_SCHEME_ERROR;
  payload: string;
}

interface DeleteSchemeAction {
  type: SchemeActionTypes.DELETE_SCHEME;
  payload: string;
}

interface AddSchemeAction {
  type: SchemeActionTypes.ADD_SCHEME;
  payload: any;
}

export type SchemeAction =
  | FetchSchemeAction
  | FetchSchemeSuccessAction
  | FetchSchemeErrorAction
  | DeleteSchemeAction
  | AddSchemeAction;
