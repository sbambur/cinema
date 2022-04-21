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

export interface ISession {
  id: string;
  title: string;
  hall: string;
  active: boolean;
  date: Date | null;
  movie: IMovie | null;
}

export interface SessionState {
  sessions: ISession[];
  loading: boolean;
  error: any;
}

export enum SessionActionTypes {
  FETCH_SESSIONS = "FETCH_SESSIONS",
  FETCH_SESSIONS_SUCCESS = "FETCH_SESSIONS_SUCCESS",
  FETCH_SESSIONS_ERROR = "FETCH_SESSIONS_ERROR",
  DELETE_SESSION = "DELETE_SESSION",
  ADD_SESSION = "ADD_SESSION",
  EDIT_SESSION = "EDIT_SESSION",
}

interface FetchSessionAction {
  type: SessionActionTypes.FETCH_SESSIONS;
}

interface FetchSessionSuccessAction {
  type: SessionActionTypes.FETCH_SESSIONS_SUCCESS;
  payload: any[];
}

interface FetchSessionErrorAction {
  type: SessionActionTypes.FETCH_SESSIONS_ERROR;
  payload: string;
}

interface DeleteSessionAction {
  type: SessionActionTypes.DELETE_SESSION;
  payload: string;
}

interface AddSessionAction {
  type: SessionActionTypes.ADD_SESSION;
  payload: any;
}

interface EditSessionAction {
  type: SessionActionTypes.EDIT_SESSION;
  payload: any;
}

export type SessionAction =
  | FetchSessionAction
  | FetchSessionSuccessAction
  | FetchSessionErrorAction
  | DeleteSessionAction
  | AddSessionAction
  | EditSessionAction;
