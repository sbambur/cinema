import * as HallActionCreator from "./createHall"
import * as UpdateHallActionCreator from "./updateHall"

export default {
  ...HallActionCreator,
  ...UpdateHallActionCreator
}