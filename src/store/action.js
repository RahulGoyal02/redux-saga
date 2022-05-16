import {
  API_DATA_FETCH,
  API_DATA_FETCH_ERROR,
  API_DATA_FETCH_REQUEST,
} from "./actionType";

export const fetchData = (payload) => {
    console.log("fetchdata", payload)
  return {
    type: API_DATA_FETCH,
    payload,
  };
};


export const fetchDataReq = (payload) => {
  console.log("fetchreq", payload);
  return {
    type: API_DATA_FETCH_REQUEST,
  };
};

export const fetchDataError = () => {
    console.log("fetchError");
    return {
      type: API_DATA_FETCH_ERROR,
    };
  };
  