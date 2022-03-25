import { useEffect, useState } from "react";
import { getCurrentHallStat, getHallsStat } from "./utils/calculateStatistic";

const Statistic = ({ halls, currentHall }) => {
  const [stat, setStat] = useState({});

  useEffect(() => {
    let statistic;
    if (!currentHall) {
      statistic = getHallsStat(halls);
    } else {
      statistic = getCurrentHallStat(currentHall);
    }

    setStat(statistic);
  }, [halls, currentHall]);

  return (
    <div className="statistic">
      <div className="statistic__header">Информация</div>
      <div className="statistic__info">
        <p>
          Всего мест: <span>{stat.total}</span>
        </p>
        <p>
          Свободно: <span>{stat.free}</span>
        </p>
        <p>
          Куплено: <span>{stat.reserved}</span>
        </p>
        <p>
          Выручка: <span>{stat.sum}</span>₽
        </p>
      </div>
    </div>
  );
};

export default Statistic;
