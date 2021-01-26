import React, { useState } from "react";

import Card from "../UI/Card/Card";
import "./PositionForm.css";
import LoadingIcon from "../UI/LoadingIcon/LoadingIcon";
import Button from "@material-ui/core/Button";
import Collapse from "@kunukn/react-collapse";

const PositionForm = React.memo((props) => {
  const [enteredCompany, setEnteredCompany] = useState("");
  const [enteredRecruiter, setEnteredRecruiter] = useState("");
  const [enteredRecruiterCompany, setEnteredRecruiterCompany] = useState("");
  const [enteredPosition, setEnteredPosition] = useState("");
  const [enteredApplied, setEnteredApplied] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTest, setEnteredTest] = useState("");
  const [enteredComment, setEnteredComment] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddPosition({
      company: enteredCompany,
      recruiter: enteredRecruiter,
      recruiterCompany: enteredRecruiterCompany,
      position: enteredPosition,
      applied: enteredApplied,
      date: enteredDate,
      test: enteredTest,
      comment: enteredComment,
    });
    setEnteredCompany("");
    setEnteredRecruiter("");
    setEnteredRecruiterCompany("");
    setEnteredPosition("");
    setEnteredApplied("");
    setEnteredDate("");
    setEnteredTest("");
    setEnteredComment("");
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="position-form">
      <div className='form-header collapse-css-transition'>
        <h2>Application Form</h2>
        <Button
          type="button"
          onClick={toggleForm}
          color="default"
          size='small'
        >
          {isOpen ? "-" : "+"}
        </Button>
      </div>
      <Collapse isOpen={isOpen}>
        <Card>
          <form onSubmit={submitHandler}>
            <div className="form-control">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                value={enteredCompany}
                onChange={(event) => {
                  setEnteredCompany(event.target.value);
                }}
              />
            </div>

            <div className="form-control">
              <label htmlFor="recruiter">Recruiter</label>
              <input
                type="text"
                id="recruiter"
                value={enteredRecruiter}
                onChange={(event) => {
                  setEnteredRecruiter(event.target.value);
                }}
              />
            </div>

            <div className="form-control">
              <label htmlFor="recruiterCompany">Recruiter Company</label>
              <input
                type="text"
                id="recruiterCompany"
                value={enteredRecruiterCompany}
                onChange={(event) => {
                  setEnteredRecruiterCompany(event.target.value);
                }}
              />
            </div>

            <div className="form-control">
              <label htmlFor="position">Position Type</label>
              <input
                type="text"
                id="position"
                value={enteredPosition}
                onChange={(event) => {
                  setEnteredPosition(event.target.value);
                }}
              />
            </div>

            <div className="form-control">
              <label htmlFor="applied">Applied ?</label>
              <input
                type="text"
                id="applied"
                value={enteredApplied}
                onChange={(event) => {
                  setEnteredApplied(event.target.value);
                }}
              />
            </div>

            <div className="form-control">
              <label htmlFor="applicationDate">Application Date</label>
              <input
                type="text"
                id="applicationDate"
                value={enteredDate}
                onChange={(event) => {
                  setEnteredDate(event.target.value);
                }}
              />
            </div>

            <div className="form-control">
              <label htmlFor="test">Test</label>
              <input
                type="text"
                id="test"
                value={enteredTest}
                onChange={(event) => {
                  setEnteredTest(event.target.value);
                }}
              />
            </div>

            <div className="form-control">
              <label htmlFor="comment">Comment</label>
              <input
                type="comment"
                id="test"
                value={enteredComment}
                onChange={(event) => {
                  setEnteredComment(event.target.value);
                }}
              />
            </div>

            <div className="position-form__actions">
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              {props.loading && <LoadingIcon />}
              {/* using && in the ternary is equivalent to: props.loading ? <LoadingIndicator/> : null */}
            </div>
          </form>
        </Card>
      </Collapse>
    </section>
  );
});

export default PositionForm;
