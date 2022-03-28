import { useContext } from "react";
import { AuthContext } from "../../../store/AuthContext";

const Seat = ({ reserved, seatNumber, price, reserve, id, openModal }) => {
  const [auth] = useContext(AuthContext);

  return (
    <div
      className={`seat ${reserved ? "active" : ""}`}
      onClick={reserve(id)}
    >
      {seatNumber}
      <p>{price}₽</p>
      {auth ? (
        <button className="edit_seat_button" onClick={openModal(id)}>
          Edit
        </button>
      ) : null}
    </div>
  );
};

export default Seat;
