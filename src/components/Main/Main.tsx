import { FC, useContext, useState } from "react";

import { useTypedSelector } from "hooks/useTypedSelector";
import { AuthContext } from "context/AuthContext";

import { MoviesList } from "components/Aside/MoviesList";
import Statistic from "components/Aside/Statistic";
import Header from "components/Header";
import { MemoizedHallCard } from "components/Main/HallCard";
import CreateHall from "components/Main/CreateHall";
import CreateHallModal from "components/Main/utils/CreateHallModal";
import BaseSettingsModal from "components/Aside/utils/BaseSettingsModal";

import { Button, Controls, StyledLink } from "styles/components";
import { HallList, ContentContainer, Aside } from "components/Main/styles";

interface isModalOpenState {
  hallModal: boolean;
  settingsModal: boolean;
}

const Main: FC = () => {
  const { halls } = useTypedSelector((state) => state.hallReducer);
  const [basePrice, setBasePrice] = useState(120);
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
            <Button onClick={openModal("settingsModal", true)}>
              Настройки
            </Button>
          ) : null}
          <StyledLink to="settings">Страница настройки</StyledLink>
        </Controls>
      </Aside>

      <ContentContainer>
        <HallList>
          {halls.map((hall) => {
            return (
              <MemoizedHallCard
                key={hall.id}
                id={hall.id}
                title={hall.title}
                movie={hall.movie ? hall.movie.title : "Фильм не выбран"}
                link={hall.id}
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

      <BaseSettingsModal
        basePrice={basePrice}
        setBasePrice={setBasePrice}
        closeModal={closeModal}
        open={isModalOpen.settingsModal}
      />
      <CreateHallModal
        basePrice={basePrice}
        closeModal={closeModal}
        open={isModalOpen.hallModal}
      />
    </>
  );
};

export default Main;
