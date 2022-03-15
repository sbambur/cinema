import React, { useState }  from "react";
import Hall from "./Hall";
import Statistic from "./Statistic";
import seatArray from "../sample-hall";

const App = () => {
  const [seats, setSeat] = useState(seatArray);

  const reserveSeat = key => { 
   setSeat(seats.map(seat=>{
     if(seat.id === key){
       return {...seat,  reserved: !seat.reserved}
     }
     return seat;
   }))
  }

  return (
    <div className="container">
      <Hall 
        seats={seats}
        title="Викинги 3" 
        date="20.03.2022"
        reserveSeat={reserveSeat}
      />
      <Statistic seats={seats} />
    </div>
  );
};

export default App;