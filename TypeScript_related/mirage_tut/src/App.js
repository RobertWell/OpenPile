import React  from "react";
import MovieTable from "./components/MovieTable";

function App() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <h1 className="fw-normal test-center my-3">Movies</h1>

          <MovieTable />
        </div>
      </div>
    </div>
  );
}

export default App;
