import * as HallActionCreator from "./createHall"
import * as UpdateHallActionCreator from "./updateHall"
import * as DeleteHallActionCreator from "./deleteHall"

export default {
  ...HallActionCreator,
  ...UpdateHallActionCreator,
  ...DeleteHallActionCreator
}