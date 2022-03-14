const seatsNumbers = 30;

const genrateSeats = () => {
  let content = [];
    for (let i = 1; i <= seatsNumbers; i++) {
      content.push(
        {
          id: `id-${i}`,
          seatNumber: i,
          price: 100,
        }
      );
    }
    return content;
}

const seats = genrateSeats();

export default seats;