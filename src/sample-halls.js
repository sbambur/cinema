 import { v4 as uuidv4 } from 'uuid';


const hallsName = ['Зеленый','Красный','Синий']
const movies = ['Бесстрашный','Викинги','Пираты']
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

const generateHall = () => {
  let content = [];
    for (let i = 0; i < 3; i++) {
      content.push(
        {
          id: `${ uuidv4()}`,
          title: hallsName[i],
          reserved: false,
          active: true,
          movie: movies[i],
          seats: generateSeats(),
        }
      );
    }
    return content;
}

const hallsArray = generateHall()

export default hallsArray;