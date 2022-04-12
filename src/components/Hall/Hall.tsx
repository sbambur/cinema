import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Collection } from "react-virtualized";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import "react-virtualized/styles.css";
import "antd/dist/antd.css";
import ruRU from "antd/lib/locale/ru_RU";

import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";

import { IHall, ISeat } from "types/hall";

import Header from "components/Header";
import Seat from "components/Hall/utils/Seat";
import Statistic from "components/Aside/Statistic";
import SearchHeader from "components/Hall/SearchHeader";
import SeatSettingModal from "components/Hall/utils/SeatSettingModal";
import { MemoizedMovieDescription } from "components/Aside/MovieDescription";

import { Controls, StyledLink } from "styles/components";
import { Aside, ContentContainer } from "components/Main/styles";
import { CinemaHall } from "components/Hall/styles";

const Hall: FC = () => {
  const { id: hallId } = useParams();

  const { halls } = useTypedSelector((state) => state.hallReducer);
  const [currentHall, setCurrentHall] = useState<IHall | null>(null);
  const [currentSeat, setCurrentSeat] = useState<ISeat | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { reserveSeat, editSeatPrice, editDate, fetchHall } = useActions();

  function onDateChange(_: any, dateString: string) {
    const formatDate = moment(dateString, "DD.MM.YYYY").format("YYYY-MM-DD");

    if (currentHall && !currentHall.date) {
      editDate(currentHall, new Date(formatDate));
    } else {
      const timeOnly = moment(currentHall?.date).format("HH:mm");
      const newDate = moment().format(`${formatDate}, ${timeOnly}`);

      editDate(currentHall!, new Date(newDate));
    }
  }

  function onTimeChange(_: any, timeString: string) {
    const dateOnly = moment(currentHall?.date).format("YYYY-MM-DD");
    const newDate = moment().format(`${dateOnly}, ${timeString}`);

    editDate(currentHall!, new Date(newDate));
  }

  const reserveSeatLocal = (id: string) => {
    return () => reserveSeat(currentHall!, id);
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
      editSeatPrice(currentHall!, id, price);
    };
  };

  const openModal = (key: string) => {
    if (!currentHall) return;
    return (e: any) => {
      e.stopPropagation();
      currentHall.seats.map((seat: ISeat) => {
        if (seat._id === key) {
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

  useEffect(() => {
    fetchHall(hallId!);
  }, []);

  useLayoutEffect(() => {
    setCurrentHall(halls.find((hall) => hall._id === hallId)!);
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
      <Seat
        key={seat._id}
        seat={seat}
        reserveSeatLocal={reserveSeatLocal}
        openModal={openModal}
      />
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
        <Controls $center>
          <DatePicker
            locale={ruRU.DatePicker}
            onChange={onDateChange}
            format={"DD.MM.YYYY"}
            value={
              currentHall.date ? moment(new Date(currentHall.date)) : undefined
            }
          />
          <TimePicker
            locale={ruRU.DatePicker}
            onChange={onTimeChange}
            format={"HH:mm"}
            placeholder={"Время"}
            value={
              currentHall.date ? moment(new Date(currentHall.date)) : undefined
            }
            disabled={currentHall.date ? false : true}
          />
        </Controls>

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
