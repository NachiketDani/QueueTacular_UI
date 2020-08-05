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

const CreatedQueueParticipantHover = (props) => {
  return (
    <>
      <Progress multi>
        {[
          {
            placement: 'bottom',
            text: 'John',
          },
          {
            placement: 'bottom',
            text: 'Ringo',
          },
          {
            placement: 'bottom',
            text: 'Paul',
          },
          {
            placement: 'bottom',
            text: 'George',
          },
          {
            placement: 'bottom',
            text: 'Thom',
          },
          {
            placement: 'bottom',
            text: 'John',
          },
          {
            placement: 'bottom',
            text: 'Ringo',
          },
          {
            placement: 'bottom',
            text: 'Paul',
          },
          {
            placement: 'bottom',
            text: 'George',
          },
          {
            placement: 'bottom',
            text: 'Thom',
          },
          {
            placement: 'bottom',
            text: 'John',
          },
          {
            placement: 'bottom',
            text: 'Ringo',
          },
          {
            placement: 'bottom',
            text: 'Paul',
          },
          {
            placement: 'bottom',
            text: 'George',
          },
          {
            placement: 'bottom',
            text: 'Thom',
          },
          {
            placement: 'bottom',
            text: 'John',
          },
          {
            placement: 'bottom',
            text: 'Ringo',
          },
          {
            placement: 'bottom',
            text: 'Paul',
          },
          {
            placement: 'bottom',
            text: 'George',
          },
          {
            placement: 'bottom',
            text: 'Thom',
          },
        ].map((tooltip, i) => {
          return <TooltipItem key={i} item={tooltip} id={i} />;
        })}
      </Progress>
    </>
  );
};

export default CreatedQueueParticipantHover;
