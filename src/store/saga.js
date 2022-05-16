import {takeEvery,put,call} from "redux-saga/effects"


// const fetching = () =>{
//  let data = fetch('https://fakestoreapi.com/products')
//  .then(res=>res.json())
//  console.log("data",data)
//  return data
// }

const fetching = async() =>{
 let data = await fetch('https://jsonplaceholder.typicode.com/posts')
 let res = await data.json()
 return res
}
 
function* fetchApi(){
    try{
        const data = yield call(fetching)
        // console.log("hi from saga")
        // console.log("data",data)
       yield put({type: "API_DATA_FETCH", payload: data  })
    }catch(e){
        yield put({type: "API_DATA_FETCH_ERROR"})
    }
 
}

function* postRequest(){
    // console.log("hi from req saga")
    yield put({type: "API_DATA_FETCH_REQUEST",})
}

function* postError(){
    console.log("hi from error saga")
    yield put({type: "API_DATA_FETCH_ERROR", })
}


export function* helloSaga() {
  yield takeEvery("FETCH_API", fetchApi)
  yield takeEvery("POST_REQ", postRequest)
  yield takeEvery("POST_ERROR", postError)
}