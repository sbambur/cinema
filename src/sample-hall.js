 
import { v4 as uuidv4 } from 'uuid';

 
const seatsNumbers = 40;

const generateSeats = () => {
  let content = [];
    for (let i = 1; i <= seatsNumbers; i++) {
      content.push(
        {
          id: `${ uuidv4()}`,
          seatNumber: i,
          price: 120,
          reserved: false,
        }
      );
    }
    
    return content;
}

const seatArray = generateSeats();

export default seatArray;