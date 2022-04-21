import * as SessionActionCreator from "./session";
import * as SchemeActionCreator from "./scheme";

export default {
  ...SessionActionCreator,
  ...SchemeActionCreator,
};
