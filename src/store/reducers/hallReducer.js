import { ADD_HALL, RESERVE_HALL_SEAT } from "../types"

const initialState = {
  halls: []
}

export const hallReducer = (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    case ADD_HALL:
      return { ...state, halls: [...state.halls, payload] }

    case 'EDIT_HALL':
      let newHalls = [...state.halls.map(hall => {
        if (hall.id === payload.id) {
          return payload
        }
        return hall
      })]
      return { ...state, halls: newHalls }

    case RESERVE_HALL_SEAT:
      const { hallId, seatId } = payload;
      return {
        ...state,
        halls: [...state.halls].map(h => {
          let otherSeats = [];
          h.seats.map((seat) => {
            if (seat.id === payload) {
              otherSeats.push({ ...seat, reserved: !seat.reserved });
            } else {
              otherSeats.push(seat);
            }
            return true
          });
          return { ...h, seats: otherSeats };
        })
      }

    default:
      return state
  }
}

