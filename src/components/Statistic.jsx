import React from "react";

const Statistic = () => {
  return (
    <div className="infoSide">
      <div className="infoSide__header">Статистика</div>
      <div className="infoSide__info">
        <p>
          Всего мест: <span>30</span>
        </p>
        <p>
          Свободно: <span>27</span>
        </p>
        <p>
          Куплено: <span>3</span>
        </p>
        <p>
          Выручка: <span>300</span>₽
        </p>
      </div>
    </div>
  );
};

export default Statistic;
