import { SessionState, SessionActionTypes, SessionAction } from "types/session";

const initialState: SessionState = {
  sessions: [],
  loading: false,
  error: null,
};

export const sessionReducer = (
  state = initialState,
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case SessionActionTypes.FETCH_SESSIONS:
      return { loading: true, error: null, sessions: [] };
    case SessionActionTypes.FETCH_SESSIONS_SUCCESS:
      return { loading: false, error: null, sessions: action.payload };
    case SessionActionTypes.FETCH_SESSIONS_ERROR:
      return { loading: false, error: action.payload, sessions: [] };

    case SessionActionTypes.ADD_SESSION:
      return { ...state, sessions: [...state.sessions, action.payload] };
    case SessionActionTypes.DELETE_SESSION:
      return {
        ...state,
        sessions: state.sessions.filter(
          (session) => session.id !== action.payload
        ),
      };
    case SessionActionTypes.EDIT_SESSION:
      let newSessions = [
        ...state.sessions.map((session) => {
          if (session.id === action.payload.id) {
            return action.payload;
          }
          return session;
        }),
      ];
      return { ...state, sessions: newSessions };

    default:
      return state;
  }
};
