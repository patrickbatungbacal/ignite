import axios from "axios";
import { gameDetailsURL, gameScreenshotURL } from "../api";
import detailReducer from "../reducers/detailReducer";

export const loadDetail = (id) => async (dispatch) => {
  const detailData = await axios.get(gameDetailsURL(id));
  const screenshotData = await axios.get(gameScreenshotURL(id));
  dispatch({
    type: "GET_DETAIL",
    payload: {
      game: detailData.data,
      screenshots: screenshotData.data.results,
    },
  });
};
