/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Tooltip, Progress, Button } from 'reactstrap';

const TooltipItem = (props) => {
  const { item, id } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span>
      <Tooltip
        placement={item.placement}
        isOpen={tooltipOpen}
        target={'Tooltip-' + id}
        toggle={toggle}
      >
        {item.text}
      </Tooltip>
      <Button color='warning' className='mr-1' id={'Tooltip-' + id} />
    </span>
  );
};

const mapToArray = (props) => {
  if (props.createdUsers == null) {
    return [];
  } else {
    return (
      props.createdUsers
        // .filter((item) => {
        //   return item.status === 'Waiting' || item.status === 'Serving';
        // })
        .map((user) => [
          {
            placement: 'bottom',
            text: user.username,
          },
        ])
    );
  }
};

const CreatedQueueParticipantHover = (props) => {
  const participants = mapToArray(props);
  return (
    <>
      <Progress multi>
        {participants.map((tooltip, i) => {
          tooltip = tooltip[0];
          return <TooltipItem key={i} item={tooltip} id={i} />;
        })}
      </Progress>
    </>
  );
};

export default CreatedQueueParticipantHover;
