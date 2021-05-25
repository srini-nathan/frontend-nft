import React from "react";
import { MyProfile } from "../../MyProfile";
import Navigation from "../Navigation";
import { StyledTitle } from "./styled";

interface TitleProps {
  user: string;
}

export const Title = ({ user }: TitleProps) => {
  return (
    <>
      <StyledTitle>
        Hi, <strong>{user}</strong> 👋
      </StyledTitle>
    </>
  );
};
