import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

function CardProperties({ selectedElement, onClose }) {
  const StyledCard = styled(Card)(() => ({
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

  const CloseButton = styled(Button)(() => ({
    position: "absolute",
    top: -10,
    right: -20,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: "20px",
  }));

  return (
    <>
      {selectedElement && (
        <StyledCard>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                style={{
                  marginBottom: "40px",
                  color: "#FFF",
                  fontWeight: "bold",
                }}
              >
                ℹ️ INFO
              </Typography>
              <CloseButton onClick={onClose}>X</CloseButton>
            </Box>
            {selectedElement.Name && (
              <Typography style={{ marginBottom: "10px", fontSize: "14" }}>
                Name: {selectedElement.Name}
              </Typography>
            )}
            {selectedElement.LongName && (
              <Typography style={{ marginBottom: "10px", fontSize: "14" }}>
                Long Name: {selectedElement.LongName}
              </Typography>
            )}
            {selectedElement.Type && (
              <Typography style={{ marginBottom: "10px", fontSize: "14" }}>
                {" "}
                Type: {selectedElement.Type}
              </Typography>
            )}
            {selectedElement.GUID && (
              <Typography style={{ marginBottom: "10px", fontSize: "14" }}>
                {" "}
                GUID: {selectedElement.GUID}
              </Typography>
            )}
          </CardContent>
        </StyledCard>
      )}
    </>
  );
}

CardProperties.propTypes = {
  selectedElement: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default CardProperties;
