import { FC } from "react";
import { useEffect, useState } from "react";

import { IHall } from "types/hall";
import { getHallsStat } from "components/Aside/utils/calculateStatistic";
import { useTypedSelector } from "hooks/useTypedSelector";

import { SideHeader, StatisticContainer } from "components/Aside/styles";

interface StatisticProps {
  currentHall?: IHall;
}

interface statInfo {
  total: number;
  free: number;
  reserved: number;
  sum: number;
}

const initialStatState: statInfo = {
  total: 0,
  free: 0,
  reserved: 0,
  sum: 0,
};

const Statistic: FC<StatisticProps> = ({ currentHall }) => {
  const { halls } = useTypedSelector((state) => state.hallReducer);
  const [stat, setStat] = useState<statInfo>(initialStatState);

  useEffect(() => {
    if (currentHall) {
      setStat(getHallsStat([currentHall]));
    } else {
      setStat(getHallsStat(halls));
    }
  }, [halls, currentHall]);

  return (
    <StatisticContainer>
      <SideHeader>Информация</SideHeader>
      <div>
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
    </StatisticContainer>
  );
};

export default Statistic;
