/* eslint-disable no-unused-vars */
import { styled } from "@mui/material"
import { Link as LinkComponent } from "react-router-dom"

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: inherit;
  padding: 1rem;
  &:hover {
    background-color: rgba(0,0,0,0.1);
    text-decoration: underline;
  }
  &:visited {
    color: inherit;
  }
  &:active {
    color: inherit;
  }
  &:focus {
    color: inherit;
  }
  
`