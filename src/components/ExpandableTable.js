import React, { useState } from 'react';
import {
  Collapse,
  Button,
  Table,
  Badge,
  UncontrolledTooltip,
} from 'reactstrap';

const ExpandableTable = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('Closed');

  const onEntering = () => setStatus('Opening...');

  const onEntered = () => setStatus('Opened');

  const onExiting = () => setStatus('Closing...');

  const onExited = () => setStatus('Closed');

  const toggle = () => setCollapse(!collapse);

  return (
    <div>
      <Button color='primary' onClick={toggle} style={{ marginBottom: '1rem' }}>
        Table View
      </Button>
      <Collapse
        isOpen={collapse}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      >
        <Table responsive hover>
          <thead className='text-primary'>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Email</th>
              {/* No phone number functionality at the moment - Tim
              <th>Phone</th> */}
              <th className='text-right'>Time Remaining</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody key='tbody'>
            {props.items.length === 0 ? (
              <h6>No participants enqueued!</h6>
            ) : (
              props.items.map((item, i) => {
                return [
                  <tr key={'row' + i}>
                    <td key={'postion' + i}>{i + 1}</td>
                    <td key={'username' + i}>{item.user}</td>
                    <td key={'email' + i}>noahb@hotmail.com</td>
                    {/* No phone number functionality at the moment - Tim*/}
                    {/* <td>(555) 555-5555</td> */}
                    <td className='text-right' key={'time estimate' + i}>
                      {(i + 1) * 5} mins
                    </td>
                    <td className='text-right' key={'buttons' + i}>
                      <Badge
                        style={{ marginRight: 10, cursor: 'pointer' }}
                        color='success'
                        id='serving'
                        key={'serving badge' + i}
                      >
                        <UncontrolledTooltip
                          key={'tooltip serving icon' + i}
                          placement='bottom'
                          target='serving'
                        >
                          Mark Serving Now
                        </UncontrolledTooltip>
                        <i
                          key={'servingicon' + i}
                          className='nc-icon nc-check-2'
                        />
                      </Badge>
                      <Badge
                        key={'completebadge' + i}
                        color='danger'
                        id='complete'
                        onClick={() => props.onDelete(props.items, item.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <UncontrolledTooltip
                          key={'completetooltip' + i}
                          placement='bottom'
                          target='complete'
                        >
                          Mark Participant as Complete
                        </UncontrolledTooltip>
                        <i
                          key={'removeicon' + i}
                          className='nc-icon nc-simple-remove'
                        />
                      </Badge>
                    </td>
                  </tr>,
                ];
              })
            )}
          </tbody>
          {/* <tr>
            <td>1</td>
            <td>John Lennon</td>
            <td>noahb@hotmail.com</td>
            <td>(555) 555-5555</td>
            <td className='text-right'>10 mins</td>
            <td className='text-right'>
              <Badge
                style={{ marginRight: 10 }}
                color='success'
                href='#'
                id='serving'
              >
                <UncontrolledTooltip placement='bottom' target='serving'>
                  Mark Serving Now
                </UncontrolledTooltip>
                <i className='nc-icon nc-check-2' />
              </Badge>
              <Badge color='danger' href='#' id='complete'>
                <UncontrolledTooltip placement='bottom' target='complete'>
                  Mark Participant as Complete
                </UncontrolledTooltip>
                <i className='nc-icon nc-simple-remove' />
              </Badge>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Paul McCartney</td>
            <td>noahb@hotmail.com</td>
            <td>(555) 555-5555</td>
            <td className='text-right'>20 mins</td>
            <td className='text-right'>
              <Badge
                style={{ marginRight: 10 }}
                color='success'
                href='#'
                id='serving'
              >
                <UncontrolledTooltip placement='bottom' target='serving'>
                  Mark Serving Now
                </UncontrolledTooltip>
                <i className='nc-icon nc-check-2' />
              </Badge>
              <Badge color='danger' href='#' id='complete'>
                <UncontrolledTooltip placement='bottom' target='complete'>
                  Mark Participant as Complete
                </UncontrolledTooltip>
                <i className='nc-icon nc-simple-remove' />
              </Badge>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>George Harrison</td>
            <td>noahb@hotmail.com</td>
            <td>(555) 555-5555</td>
            <td className='text-right'>30 mins</td>
            <td className='text-right'>
              <Badge
                style={{ marginRight: 10 }}
                color='success'
                href='#'
                id='serving'
              >
                <UncontrolledTooltip placement='bottom' target='serving'>
                  Mark Serving Now
                </UncontrolledTooltip>
                <i className='nc-icon nc-check-2' />
              </Badge>
              <Badge color='danger' href='#' id='complete'>
                <UncontrolledTooltip placement='bottom' target='complete'>
                  Mark Participant as Complete
                </UncontrolledTooltip>
                <i className='nc-icon nc-simple-remove' />
              </Badge>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Ringo Starr</td>
            <td>noahb@hotmail.com</td>
            <td>(555) 555-5555</td>
            <td className='text-right'>40 mins</td>
            <td className='text-right'>
              <Badge
                style={{ marginRight: 10 }}
                color='success'
                href='#'
                id='serving'
              >
                <UncontrolledTooltip placement='bottom' target='serving'>
                  Mark Serving Now
                </UncontrolledTooltip>
                <i className='nc-icon nc-check-2' />
              </Badge>
              <Badge color='danger' href='#' id='complete'>
                <UncontrolledTooltip placement='bottom' target='complete'>
                  Mark Participant as Complete
                </UncontrolledTooltip>
                <i className='nc-icon nc-simple-remove' />
              </Badge>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Thom Yorke</td>
            <td>noahb@hotmail.com</td>
            <td>(555) 555-5555</td>
            <td className='text-right'>50 mins</td>
            <td className='text-right'>
              <Badge
                style={{ marginRight: 10 }}
                color='success'
                href='#'
                id='serving'
              >
                <UncontrolledTooltip placement='bottom' target='serving'>
                  Mark Serving Now
                </UncontrolledTooltip>
                <i className='nc-icon nc-check-2' />
              </Badge>
              <Badge color='danger' href='#' id='complete'>
                <UncontrolledTooltip placement='bottom' target='complete'>
                  Mark Participant as Complete
                </UncontrolledTooltip>
                <i className='nc-icon nc-simple-remove' />
              </Badge>
            </td>
          </tr> */}
        </Table>
      </Collapse>
    </div>
  );
};

export default ExpandableTable;
