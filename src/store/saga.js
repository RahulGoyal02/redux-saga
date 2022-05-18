import { takeEvery, put, call,takeLatest } from "redux-saga/effects";

// const fetching = () =>{
//  let data = fetch('https://fakestoreapi.com/products')
//  .then(res=>res.json())
//  console.log("data",data)
//  return data
// }

const fetching = async () => {
  let data = await fetch("https://jsonplaceholder.typicode.com/posts");
  let res = await data.json();
  return res;
};

function* fetchApi() {
  try {
      console.log("rahul")
    const data = yield call(fetching);
    // console.log("hi from saga")
    // console.log("data",data)
    yield put({ type: "API_DATA_FETCH", payload: data });
  } catch (e) {
    yield put({ type: "API_DATA_FETCH_ERROR" });
  }
}

function* postRequest() {
  // console.log("hi from req saga")
  yield put({ type: "API_DATA_FETCH_REQUEST" });
}

function* postError() {
  console.log("hi from error saga");
  yield put({ type: "API_DATA_FETCH_ERROR" });
}
// --------------------------CREATE POST--------------------------------------//
const creating = async () => {
  let data = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
      
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  let res = await data.json();
  return res;
};
function* createPost() {
  console.log("createPost from saga");
  const data = yield call(creating);
  yield put({ type: "ADD_CREATE_POST_DATA", payload: data });
}
// ---------------------------FETCH BY ID-------------------------------------//
const fetchSelected = async (payload) => {
    // console.log("payloadID",payload)
    let data = await fetch(`https://jsonplaceholder.typicode.com/posts/${payload.payload}`);
    let res = await data.json();
    return res;
  };





function* fetchByID(payload){
    const data = yield call(fetchSelected,payload);
    yield put ({type: "SELECTED_POST_DATA", payload: data})
}

// -------------------------------DELETE POST------------------------------------------------------//

function* deleteByID(payload){
  // const data = yield call(deleteSelected,id);
  // console.log("delete", data) //empty
  yield put({type: "DELETE_SELECTED_POST", payload: payload.payload})
}

// const deleteSelected = async (payload) => {
//   console.log(payload)
//  let data = await fetch(`https://jsonplaceholder.typicode.com/posts/${payload.payload}`, {
//     method: 'DELETE',
//   });
//   console.log("rahuldelete",data) // call check status ok
//   let res = await data.json();
//   return res;
// };
// -------------------------META DATA----------------------------------------------//
function* addMetaData(payload){
  console.log("metaData Saga", payload)
  yield put({type: 'META_DATA', payload: payload})
}

export function* helloSaga() {
  yield takeLatest("FETCH_API", fetchApi);
  yield takeEvery("POST_REQ", postRequest);
  yield takeEvery("POST_ERROR", postError);
  yield takeEvery("CREATE_POST", createPost);
  yield takeLatest("FETCH_BY_ID", (payload) => fetchByID(payload));
  yield takeEvery("DELETE_POST_BY_ID",(payload) => deleteByID(payload));
  yield takeEvery("META_DATA_ADD", (payload) => addMetaData(payload) )
}
