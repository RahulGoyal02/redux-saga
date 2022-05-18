import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { compose, withProps, withHandlers, withState,lifecycle } from "recompose";
import ReactPaginate from 'react-paginate';

const Card = ({
  data,
  loading,
  error,
  postHandler,
  postRequest,
  postError,
  selectedPost,
  selected,
  postCreate,
  selectedHandler,
  selectedDelete,
  deleteHandler,
  postCreateHandler,
  NextPage,
  limit,
  page,
  meta
 
}) => {

//  console.log("store",data,meta)

  return (
    <>
      <button
        onClick={() => postRequest(postHandler())}
        className="btn btn-primary"
        disabled={data.length > 0}
      >
        {loading ? "Loading" : "Fetch Posts"}
      </button>

      <button
        onClick={() => postCreateHandler()}
        className="btn btn-primary"
        
      >
        {loading ? "Loading" : "Create Posts"}
      </button>
    {/* <button className="btn btn-primary" onClick={NextPage} disabled={page === data.length/10}>Next</button> */}

     <div className="d-flex flex-wrap">
      {error && <h1>Something went wrong !!</h1>}
      {data?.length > 0 &&
        data?.map((post) => (
          <div key={post.id} >
            <div className="card p-2 bd-highlight me-3 " style={{ width: "18em" }}>
              <img
                src="https://media.istockphoto.com/photos/cute-and-happy-teen-girl-with-braces-smiling-to-camera-picture-id1299140003?b=1&k=20&m=1299140003&s=170667a&w=0&h=qhKBQCGXE91Q-QymFsrV_xx0it_4cBs8X3Eu8PH1XBo="
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <b> ID: {post.id}</b>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
                <button onClick={() =>selectedHandler(post.id)} className="btn btn-primary">Go Somewhere</button>
                <button onClick={() => deleteHandler(post.id)} className="btn btn-danger">DELETE</button>
                
              </div>
            </div>
             
            </div>
        ))}
       </div> 
    </>
  );
};

const enhance = compose(
  connect(
    (store) => ({
      ...store,
    }),
    (dispatch) => ({
      postError: () => dispatch({ type: "POST_ERROR" }),
      postRequest: () => dispatch({ type: "POST_REQ" }),
      postHandler: (data) => dispatch({ type: "FETCH_API", payload: data }),
      postCreate: (data) => dispatch({ type: "CREATE_POST", payload: data}),
      selectedPost: (id) => dispatch({ type: "FETCH_BY_ID", payload: id}), 
      selectedDelete: (id) => dispatch({ type: "DELETE_POST_BY_ID", payload: id}),
      metaData : (metadata) => dispatch({ type: "META_DATA_ADD", payload: metadata}) 
    })
  ),
  
  withState("selected", "setSelected", ""),
  // withState("page", "setPage",({meta}) => meta.page),
  // withState("start", "setStart",({meta}) => meta.start),
  // withState("limit", "setLimit", ({meta}) => meta.limit),
 

  withProps(() => {
    const navigate = useNavigate();
   
return{
    navigate,
    
}
  }),
  withHandlers({
    // selectedPost: 
    // ({
    //   selected,
    //   setSelected,
    //   navigate
    // }) => (id) => {
    //   setSelected(id)
    //   navigate(`/post/${id}`)
    // },
    
    // NextPage : ({data,page,limit, start,setStart,setLimit,setPage,meta,metaData}) => () => {
    //   console.log("data",data)
    //   // console.log("metadata", meta)
    //   // console.log("initialPage", page)
    //   setPage(page + 1)
    //   setLimit(limit + 10)
    //   setStart(limit)
    //   meta.page = page
    //   meta.limit = limit
    //   meta.start = start
    //   meta.metadata = data.slice(start,limit)
    //   console.log("metaAfterSet", meta)
    //   metaData(meta)

    // },


    selectedHandler: ({navigate,setSelected,selectedPost}) => (id) =>{
      // selectedPost(id);
      navigate(`/post/${id}`)
    },

    deleteHandler: ({selectedDelete}) => (id) => {
      if(window.confirm('Are you sure you want to delete this post?')){
        selectedDelete(id)
      }
    },
    postCreateHandler: ({postCreate}) => () =>{
      alert(`Post Created Sucessfully`)
      postCreate()
    },
    

  }),
  lifecycle({
    componentDidMount() {
    //  this.props.postRequest(this.props.postHandler())
      // console.log(this.props.data);
      // const selectedPost = this.props.data?.find(
      //   (post) => post.id === Number(this.props.id)
      // );
      // console.log(selectedPost);
      // if (
      //   selectedPost?.id != JSON.parse(localStorage.getItem("post"))?.id &&
      //   this.props.data.length > 0
      // ) {
      //   this.props.setLS(selectedPost);
      //   localStorage.setItem("post", JSON.stringify(selectedPost) || {});
      // }
      // this.props.postHandler();

      // console.log("selectedPost", selectedPost);

    },
  })
);
export default enhance(Card);
