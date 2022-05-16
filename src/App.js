import "./App.css";
import Card from "./components/Card";
import SelectedCard from "./components/SelectedCard"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Today's Posts</h1>
                <Card />
              </>
            }
          />
          <Route
            path="/post/:id"
            element={
              <SelectedCard />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
