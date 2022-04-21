import { BASE_URL, ENDPOINTS } from "api/api";
import { Dispatch } from "react";
import {
  SessionActionTypes,
  SessionAction,
  ISession,
  IMovie,
} from "types/session";

export const fetchSessions = (storeSessions: ISession[]) => {
  return async (dispatch: Dispatch<SessionAction>) => {
    try {
      if (!storeSessions.length)
        dispatch({ type: SessionActionTypes.FETCH_SESSIONS });
      const response = await BASE_URL.get(ENDPOINTS.SESSIONS);

      if (!response.data.length) {
        dispatch({
          type: SessionActionTypes.FETCH_SESSIONS_SUCCESS,
          payload: [],
        });
      }

      if (
        response.data.length &&
        JSON.stringify(storeSessions) !== JSON.stringify(response.data)
      ) {
        dispatch({
          type: SessionActionTypes.FETCH_SESSIONS_SUCCESS,
          payload: response.data,
        });
      } else {
      }
    } catch (e) {
      dispatch({
        type: SessionActionTypes.FETCH_SESSIONS_ERROR,
        payload: "Произошла ошибка при загрузке списка сеансов",
      });
    }
  };
};

export const fetchSession = (id: string) => {
  return async (dispatch: Dispatch<SessionAction>) => {
    try {
      const response = await BASE_URL.get(`${ENDPOINTS.SESSIONS}/${id}`);
      dispatch({
        type: SessionActionTypes.EDIT_SESSION,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteSession = (id: string) => {
  return (dispatch: Dispatch<SessionAction>) => {
    const makeDeleteRequest = async () => {
      try {
        if (!id) {
          throw new Error("Не указан ID");
        }
        await BASE_URL.delete(`${ENDPOINTS.SESSIONS}/${id}`);
        dispatch({ type: SessionActionTypes.DELETE_SESSION, payload: id });
      } catch (e) {
        console.log(e);
      }
    };
    makeDeleteRequest();
  };
};

export interface createSessionType {
  schemeTitle: string;
}

export const createSession = ({ schemeTitle }: createSessionType) => {
  return (dispatch: Dispatch<SessionAction>) => {
    const newSession = {
      hall: schemeTitle,
      active: true,
      date: null,
      movie: null,
    };
    const makeAddRequest = async () => {
      try {
        const response = await BASE_URL.post(ENDPOINTS.SESSIONS, newSession);
        dispatch({
          type: SessionActionTypes.ADD_SESSION,
          payload: response.data,
        });
      } catch (e) {
        console.log(e);
      }
    };
    makeAddRequest();
  };
};

// ************** EDIT SESSIONS ACTIONS **************

const makeEditRequest = async (
  updatedSession: ISession,
  dispatch: Dispatch<SessionAction>
) => {
  try {
    const response = await BASE_URL.put(ENDPOINTS.SESSIONS, updatedSession);
    dispatch({ type: SessionActionTypes.EDIT_SESSION, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

// export const reserveSeat = (currentHall: ISession, id: string) => {
//   return (dispatch: Dispatch<SessionAction>) => {
//     let updatedHall = {
//       ...currentHall,
//       seats: currentHall.seats.map((seat: ISeat) => {
//         if (seat.id === id) return { ...seat, reserved: !seat.reserved };
//         return seat;
//       }),
//     };

//     makeEditRequest(updatedHall, dispatch);
//   };
// };

export const setMovie = (currentSession: ISession, movie: IMovie) => {
  return (dispatch: Dispatch<SessionAction>) => {
    let updatedSession = {
      ...currentSession,
      movie: movie,
    };

    makeEditRequest(updatedSession, dispatch);
  };
};

// export const editSeatPrice = (
//   currentHall: ISession,
//   id: string,
//   price: number
// ) => {
//   return (dispatch: Dispatch<SessionAction>) => {
//     let updatedHall = {
//       ...currentHall,
//       seats: currentHall.seats.map((seat: ISeat) => {
//         if (seat.id === id) return { ...seat, price: price };
//         return seat;
//       }),
//     };

//     makeEditRequest(updatedHall, dispatch);
//   };
// };

export const editDate = (currentSession: ISession, date: Date) => {
  return (dispatch: Dispatch<SessionAction>) => {
    let updatedSession = {
      ...currentSession,
      date: date,
    };

    makeEditRequest(updatedSession, dispatch);
  };
};
