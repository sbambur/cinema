 
import { v4 as uuidv4 } from 'uuid';

 
const seatsNumbers = 30;

const generateSeats = () => {
  let content = [];
    for (let i = 1; i <= seatsNumbers; i++) {
      content.push(
        {
          id: `${ uuidv4()}`,
          seatNumber: i,
          price: 100,
          reserved: false,
        }
      );
    }
    return content;
}

const seatArray = generateSeats();

export default seatArray;