import { FC, useContext, useLayoutEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

import { AuthContext } from "context/AuthContext";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";

import { IHall, ISeat } from "types/hall";

import { MemoizedMovieDescription } from "components/Aside/MovieDescription";
import Statistic from "components/Aside/Statistic";
import Header from "components/Main/Header";
import SearchHeader from "components/Hall/SearchHeader";
import Seat from "components/Hall/utils/Seat";
import SeatSettingModal from "components/Hall/utils/SeatSettingModal";

const Hall: FC = () => {
  const { id: hallId } = useParams();
  const { halls } = useTypedSelector((state) => state.hallReducer);
  const [currentHall, setCurrentHall] = useState<IHall | null>(null);
  const [currentSeat, setCurrentSeat] = useState<ISeat | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { reserveSeat, editSeatPrice } = useActions();
  const [auth] = useContext(AuthContext);

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
      currentSeat && setCurrentSeat({ ...currentSeat, price: price });
      editSeatPrice(currentHall, id, price);
    };
  };

  const openModal = (key: string) => {
    if (!currentHall) return;
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

  useLayoutEffect(() => {
    setCurrentHall(halls.find((hall) => hall.id === hallId)!);
  }, [hallId, halls]);

  if (!currentHall) {
    return (
      <div>
        упс,{" "}
        <NavLink to={"/"} style={{ color: "#6fcefd" }}>
          домой
        </NavLink>
      </div>
    );
  }

  return (
    <>
      <Header title={currentHall.title} />

      <aside>
        <MemoizedMovieDescription currentMovie={currentHall.movie} />
        <Statistic currentHall={currentHall} />
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
    </>
  );
};

export default Hall;
