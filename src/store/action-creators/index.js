import * as CreateHallActionCreator from "./createHall"
import * as DeleteHallActionCreator from "./deleteHall"
import * as ReserveSeatActionCreator from "./reserveSeat"
import * as SetMovieActionCreator from "./setMovie"
import * as EditSeatPriceActionCreator from "./editSeatPrice"

export default {
  ...CreateHallActionCreator,
  ...DeleteHallActionCreator,
  ...ReserveSeatActionCreator,
  ...SetMovieActionCreator,
  ...EditSeatPriceActionCreator
}