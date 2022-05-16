import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { compose, withProps, withHandlers, withState } from "recompose";
import ReactPaginate from 'react-paginate';

const Card = ({
  data,
  loading,
  error,
  postHandler,
  postRequest,
  postError,
  selectedPost,
  selected
}) => {
//   console.log("store", data, loading, error);

  return (
    <>
      <button
        onClick={() => postRequest(postHandler())}
        className="btn btn-primary"
        disabled={data.length > 0}
      >
        {loading ? "Loading" : "Fetch Posts"}
      </button>
     <div className="d-flex flex-wrap">
      {error && <h1>Something went wrong !!</h1>}
      {data.length > 0 &&
        data.map((post) => (
          <div key={post.id} >
            <div className="card p-2 bd-highlight me-3 " style={{ width: "18em" }}>
              <img
                src="https://media.istockphoto.com/photos/cute-and-happy-teen-girl-with-braces-smiling-to-camera-picture-id1299140003?b=1&k=20&m=1299140003&s=170667a&w=0&h=qhKBQCGXE91Q-QymFsrV_xx0it_4cBs8X3Eu8PH1XBo="
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
                <button onClick={() => selectedPost(post.id)} className="btn btn-primary">Go Somewhere</button>

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
    })
  ),
  withState("selected", "setSelected", ""),

  withProps(() => {
    const navigate = useNavigate();
return{
    navigate
}
  }),
  withHandlers({
    selectedPost: 
    ({
      selected,
      setSelected,
      navigate
    }) => (id) => {
      setSelected(id)
      navigate(`/post/${id}`)
    },
    
  })
);
export default enhance(Card);
