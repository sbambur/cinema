 import { v4 as uuidv4 } from 'uuid';

export const generateSeats = (seatCount, basePrice) => {
  let content = [];
    for (let i = 1; i <= seatCount; i++) {
      content.push(
        {
          id: uuidv4(),
          seatNumber: i,
          price: basePrice,
          reserved: false,
        }
      );
    }
    return content;
}