import { FC } from "react";
import { useEffect, useState } from "react";
import { IHall } from "../../types/hall";
import { getHallsStat } from "./utils/calculateStatistic";

interface StatisticProps {
  halls: IHall[];
  currentHall?: IHall;
}

interface statInfo {
  total: number;
  free: number;
  reserved: number;
  sum: number;
}

const initialStatState: statInfo  = {
  total: 0,
  free: 0,
  reserved: 0,
  sum: 0
}

const Statistic: FC<StatisticProps> = ({ halls, currentHall }) => {
  const [stat, setStat] = useState<statInfo>(initialStatState);

  useEffect(() => {
    if (currentHall) {
      setStat(getHallsStat([currentHall]));
    } else {
      setStat(getHallsStat(halls));
    }
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
