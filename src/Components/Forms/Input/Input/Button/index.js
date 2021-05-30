/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';

const Button = props => {
  const className = props.className ? props.className : 'pushlike';
  return <button className={className} type="button" {...props} />;
};

export { Button };
