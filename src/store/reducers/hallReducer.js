import { ADD_HALL, DELETE_HALL, EDIT_HALL } from "../types"

const initialState = {
  halls: []
}

export const hallReducer = (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    case ADD_HALL:
      return { ...state, halls: [...state.halls, payload] }

    case EDIT_HALL:
      let newHalls = [...state.halls.map(hall => {
        if (hall.id === payload.id) {
          return payload
        }
        return hall
      })]
      return { ...state, halls: newHalls }

    case DELETE_HALL:
      return { ...state, halls: [...state.halls.filter(hall => hall.id !== payload)]}

    default:
      return state
  }
}

