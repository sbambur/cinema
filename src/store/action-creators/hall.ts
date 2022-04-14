import { HALLS_URL, ENDPOINTS } from "api/api";
import { Dispatch } from "react";
import {
  HallActionTypes,
  HallAction,
  IHall,
  IMovie,
  ISeatReq,
  ISeat,
} from "types/hall";

export const fetchHalls = (storeHalls: IHall[]) => {
  return async (dispatch: Dispatch<HallAction>) => {
    try {
      if (!storeHalls.length) dispatch({ type: HallActionTypes.FETCH_HALLS });
      const response = await HALLS_URL.get(ENDPOINTS.HALLS);

      if (JSON.stringify(storeHalls) === JSON.stringify(response.data)) {
      } else {
        dispatch({
          type: HallActionTypes.FETCH_HALLS_SUCCESS,
          payload: response.data,
        });
      }
      dispatch({
        type: HallActionTypes.FETCH_HALLS_SUCCESS,
        payload: [],
      });
    } catch (e) {
      dispatch({
        type: HallActionTypes.FETCH_HALLS_ERROR,
        payload: "Произошла ошибка при загрузке списка фильмов",
      });
    }
  };
};

export const fetchHall = (id: string) => {
  return async (dispatch: Dispatch<HallAction>) => {
    try {
      const response = await HALLS_URL.get(`${ENDPOINTS.HALLS}/${id}`);
      dispatch({
        type: HallActionTypes.EDIT_HALL,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteHall = (id: string) => {
  return (dispatch: Dispatch<HallAction>) => {
    const makeDeleteRequest = async () => {
      try {
        if (!id) {
          throw new Error("Не указан ID");
        }
        await HALLS_URL.delete(`${ENDPOINTS.HALLS}/${id}`);
        dispatch({ type: HallActionTypes.DELETE_HALL, payload: id });
      } catch (e) {
        console.log(e);
      }
    };
    makeDeleteRequest();
  };
};

export interface createHallType {
  title: string;
  count: string;
  price: string;
}

const generateSeats = (length: number, basePrice: string): ISeatReq[] => {
  let rowPos = 0;
  let seatPos = 0;
  let xPos = 85;
  let yPos = 75;

  let content = Array.from({ length }, (a, i) => ({
    seatNumber: i + 1,
    price: Number(basePrice),
    reserved: false,
    pos: {
      row: String(seatPos % 8 || seatPos === 1 ? rowPos : ++rowPos),
      seat: String(seatPos >= 8 ? (seatPos = 1) : ++seatPos),
    },
    height: 65,
    width: 75,
    x: xPos * seatPos - xPos,
    y: yPos * rowPos - yPos,
  }));

  return content;
};

export const createHall = ({ title, count, price }: createHallType) => {
  return (dispatch: Dispatch<HallAction>) => {
    const newHall = {
      title: title,
      reserved: false,
      active: true,
      date: null,
      movie: null,
      seats: generateSeats(+count, price),
    };
    const makeAddRequest = async () => {
      try {
        const response = await HALLS_URL.post(ENDPOINTS.HALLS, newHall);
        dispatch({ type: HallActionTypes.ADD_HALL, payload: response.data });
      } catch (e) {
        console.log(e);
      }
    };
    makeAddRequest();
  };
};

// ************** EDIT HALLS ACTIONS **************

const makeEditRequest = async (
  updatedHall: IHall,
  dispatch: Dispatch<HallAction>
) => {
  try {
    const response = await HALLS_URL.put(ENDPOINTS.HALLS, updatedHall);
    dispatch({ type: HallActionTypes.EDIT_HALL, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const reserveSeat = (currentHall: IHall, id: string) => {
  return (dispatch: Dispatch<HallAction>) => {
    let updatedHall = {
      ...currentHall,
      seats: currentHall.seats.map((seat: ISeat) => {
        if (seat._id === id) return { ...seat, reserved: !seat.reserved };
        return seat;
      }),
    };

    makeEditRequest(updatedHall, dispatch);
  };
};

export const setMovie = (currentHall: IHall, movie: IMovie) => {
  return (dispatch: Dispatch<HallAction>) => {
    let updatedHall = {
      ...currentHall,
      movie: movie,
    };

    makeEditRequest(updatedHall, dispatch);
  };
};

export const editSeatPrice = (
  currentHall: IHall,
  id: string,
  price: number
) => {
  return (dispatch: Dispatch<HallAction>) => {
    let updatedHall = {
      ...currentHall,
      seats: currentHall.seats.map((seat: ISeat) => {
        if (seat._id === id) return { ...seat, price: price };
        return seat;
      }),
    };

    makeEditRequest(updatedHall, dispatch);
  };
};

export const editDate = (currentHall: IHall, date: Date) => {
  return (dispatch: Dispatch<HallAction>) => {
    let updatedHall = {
      ...currentHall,
      date: date,
    };

    makeEditRequest(updatedHall, dispatch);
  };
};
