import React, { FC } from 'react';

export type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text:string
};

export const Button: FC<ButtonProps> = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

