import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";

const allReducers = combineReducers({
  games: gamesReducer,
});

export default allReducers;
