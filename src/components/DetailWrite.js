import React from "react";
import Write from "../components/Write";
import Modify from "../components/Modify";

const DetailWrite = (props) => {
  if (props.date.selectedAt !== undefined) {
    return (
      <React.Fragment>
        <Modify props={props} />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Write props={props} />
      </React.Fragment>
    );
  }
};

export default DetailWrite;
