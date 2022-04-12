import { FC, useContext, useEffect, useState } from "react";

import { useTypedSelector } from "hooks/useTypedSelector";
import { AuthContext } from "context/AuthContext";
import { useActions } from "hooks/useActions";

import CreateHallModal from "components/Main/utils/CreateHallModal";
import { MemoizedHallCard } from "components/Main/HallCard";
import { MoviesList } from "components/Aside/MoviesList";
import CreateHall from "components/Main/CreateHall";
import Statistic from "components/Aside/Statistic";
import Header from "components/Header";

import { HallList, ContentContainer, Aside } from "components/Main/styles";
import { Button, Controls, StyledLink } from "styles/components";

interface isModalOpenState {
  hallModal: boolean;
  settingsModal: boolean;
}

const Main: FC = () => {
  const { error, loading, halls } = useTypedSelector(
    (state) => state.hallReducer
  );
  const { fetchHalls } = useActions();

  const [auth, setAuth] = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState<isModalOpenState>({
    hallModal: false,
    settingsModal: false,
  });

  const openModal = (modalName: string, isOpen: boolean) => {
    return () => {
      setModalOpen({ ...isModalOpen, [modalName]: isOpen });
    };
  };

  const closeModal = () => {
    setModalOpen({ hallModal: false, settingsModal: false });
  };

  useEffect(() => {
    fetchHalls(halls);
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
        <Statistic />
        <Controls>
          {auth ? (
            <StyledLink to="settings">Страница настройки</StyledLink>
          ) : null}
        </Controls>
      </Aside>

      <ContentContainer>
        <HallList>
          {halls.map((hall) => {
            return (
              <MemoizedHallCard
                key={hall._id}
                id={hall._id}
                title={hall.title}
                movie={hall.movie ? hall.movie.title : "Фильм не выбран"}
                link={hall._id}
                poster={
                  hall.movie
                    ? hall.movie.backdrop_path
                      ? hall.movie.backdrop_path
                      : ""
                    : ""
                }
              />
            );
          })}
          {auth ? <CreateHall openModal={openModal} /> : null}
        </HallList>
      </ContentContainer>
      <CreateHallModal
        basePrice={120}
        closeModal={closeModal}
        open={isModalOpen.hallModal}
      />
    </>
  );
};

export default Main;
