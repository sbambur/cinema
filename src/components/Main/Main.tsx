import { FC, useContext, useEffect, useState } from "react";

import { useTypedSelector } from "hooks/useTypedSelector";
import { AuthContext } from "context/AuthContext";
import { useActions } from "hooks/useActions";

import CreateSessionModal from "components/Main/utils/CreateSessionModal";
import { MemoizedHallCard } from "components/Main/SessionCard";
import { MoviesList } from "components/Aside/MoviesList";
import Statistic from "components/Aside/Statistic";
import Header from "components/Header";
import {
  HallItemCreate,
  HallSchemeCreate,
  SchemeItem,
} from "components/Main/styles";

import { HallList, ContentContainer, Aside } from "components/Main/styles";
import { Button, Controls, StyledLink } from "styles/components";
import CreateSchemeModal from "./utils/CreateChemeModal";

const Main: FC = () => {
  const { error, loading, sessions } = useTypedSelector(
    (state) => state.sessionReducer
  );

  const { scheme } = useTypedSelector((state) => state.schemeReducer);
  const { fetchSessions, fetchScheme } = useActions();

  const [auth, setAuth] = useContext(AuthContext);
  const [createSessionModalOpen, setCreateSessionModalOpen] = useState(false);
  const [createSchemeModalOpen, setCreateSchemeModalOpen] = useState(false);

  useEffect(() => {
    fetchSessions(sessions);
    fetchScheme();
  }, []);

  if (loading) {
    return <h1>Идёт загрузка</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <Header />

      <Aside>
        <Button onClick={() => setAuth(!auth)}>
          {auth ? "Log out" : "Login"}
        </Button>
        <MoviesList />
        {/* <Statistic /> */}
        <div>
          <p>Схемы залов:</p>
          <ul className="list">
            {scheme.map((schemeOne) => {
              return (
                <SchemeItem key={schemeOne.id}>{schemeOne.title}</SchemeItem>
              );
            })}
            {auth ? (
              <HallSchemeCreate onClick={() => setCreateSchemeModalOpen(true)}>
                +
              </HallSchemeCreate>
            ) : null}
          </ul>
        </div>

        <Controls>
          {auth ? (
            <StyledLink to="settings">Страница настройки</StyledLink>
          ) : null}
        </Controls>
      </Aside>

      <ContentContainer>
        <HallList>
          {sessions.map((session) => {
            const schemeName = scheme.find(
              (schemeOne) => schemeOne.id === session.hall
            )?.title;
            return (
              <MemoizedHallCard
                key={session.id}
                id={session.id}
                title={schemeName ? schemeName : "нету"}
                movie={session.movie ? session.movie.title : "Фильм не выбран"}
                link={session.id}
                poster={
                  session.movie
                    ? session.movie.backdrop_path
                      ? session.movie.backdrop_path
                      : ""
                    : ""
                }
              />
            );
          })}
          {auth ? (
            <HallItemCreate onClick={() => setCreateSessionModalOpen(true)}>
              +
            </HallItemCreate>
          ) : null}
        </HallList>
      </ContentContainer>
      <CreateSessionModal
        closeModal={() => setCreateSessionModalOpen(false)}
        open={createSessionModalOpen}
      />
      <CreateSchemeModal
        basePrice={120}
        closeModal={() => setCreateSchemeModalOpen(false)}
        open={createSchemeModalOpen}
      />
    </>
  );
};

export default Main;
