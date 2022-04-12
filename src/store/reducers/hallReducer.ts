import { HallState, HallActionTypes, HallAction } from "types/hall";

const initialState: HallState = {
  halls: [],
  loading: false,
  error: null,
};

export const hallReducer = (
  state = initialState,
  action: HallAction
): HallState => {
  switch (action.type) {
    case HallActionTypes.FETCH_HALLS:
      return { loading: true, error: null, halls: [] };
    case HallActionTypes.FETCH_HALLS_SUCCESS:
      return { loading: false, error: null, halls: action.payload };
    case HallActionTypes.FETCH_HALLS_ERROR:
      return { loading: false, error: action.payload, halls: [] };

    case HallActionTypes.ADD_HALL:
      return { ...state, halls: [...state.halls, action.payload] };
    case HallActionTypes.DELETE_HALL:
      return {
        ...state,
        halls: state.halls.filter((hall) => hall._id !== action.payload),
      };
    case HallActionTypes.EDIT_HALL:
      let newHalls = [
        ...state.halls.map((hall) => {
          if (hall._id === action.payload._id) {
            return action.payload;
          }
          return hall;
        }),
      ];
      return { ...state, halls: newHalls };

    default:
      return state;
  }
};
