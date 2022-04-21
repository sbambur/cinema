import { BASE_URL, ENDPOINTS } from "api/api";
import { Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";
import { SchemeActionTypes, SchemeAction, ISeat } from "types/scheme";

export const fetchScheme = () => {
  return async (dispatch: Dispatch<SchemeAction>) => {
    try {
      dispatch({ type: SchemeActionTypes.FETCH_SCHEME });

      const response = await BASE_URL.get(ENDPOINTS.SCHEME);

      dispatch({
        type: SchemeActionTypes.FETCH_SCHEME_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: SchemeActionTypes.FETCH_SCHEME_ERROR,
        payload: "Произошла ошибка при загрузке списка схем залов",
      });
    }
  };
};

const generateSeats = (length: number, basePrice: string): ISeat[] => {
  let rowPos = 0;
  let seatPos = 0;

  let content = Array.from({ length }, (a, i) => ({
    id: uuidv4(),
    seatNumber: i + 1,
    price: Number(basePrice),
    pos: {
      row: String(seatPos % 8 || seatPos === 1 ? rowPos : ++rowPos),
      seat: String(seatPos >= 8 ? (seatPos = 1) : ++seatPos),
    },
  }));

  return content;
};

interface createSchemeType {
  title: string;
  count: string;
  price: string;
}

export const createScheme = ({ title, count, price }: createSchemeType) => {
  return (dispatch: Dispatch<SchemeAction>) => {
    const newScheme = {
      title: title,
      seats: generateSeats(+count, price),
    };
    const makeAddRequest = async () => {
      try {
        const response = await BASE_URL.post(ENDPOINTS.SCHEME, newScheme);
        dispatch({
          type: SchemeActionTypes.ADD_SCHEME,
          payload: response.data,
        });
      } catch (e) {
        console.log(e);
      }
    };
    makeAddRequest();
  };
};

export const deleteScheme = (id: string) => {
  return (dispatch: Dispatch<SchemeAction>) => {
    const makeDeleteRequest = async () => {
      try {
        if (!id) {
          throw new Error("Не указан ID");
        }
        await BASE_URL.delete(`${ENDPOINTS.SCHEME}/${id}`);
        dispatch({ type: SchemeActionTypes.DELETE_SCHEME, payload: id });
      } catch (e) {
        console.log(e);
      }
    };
    makeDeleteRequest();
  };
};
