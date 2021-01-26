import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import "./PositionsList.css";

const PositionsList = (props) => {
  console.log("rendering positionList");

  let listContent = null;

  if (props.positions.length === 0) {
    listContent = (
      <div className='list-message'>
        <p>There's no applications</p>
      </div>
    );
  }

  return (
    <section className="position-list">
      <h2>On going applications</h2>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Company</TableCell>
              <TableCell align="right">Recruiter</TableCell>
              <TableCell align="right">Recruiter Company</TableCell>
              <TableCell align="right">Position Type</TableCell>
              <TableCell align="right">Applied</TableCell>
              <TableCell align="right">Application date</TableCell>
              <TableCell align="right">Test</TableCell>
              <TableCell align="right">Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.positions.map((position) => (
              <TableRow key={position.id}>
                <TableCell component="th" scope="row">
                  <Button
                    size="small"
                    type="button"
                    onClick={props.onRemoveItem.bind(this, position.id)}
                    variant="contained"
                    color="secondary"
                  >
                    X
                  </Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  {position.company}
                </TableCell>
                <TableCell align="right">{position.recruiter}</TableCell>
                <TableCell align="right">{position.recruiterCompany}</TableCell>
                <TableCell align="right">{position.position}</TableCell>
                <TableCell align="right">{position.applied}</TableCell>
                <TableCell align="right">{position.date}</TableCell>
                <TableCell align="right">{position.test}</TableCell>
                <TableCell align="right">{position.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {listContent}

      {/* <ul>
        {props.positions.map((pos) => (
          <li
            key={position.id}
            onClick={props.onRemoveItem.bind(this, position.id)}
          >
            <span className='info'>{position.company}</span>
            <span className='info'>{position.recruiter}</span>
            <span className='info'>{position.recruiterCompany}</span>
            <span className='info'>{position.position}</span>
            <span className='info'>{position.applied}</span>
            <span className='info'>{position.date}</span>
            <span className='info'>{position.test}</span>
            <span className='info'>{position.comment}</span>
          </li>
        ))}
      </ul> */}
    </section>
  );
};

export default PositionsList;
