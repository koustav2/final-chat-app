/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, Button as MuiButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  CloudUpload as MuiCloudUpload,
  Delete as MuiDelete,
} from "@mui/icons-material";
import { spacing } from "@mui/system";
import React, { createRef, useState } from "react";
import styled from "styled-components";

const Button = styled(MuiButton)(spacing);
const UploadIcon = styled(MuiCloudUpload)(spacing);
const DeleteIcon = styled(MuiDelete)(spacing);

const CenteredContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  height: 100%;
`;

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 10px 10px 0 0;
  ${({ $withBorder }) =>
    $withBorder &&
    `border: 1px solid ${grey[500]};
     box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};`}
`;

const AvatarUpload = ({
    image,
    inputFileRef,
    handleClick,
    handleOnChange
  
}) => {

  console.log(image);
  return (
    <CenteredContent>
      <BigAvatar
        $withBorder
        alt="Avatar"
        src={image || "/static/img/avatars/default-profile.svg"}
      />
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload"
      style={{
        marginTop: "10px"
      }}
      >
        <Button
          variant="contained"
          color="primary"
          component="span"
          mb={2}
          onClick={handleClick}
        >
          {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
          {image ? "Delete" : "Upload"}
        </Button>
      </label>
    </CenteredContent>
  );
};

export default AvatarUpload;