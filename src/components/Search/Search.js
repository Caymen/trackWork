import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card/Card";
import "./Search.css";
import ErrorModal from "../UI/ErrorModal/ErrorModal";
import useHttp from "../../hooks/http";

const Search = React.memo((props) => {
  const { onLoadPositions } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="company"&equalTo="${enteredFilter}"`;
        sendRequest(
          "https://work-track-abb2e-default-rtdb.firebaseio.com/positions.json" +
            query,
          "GET"
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedPositions = [];
      for (let key in data) {
        loadedPositions.push({
          id: key,
          company: data[key].company,
          recruiter: data[key].recruiter,
          recruiterCompany: data[key].recruiterCompany,
          position: data[key].position,
          applied: data[key].applied,
          date: data[key].date,
          test: data[key].test,
          comment: data[key].comment,
        });
      }
      onLoadPositions(loadedPositions);
    }
  }, [data, isLoading, error, onLoadPositions]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Company</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => {
              setEnteredFilter(event.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
