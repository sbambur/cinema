import { FC, useContext } from "react";
import { Link } from "react-router-dom";

import { useActions } from "hooks/useActions";
import { AuthContext } from "context/AuthContext";

interface HallCardProps {
  link: string;
  title: string;
  movie: string;
  id: string;
}

const HallCard: FC<HallCardProps> = ({ link, title, movie, id }) => {
  const { deleteHall } = useActions();
  const [auth] = useContext(AuthContext);

  const handleClick = (key: string) => {
    return () => {
      deleteHall(key);
    };
  };

  return (
    <div className="hall_list__item">
      <div className="hall_item">
        <p>
          Зал: <span>{title}</span>
        </p>
        <p>
          Фильм: <span>{movie}</span>
        </p>
        <Link to={"hall/" + link} className="create_hall_button">
          Изменить
        </Link>
        {auth ? (
          <button
            onClick={handleClick(id)}
            className="create_hall_button delete"
          >
            Удалить
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default HallCard;
