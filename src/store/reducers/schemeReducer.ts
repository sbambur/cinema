import { SchemeState, SchemeActionTypes, SchemeAction } from "types/scheme";

const initialState: SchemeState = {
  scheme: [],
  loading: false,
  error: null,
};

export const schemeReducer = (
  state = initialState,
  action: SchemeAction
): SchemeState => {
  switch (action.type) {
    case SchemeActionTypes.FETCH_SCHEME:
      return { loading: true, error: null, scheme: [] };
    case SchemeActionTypes.FETCH_SCHEME_SUCCESS:
      return { loading: false, error: null, scheme: action.payload };
    case SchemeActionTypes.FETCH_SCHEME_ERROR:
      return { loading: false, error: action.payload, scheme: [] };

    case SchemeActionTypes.ADD_SCHEME:
      return { ...state, scheme: [...state.scheme, action.payload] };
    case SchemeActionTypes.DELETE_SCHEME:
      return {
        ...state,
        scheme: state.scheme.filter(
          (oneScheme) => oneScheme.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
