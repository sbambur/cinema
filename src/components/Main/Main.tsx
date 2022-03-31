import { FC, useContext, useState } from "react";

import { useTypedSelector } from "hooks/useTypedSelector";
import { AuthContext } from "context/AuthContext";

import { MoviesList } from "components/Aside/MoviesList";
import Statistic from "components/Aside/Statistic";
import Header from "components/Main/Header";
import HallCard from "components/Hall/HallCard";
import CreateHall from "components/Hall/CreateHall";
import CreateHallModal from "components/Hall/utils/CreateHallModal";
import BaseSettingsModal from "components/Aside/utils/BaseSettingsModal";

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

      <aside>
        <button onClick={() => setAuth(!auth)} className="create_hall_button">
          {auth ? "Log out" : "Login"}
        </button>
        <MoviesList />
        <Statistic />
        {auth ? (
          <button
            className="create_hall_button"
            onClick={openModal("settingsModal", true)}
          >
            Настройки
          </button>
        ) : null}
      </aside>

      <div className="content">
        <div className="hall_list">
          {halls.map((hall) => {
            return (
              <HallCard
                key={hall.id}
                id={hall.id}
                title={hall.title}
                movie={hall.movie ? hall.movie.title : "Фильм не выбран"}
                link={hall.id}
              />
            );
          })}
          {auth ? <CreateHall openModal={openModal} /> : null}
        </div>
      </div>

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
