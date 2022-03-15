import React, { useEffect, useState } from "react";

const Statistic = ({ seats  }) => {
  const [stat, setStat] = useState({})

  const getStat = () =>{
    let total = seats.length
    let free = seats.filter(seat=>!seat.reserved).length
    let reserved = total - free
    let sum = seats.reduce((acc,seat)=>{
      if(seat.reserved){
        acc+= seat.price
      }
      return acc
    },0)

    return {total, free,reserved,sum} 
  }

  useEffect(()=>{
    let stat = getStat()
    setStat(stat)
  },[seats])
  
  return (
    <div className="infoSide">
      <div className="infoSide__header">Статистика</div>
      <div className="infoSide__info">
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