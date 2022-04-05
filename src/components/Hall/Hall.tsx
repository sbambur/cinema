import { FC, useContext, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Collection } from "react-virtualized";
import "react-virtualized/styles.css";

import { useActions } from "hooks/useActions";
import { AuthContext } from "context/AuthContext";
import { useTypedSelector } from "hooks/useTypedSelector";

import { IHall, ISeat } from "types/hall";

import Header from "components/Header";
import Seat from "components/Hall/utils/Seat";
import Statistic from "components/Aside/Statistic";
import SearchHeader from "components/Hall/SearchHeader";
import SeatSettingModal from "components/Hall/utils/SeatSettingModal";
import { MemoizedMovieDescription } from "components/Aside/MovieDescription";

import { StyledLink } from "styles/components";
import { Aside, ContentContainer } from "components/Main/styles";
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
    // console.log(JSON.stringify(currentHall));
  }, [hallId, halls]);

  if (!currentHall) {
    return (
      <div>
        упс, <StyledLink to={"/"}>домой</StyledLink>
      </div>
    );
  }

  function cellRenderer({ index }: any) {
    let seat = currentHall!.seats[index];
    return (
      <Seat key={seat.id}>
        <SeatItem
          $x={seat.x}
          $y={seat.y}
          $height={seat.height}
          $width={seat.width}
          $reserved={seat.reserved}
          onClick={reserveSeatLocal(seat.id)}
        >
          {seat.pos.seat}
          <p>{seat.price}₽</p>
          {auth ? (
            <ButtonSeatEdit onClick={openModal(seat.id)}>Edit</ButtonSeatEdit>
          ) : null}
        </SeatItem>
      </Seat>
    );
  }

  function cellSizeAndPositionGetter({ index }: any) {
    const datum = currentHall!.seats[index];
    return {
      height: datum.height,
      width: datum.width,
      x: datum.x,
      y: datum.y,
    };
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
        <div>{currentHall.date}</div>
        <CinemaHall>
          <Collection
            cellCount={currentHall.seats.length}
            cellRenderer={cellRenderer}
            cellSizeAndPositionGetter={cellSizeAndPositionGetter}
            height={375}
            width={695}
          />
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
