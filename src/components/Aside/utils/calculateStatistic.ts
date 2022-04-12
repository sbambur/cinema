import { IHall, ISeat } from "types/hall";

export const getHallsStat = (hallsArray: IHall[]) => {
  const result = hallsArray.reduce(
    ({ total, free, sum }, hall) => {
      hall.seats.forEach((seat: ISeat) => {
        if (seat.reserved) {
          sum += +seat.price;
        }
      });

      return {
        total: (total += hall.seats.length),
        free: (free += hall.seats.filter(
          (seat: ISeat) => !seat.reserved
        ).length),
        sum,
      };
    },
    { total: 0, free: 0, sum: 0 }
  );

  let reserved = result.total - result.free;

  return { ...result, reserved };
};
