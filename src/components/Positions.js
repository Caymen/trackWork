import React, { useReducer, useEffect, useCallback, useMemo } from "react";

import PositionForm from "./PositionForm/PositionForm";
import PositionsList from "./PositionsList/PositionsList";
import Search from "./Search/Search";
import ErrorModal from "../components/UI/ErrorModal/ErrorModal";
import useHttp from "../hooks/http";

const positionReducer = (currentPositions, action) => {
  switch (action.type) {
    case "SET":
      return action.positions;
    case "ADD":
      return [...currentPositions, action.position];
    case "DELETE":
      return currentPositions.filter((position) => position.id !== action.id);
    default:
      throw new Error("Shouldn't get here!");
  }
};

const Positions = () => {
  const [userPositions, dispatch] = useReducer(positionReducer, []);
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear,
  } = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_POSITION") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === "ADD_POSITION") {
      // console.log(data);
      dispatch({ type: "ADD", position: { id: data.company, ...reqExtra } });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredPositionsHandler = useCallback((filteredPositions) => {
    dispatch({ type: "SET", positions: filteredPositions });
  }, []);

  const addPositionHandler = useCallback(
    (position) => {
      sendRequest(
        "https://work-track-abb2e-default-rtdb.firebaseio.com/positions.json",
        "POST",
        JSON.stringify(position),
        position,
        "ADD_POSITION"
      );
    },
    [sendRequest]
  );

  const removePositionHandler = useCallback(
    (positionId) => {
      console.log(positionId)
      sendRequest(
        `https://work-track-abb2e-default-rtdb.firebaseio.com/positions/${positionId}.json`,
        "DELETE",
        null,
        positionId,
        "REMOVE_POSITION"
      );
    },
    [sendRequest]
  );

  const positionsList = useMemo(() => {
    return (
      <PositionsList
        positions={userPositions}
        onRemoveItem={removePositionHandler}
      />
    );
  }, [userPositions, removePositionHandler]);

  return (
    <div className="App" style={{marginBottom: "30px"}}>
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <PositionForm onAddPosition={addPositionHandler} loading={isLoading} />

      <section>
        <Search onLoadPositions={filteredPositionsHandler} />
        {positionsList}
      </section>
    </div>
  );
};

export default Positions;
