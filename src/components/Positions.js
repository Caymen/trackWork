import React, { useReducer, useEffect, useCallback, useMemo, useState } from "react";

import './Positions.css';
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

  const [show, setShow] = useState(true);

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


  const closeMsg = () => {
    setShow(false);
  }
  let featureMsg = (
    <div className='message-block' onClick={closeMsg}>
      <h3 className='message-soon'>More featues and options soon!<span>(click to close)</span></h3>
    </div>
  );
  if(!show) {
    featureMsg = null;
  }

  return (
    <div className="App" style={{marginBottom: "30px"}}>
    {featureMsg}
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
