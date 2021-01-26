import React from "react";

import "./ErrorModal.css";
import Button from "@material-ui/core/Button";

const ErrorModal = React.memo((props) => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <Button
            type="button"
            onClick={props.onClose}
            variant="contained"
            color="secondary"
          >
            Dismiss
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
