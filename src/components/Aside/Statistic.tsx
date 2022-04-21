import { FC } from "react";
import { useEffect, useState } from "react";

import { ISession } from "types/session";
// import { getHallsStat } from "components/Aside/utils/calculateStatistic";
import { useTypedSelector } from "hooks/useTypedSelector";

import { SideHeader, StatisticContainer } from "components/Aside/styles";

interface StatisticProps {
  currentSession?: ISession;
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

const Statistic: FC<StatisticProps> = ({ currentSession }) => {
  const { sessions } = useTypedSelector((state) => state.sessionReducer);
  const [stat, setStat] = useState<statInfo>(initialStatState);

  useEffect(() => {
    if (currentSession) {
      // setStat(getHallsStat([currentSession]));
    } else {
      // setStat(getHallsStat(sessions));
    }
  }, [sessions, currentSession]);

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
