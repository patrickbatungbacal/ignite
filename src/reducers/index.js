import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import detailReducer from "./detailReducer";

const allReducers = combineReducers({
  games: gamesReducer,
  details: detailReducer,
});

export default allReducers;
