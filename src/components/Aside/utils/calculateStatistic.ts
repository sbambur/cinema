import { ISession } from "types/session";
import { ISeat } from "types/scheme";
//
// export const getHallsStat = (hallsArray: ISession[]) => {
//   const result = hallsArray.reduce(
//     ({ total, free, sum }, hall) => {
//       hall.seats.forEach((seat: ISeat) => {
//         if (seat.reserved) {
//           sum += +seat.price;
//         }
//       });

//       return {
//         total: (total += hall.seats.length),
//         free: (free += hall.seats.filter(
//           (seat: ISeat) => !seat.reserved
//         ).length),
//         sum,
//       };
//     },
//     { total: 0, free: 0, sum: 0 }
//   );

//   let reserved = result.total - result.free;

//   return { ...result, reserved };
// };
