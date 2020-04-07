import React from 'react';

export const colorOptions = [
  { key: 'red',    text: <div className="red-select">&nbsp;</div>,    value: 'red' },
  { key: 'purple', text: <div className="purple-select">&nbsp;</div>, value: 'purple' },
  { key: 'blue',   text: <div className="blue-select">&nbsp;</div>,   value: 'blue' },
  { key: 'green',  text: <div className="green-select">&nbsp;</div>,  value: 'green' },
  { key: 'grey',   text: <div className="grey-select">&nbsp;</div>,   value: 'grey' },
];

export const defaultColorOption = colorOptions[colorOptions.length - 1].value;
