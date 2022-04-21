import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import "react-virtualized/styles.css";
import "antd/dist/antd.css";
import ruRU from "antd/lib/locale/ru_RU";

import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";

import { ISession } from "types/session";
import { IScheme, ISeat } from "types/scheme";

import Header from "components/Header";
import Seat from "components/Session/utils/Seat";
import Statistic from "components/Aside/Statistic";
import SearchHeader from "components/Session/SearchHeader";
import { MemoizedMovieDescription } from "components/Aside/MovieDescription";

import { Controls, StyledLink } from "styles/components";
import { Aside, ContentContainer } from "components/Main/styles";
import { CinemaHall } from "components/Session/styles";

const Session: FC = () => {
  const { id: sessionsId } = useParams();

  const { sessions } = useTypedSelector((state) => state.sessionReducer);
  const { scheme } = useTypedSelector((state) => state.schemeReducer);

  const [currentSession, setCurrentSession] = useState<ISession | null>(null);
  const [currentHall, setCurrentHall] = useState<IScheme | null>(null);
  const { editDate, fetchSession } = useActions();

  function onDateChange(_: any, dateString: string) {
    const formatDate = moment(dateString, "DD.MM.YYYY").format("YYYY-MM-DD");

    if (currentSession && !currentSession.date) {
      editDate(currentSession, new Date(formatDate));
    } else {
      const timeOnly = moment(currentSession?.date).format("HH:mm");
      const newDate = moment().format(`${formatDate}, ${timeOnly}`);

      editDate(currentSession!, new Date(newDate));
    }
  }

  function onTimeChange(_: any, timeString: string) {
    const dateOnly = moment(currentSession?.date).format("YYYY-MM-DD");
    const newDate = moment().format(`${dateOnly}, ${timeString}`);

    editDate(currentSession!, new Date(newDate));
  }

  // const reserveSeatLocal = (id: string) => {
  //   return () => reserveSeat(currentSession!, id);
  // };

  useEffect(() => {
    sessionsId && fetchSession(sessionsId);
  }, []);

  useLayoutEffect(() => {
    setCurrentSession(sessions.find((session) => session.id === sessionsId)!);
    setCurrentHall(
      scheme.find(
        (schemeOne) => schemeOne.id === currentSession?.hall!
      ) as IScheme
    );
  }, [sessionsId, sessions]);

  if (!currentSession) {
    return (
      <div>
        упс, <StyledLink to={"/"}>домой</StyledLink>
      </div>
    );
  }

  return (
    <>
      <Header title={currentSession.title} />

      <Aside>
        <MemoizedMovieDescription currentMovie={currentSession.movie} />
      </Aside>

      <ContentContainer>
        <StyledLink to="/">Назад</StyledLink>

        <SearchHeader currentSession={currentSession} />
        <Controls $center>
          <DatePicker
            locale={ruRU.DatePicker}
            onChange={onDateChange}
            format={"DD.MM.YYYY"}
            value={
              currentSession.date
                ? moment(new Date(currentSession.date))
                : undefined
            }
          />
          <TimePicker
            locale={ruRU.DatePicker}
            onChange={onTimeChange}
            format={"HH:mm"}
            placeholder={"Время"}
            value={
              currentSession.date
                ? moment(new Date(currentSession.date))
                : undefined
            }
            disabled={currentSession.date ? false : true}
          />
        </Controls>

        <CinemaHall>
          {/* Displaying seats for this Session */}
          {currentHall &&
            currentHall.seats.map((seat) => {
              return <Seat key={seat.id} seat={seat} />;
            })}
        </CinemaHall>
      </ContentContainer>
    </>
  );
};

export default Session;
