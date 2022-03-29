export const getHallsStat = (hallsArray: any[]) => {
  let total = 0;
  let free = 0;
  let sum = 0;

  hallsArray.map(hall => {
    total += hall.seats.length;
    free += hall.seats.filter((seat: any) => !seat.reserved).length;
    hall.seats.map((seat: any) => {
      if (seat.reserved) {
        sum += +seat.price;
      }
    });
  })
  let reserved = total - free;

  return { total, free, reserved, sum };
}