import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

function CardProperties({ selectedElement }) {
  const StyledCard = styled(Card)(({ theme }) => ({
    // improvise fais moi une belle card
    backgroundColor: "#f00",
    color: "#fff",
    width: "30%",
    height: "30%",
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    opacity: 0.5,
    padding: theme.spacing(3),
  }));

  return (
    <>
      {selectedElement && (
        <StyledCard>
          <CardContent>
            <Typography variant="body2">
              Name: {selectedElement.Name}
            </Typography>
            <Typography variant="body2">
              Long Name: {selectedElement.LongName}
            </Typography>
            <Typography variant="body2">
              Type: {selectedElement.Type}
            </Typography>
            <Typography variant="body2">
              GUID: {selectedElement.GUID}
            </Typography>
          </CardContent>
        </StyledCard>
      )}
    </>
  );
}

CardProperties.propTypes = {
  selectedElement: PropTypes.object,
};

export default CardProperties;
