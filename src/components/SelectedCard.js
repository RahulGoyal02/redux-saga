import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  compose,
  withHandlers,
  withState,
  withProps,
  lifecycle,
} from "recompose";
import { useEffect } from "react";



const SelectedCard = ({ selected, GoBack, postHandler, GetLocalStorage,selectedPost }) => {
  // const { id } = useParams();
  // useEffect(() => {
  //   console.log("goyaL")
  // selectedPost(id)
  // }, []);

  
  return (
    <>
      <button className="btn btn-primary" onClick={GoBack}>
        Go Back
      </button>
      <div className="card p-2 bd-highlight" style={{ width: "18em" }}>
        <img
          src="https://media.istockphoto.com/photos/cute-and-happy-teen-girl-with-braces-smiling-to-camera-picture-id1299140003?b=1&k=20&m=1299140003&s=170667a&w=0&h=qhKBQCGXE91Q-QymFsrV_xx0it_4cBs8X3Eu8PH1XBo="
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{selected?.title}</h5>
          <p className="card-text">{selected?.body}</p>
        </div>
      </div>
    </>
  );
};
const enhance = compose(
  connect(
    (store) => ({
      selected: store.selected,
      
    }),
    (dispatch) => ({
      postError: () => dispatch({ type: "POST_ERROR" }),
      postRequest: () => dispatch({ type: "POST_REQ" }),
      postHandler: (data) => dispatch({ type: "FETCH_API", payload: data }),
      selectedPost: (id) => dispatch({ type: "FETCH_BY_ID", payload: id})
    })
  ),
  withProps(() => {
    const navigate = useNavigate();
    const { id } = useParams();
    // const setLS = (data) => localStorage.setItem("post", JSON.stringify(data));
    // const GetLocalStorage = () => {
    //   let post = localStorage.getItem("post");
    //   return JSON.parse(post);
    // };
    return {
      navigate,
      id
      // id,
      // GetLocalStorage,
      // setLS,
    };
  }),
  withHandlers({
    GoBack:
      ({ navigate,postHandler }) =>
      () => {
        navigate(`/`);
        // postHandler()
      },
  }),
  lifecycle({
    componentDidMount() {
      console.log("goyal")
      this.props.selectedPost(this.props.id)
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

export default enhance(SelectedCard);
