import MainLayout from "../../UI/MainLayout";
import { MemoMoviesList } from "../Aside/MoviesList";
import HallCard from "../Hall/HallCard";
import { useContext, useState } from "react";
import Header from "./Header";
import Statistic from "../Aside/Statistic";
import CreateHall from "../Hall/CreateHall";
import CreateHallModal from "../Hall/utils/CreateHallModal";
import BaseSettingsModal from "../Aside/utils/BaseSettingsModal";
import { AuthContext } from "../../context/AuthContext";
import { FC } from "react";
import { useTypeSelector } from "../../hooks/useTypeSelector";

interface isModalOpenState {
  hallModal: boolean;
  settingsModal: boolean;
}

export const Main: FC = () => {
  const { halls } = useTypeSelector((state) => state.hallReducer);
  const [basePrice, setBasePrice] = useState(120);
  const [isModalOpen, setModalOpen] = useState<isModalOpenState>({
    hallModal: false,
    settingsModal: false,
  });

  const [auth, setAuth] = useContext(AuthContext);

  const openModal = (modalName: string, isOpen: boolean) => {
    return () => {
      setModalOpen({ ...isModalOpen, [modalName]: isOpen });
    };
  };

  const closeModal = () => {
    setModalOpen({hallModal: false,settingsModal: false });
  };

  return (
    <MainLayout>
      <Header />

      <aside>
        <button onClick={() => setAuth(!auth)} className="create_hall_button">
          {auth ? "Log out" : "Login"}
        </button>
        <MemoMoviesList halls={halls} />
        <Statistic halls={halls} />
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
    </MainLayout>
  );
};
