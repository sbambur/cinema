import { Link } from "react-router-dom";

const HallCard = ({ link, title, movie }) => {
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
      </div>
    </div>
  );
};

export default HallCard;
