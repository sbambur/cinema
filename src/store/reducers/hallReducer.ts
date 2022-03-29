import { HallState, TodoActionTypes, HallAction } from "../../types/hall"

const initialState: HallState = {
  halls: []
}

export const hallReducer = (state = initialState, action: HallAction): HallState => {
  const { payload, type } = action
  switch (type) {
    case TodoActionTypes.ADD_HALL:
      return { ...state, halls: [...state.halls, payload] }

    case TodoActionTypes.EDIT_HALL:
      let newHalls = [...state.halls.map(hall => {
        if (hall.id === payload.id) {
          return payload
        }
        return hall
      })]
      return { ...state, halls: newHalls }

    case TodoActionTypes.DELETE_HALL:
      return { ...state, halls: [...state.halls.filter(hall => hall.id !== payload)]}

    default:
      return state
  }
}

