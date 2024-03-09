/* eslint-disable no-unused-vars */
import { styled } from "@mui/material"
import { Link as LinkComponent } from "react-router-dom"

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: inherit;
  padding: 1rem;
  &:hover {
    background-color: #f0f0f0;
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