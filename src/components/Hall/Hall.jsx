import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MainLayout } from "../../UI/MainLayout";
import MovieDescription from "../Aside/MovieDescription";
import Statistic from "../Aside/Statistic";
import Header from "../Main/Header";
import SearchHeader from "./SearchHeader";
import Seat from "./utils/Seat";
import SeatSettingModal from "./utils/SeatSettingModal";

const Hall = () => {
  const { id: hallId } = useParams();
  const { halls } = useSelector((state) => state.hallReducer);
  const [currentHall, setCurrentHall] = useState({});
  const [currentSeat, setCurrentSeat] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setCurrentHall(halls.find((hall) => hall.id === hallId));
    return () => setCurrentHall({});
  }, [hallId, halls]);

  if (Object.keys(currentHall).length === 0) {
    return null;
  }

  const reserveSeatLocal = (id) => {
    let updatedHall = {
      ...currentHall,
      seats: currentHall.seats.map((seat) => {
        if (seat.id === id) return { ...seat, reserved: !seat.reserved };
        return seat;
      }),
    };
    dispatch({ type: "EDIT_HALL", payload: updatedHall });
  };

  const validatePrice = (price) => {
    if (price < 0) return 0;
    if (price > 999) return 999;
    return +price;
  };

  const editSeatPrice = (id) => {
    return (e) => {
      const price = validatePrice(e.target.value);
      setCurrentSeat({ ...currentSeat, price: price });
      let updatedHall = {
        ...currentHall,
        seats: currentHall.seats.map((seat) => {
          if (seat.id === id) return { ...seat, price: price };
          return seat;
        }),
      };
      dispatch({ type: "EDIT_HALL", payload: updatedHall });
    };
  };

  const openModal = (key) => {
    return (e) => {
      e.stopPropagation();
      currentHall.seats.map((seat) => {
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

  return (
    <MainLayout>
      <Header title={currentHall.title} />

      <aside>
        <MovieDescription currentMovie={currentHall.movie} />
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
                  <Seat
                    key={seat.id}
                    id={seat.id}
                    seatNumber={seat.seatNumber}
                    price={seat.price}
                    reserved={seat.reserved}
                    reserve={reserveSeatLocal}
                    openModal={openModal}
                  />
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
        editSeatPrice={editSeatPrice}
      />
    </MainLayout>
  );
};

export default Hall;
