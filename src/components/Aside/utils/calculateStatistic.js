export const getHallsStat = (hallsArray) => {
  let total = hallsArray.reduce((acc, hall) => {
    acc += hall.seats.length;
    return acc;
  }, 0);
  let free = hallsArray.reduce((acc, hall) => {
    acc += hall.seats.filter((seat) => !seat.reserved).length;
    return acc;
  }, 0);
  let reserved = total - free;
  let sum = hallsArray.reduce((acc, hall) => {
    hall.seats.reduce((seatAcc, seat) => {
      if (seat.reserved) {
        acc += +seat.price;
      }
    }, 0);
    return acc;
  }, 0);

  return { total, free, reserved, sum };
};

export const getCurrentHallStat = (hallObject) => {
  let total = hallObject.seats.length;
  let free = hallObject.seats.filter((seat) => !seat.reserved).length;
  let reserved = total - free;
  let sum = hallObject.seats.reduce((acc, seat) => {
    if (seat.reserved) {
      acc += seat.price;
    }
    return acc;
  }, 0);

  return { total, free, reserved, sum };
};