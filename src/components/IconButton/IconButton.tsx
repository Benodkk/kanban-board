import React from "react";

import { StyledIconButton, StyledIconImage } from "./IconButton.styled";

interface IconButtonProps {
  src: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const IconButton = ({ src, onClick }: IconButtonProps) => {
  return (
    <StyledIconButton onClick={(e) => onClick(e)}>
      <StyledIconImage src={src} />
    </StyledIconButton>
  );
};

export default IconButton;
