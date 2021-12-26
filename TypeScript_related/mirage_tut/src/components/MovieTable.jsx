import React, { useEffect, useState } from "react";
import axios from "axios";
const getMovies = async () => {
  try {
    const res = await axios.get("/api/movies");
    // console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const deleteMovie = async (id) => {
  try {
    const res = await axios.delete(`/api/movies/${id}`);
    console.log("----------res:delete", res);
  } catch (e) {}
};

const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  useEffect(async () => {
    const data = await getMovies();

    if (data.movies) setMovies(data.movies);

    return () => {};
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/movies", { name, year });
      setMovies(res.data.movies);
    } catch (e) {
      console.log(e);
    }
  };


  const fetchActors =async (id) => {
    
  }

  return (
    <>
      <div className="my-4">
        <form onSubmit={submitForm}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="year"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <button className="btn btn-success">Create</button>
            </div>
          </div>
        </form>
      </div>
      {movies?.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>year</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(({ id, name, year }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{year}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteMovie(id);
                    }}
                  >
                    delete
                  </button>
                  <button type='button' className="btn btn-primary" data-bs-toggle='modal' data-bs-target="#exampleModal" onClick={() => {
                    fetchActors(id)
                  }}>
                      Actors
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <Modal />
    </>
  );
};

const Modal = () => {
  return (
    <div className="modal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Title</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieTable;
