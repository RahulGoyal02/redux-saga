import {
  API_DATA_FETCH,
  API_DATA_FETCH_ERROR,
  API_DATA_FETCH_REQUEST,
} from "./actionType";

const init = {
  data: [],
  loading: false,
  error: false,
};

export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case API_DATA_FETCH:
      return {
          ...state,
        data: payload,
        loading: false,
        error: false,
      };

    case API_DATA_FETCH_REQUEST:
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
      };

    case API_DATA_FETCH_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
