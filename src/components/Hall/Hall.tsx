import { FC, useContext, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "context/AuthContext";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";

import { IHall, ISeat } from "types/hall";

import { MemoizedMovieDescription } from "components/Aside/MovieDescription";
import Statistic from "components/Aside/Statistic";
import Header from "components/Header";
import SearchHeader from "components/Hall/SearchHeader";
import Seat from "components/Hall/utils/Seat";
import SeatSettingModal from "components/Hall/utils/SeatSettingModal";

import { Aside, ContentContainer } from "components/Main/styles";
import { StyledLink } from "styles/components";
import { ButtonSeatEdit, CinemaHall, SeatItem } from "components/Hall/styles";

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
        упс, <StyledLink to={"/"}>домой</StyledLink>
      </div>
    );
  }

  return (
    <>
      <Header title={currentHall.title} />

      <Aside>
        <MemoizedMovieDescription currentMovie={currentHall.movie} />
        <Statistic currentHall={currentHall} />
      </Aside>

      <ContentContainer>
        <StyledLink to="/">Назад</StyledLink>

        <SearchHeader currentHall={currentHall} />

        <CinemaHall>
          {currentHall.seats.map((seat) => {
            return (
              <Seat key={seat.id}>
                <SeatItem
                  $reserved={seat.reserved}
                  onClick={reserveSeatLocal(seat.id)}
                >
                  {seat.seatNumber}
                  <p>{seat.price}₽</p>
                  {auth ? (
                    <ButtonSeatEdit onClick={openModal(seat.id)}>
                      Edit
                    </ButtonSeatEdit>
                  ) : null}
                </SeatItem>
              </Seat>
            );
          })}
        </CinemaHall>
      </ContentContainer>

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
