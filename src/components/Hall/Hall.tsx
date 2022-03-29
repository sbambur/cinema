import { useContext, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useActions } from "../../hooks/useActions";
import { MemoMovieDescription } from "../Aside/MovieDescription";
import MainLayout from "../../UI/MainLayout";
import Statistic from "../Aside/Statistic";
import Header from "../Main/Header";
import SearchHeader from "./SearchHeader";
import Seat from "./utils/Seat";
import SeatSettingModal from "./utils/SeatSettingModal";
import { FC } from "react";
import { IHall, ISeat } from "../../types/hall";
import { useTypeSelector } from "../../hooks/useTypeSelector";

const Hall: FC = () => {
  const { id: hallId } = useParams();
  const { halls } = useTypeSelector(state => state.hallReducer);
  const [currentHall, setCurrentHall] = useState<IHall>(halls[0]);
  const [currentSeat, setCurrentSeat] = useState<ISeat>(currentHall.seats[0]);
  const [isModalOpen, setModalOpen] = useState(false);
  const { reserveSeat, editSeatPrice } = useActions();
  const [auth] = useContext(AuthContext);

  useLayoutEffect(() => {
    setCurrentHall(halls.find((hall) => hall.id === hallId)!);
  }, [hallId, halls]);

  const reserveSeatLocal = (id: string) => {
    return () => reserveSeat(currentHall, id);
  };

  const validatePrice = (price: string): number => {
    if (Number(price) < 0) return 0;
    if (Number(price) > 999) return 999;
    return +price;
  };

  const editSeatPriceLocal = (id: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const price = validatePrice(e.target.value);
      setCurrentSeat({ ...currentSeat, price: price });
      editSeatPrice(currentHall, id, price);
    };
  };

  const openModal = (key: string) => {
    return (e: any) => {
      e.stopPropagation();
      currentHall.seats.map((seat: ISeat) => {
        if (seat.id === key) {
          setCurrentSeat(seat);
        }
        return null;
      });
      setModalOpen(true);
    };
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (Object.keys(currentHall).length === 0) {
    return null;
  }

  return (
    <MainLayout>
      <Header title={currentHall.title} />

      <aside>
        <MemoMovieDescription currentMovie={currentHall.movie} />
        <Statistic halls={halls} currentHall={currentHall} />
      </aside>

      <div className="content">
        <div className="hall_list">
          <div className="current_hall">
            <Link to="/" className="create_hall_button">
              Назад
            </Link>

            <SearchHeader currentHall={currentHall} />
            <div className="cinema-hall">
              {currentHall.seats.map((seat) => {
                return (
                  <Seat key={seat.id}>
                    <div
                      className={`seat ${seat.reserved ? "active" : ""}`}
                      onClick={reserveSeatLocal(seat.id)}
                    >
                      {seat.seatNumber}
                      <p>{seat.price}₽</p>
                      {auth ? (
                        <button
                          className="edit_seat_button"
                          onClick={openModal(seat.id)}
                        >
                          Edit
                        </button>
                      ) : null}
                    </div>
                  </Seat>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <SeatSettingModal
        open={isModalOpen}
        closeModal={closeModal}
        currentSeat={currentSeat}
        editSeatPrice={editSeatPriceLocal}
      />
    </MainLayout>
  );
};

export default Hall;
