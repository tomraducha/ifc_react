import { styled } from "@mui/system";
import { Card, Button, Typography } from "@mui/material";

export const StyledCard = styled(Card)(() => ({
  backgroundColor: "#2A698D",
  fontWeight: "bold",
  fontSize: "20px",
  color: "#FF8000",
  width: "400px",
  top: 0,
  right: 1115,
  zIndex: 1,
  opacity: 0.9,
}));

export const CloseButton = styled(Button)(() => ({
  position: "absolute",
  top: -10,
  right: -20,
  color: "#FFF",
  fontWeight: "bold",
  fontSize: "20px",
}));

export const InfoTypography = styled(Typography)(() => ({
  marginBottom: "40px",
  color: "#FFF",
  fontWeight: "bold",
}));

export const DataTypography = styled(Typography)(() => ({
  marginBottom: "10px",
  fontSize: "14px",
}));
