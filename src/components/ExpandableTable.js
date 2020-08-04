import React, { useState } from "react";
import { Collapse, Button, Table } from "reactstrap";
import InQueueMini from "./InQueueMini.js";

const ExpandableTable = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState("Closed");

  const onEntering = () => setStatus("Opening...");

  const onEntered = () => setStatus("Opened");

  const onExiting = () => setStatus("Closing...");

  const onExited = () => setStatus("Closed");

  const toggle = () => setCollapse(!collapse);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        Table View
      </Button>
      {/* <h5>Current state: {status}</h5> */}
      <Collapse
        isOpen={collapse}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      >
        <Table responsive hover>
          <thead className="text-primary">
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-right">Time Remaining</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Lennon</td>
              <td>noahb@hotmail.com</td>
              <td>(555) 555-5555</td>
              <td className="text-right">10 mins</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Paul McCartney</td>
              <td>noahb@hotmail.com</td>
              <td>(555) 555-5555</td>
              <td className="text-right">20 mins</td>
            </tr>
            <tr>
              <td>3</td>
              <td>George Harrison</td>
              <td>noahb@hotmail.com</td>
              <td>(555) 555-5555</td>
              <td className="text-right">30 mins</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Ringo Starr</td>
              <td>noahb@hotmail.com</td>
              <td>(555) 555-5555</td>
              <td className="text-right">40 mins</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Thom Yorke</td>
              <td>noahb@hotmail.com</td>
              <td>(555) 555-5555</td>
              <td className="text-right">50 mins</td>
            </tr>
          </tbody>
        </Table>
      </Collapse>
    </div>
  );
};

export default ExpandableTable;
