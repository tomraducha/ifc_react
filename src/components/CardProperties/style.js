import styled from "styled-components";
import { Card, Button, Typography } from "@mui/material";

export const StyledCard = styled(Card)`
  background-color: #2a698d;
  font-weight: bold;
  font-size: 20px;
  color: #ff8000;
  width: 400px;
  top: 0;
  right: 1115px;
  z-index: 1;
  opacity: 0.9;
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: -10px;
  right: -20px;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
`;

export const InfoTypography = styled(Typography)`
  margin-bottom: 40px;
  color: #fff;
  font-weight: bold;
  font-family: "Open Sans", sans-serif;
`;

export const DataTypography = styled(Typography)`
  margin-bottom: 10px;
  color: #ffba00;
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
`;
