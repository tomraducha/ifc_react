import PropTypes from "prop-types";
import { CardContent } from "@mui/material";
import {
  StyledCard,
  CloseButton,
  InfoTypography,
  DataTypography,
} from "./style";

function CardProperties({ selectedElement, onClose }) {
  return (
    <>
      {selectedElement && (
        <StyledCard>
          <CardContent>
            <div>
              <InfoTypography>ℹ️ INFO</InfoTypography>
              <CloseButton onClick={onClose}>X</CloseButton>
            </div>
            {selectedElement.Name && (
              <DataTypography>Name: {selectedElement.Name}</DataTypography>
            )}
            {selectedElement.LongName && (
              <DataTypography>
                Long Name: {selectedElement.LongName}
              </DataTypography>
            )}
            {selectedElement.Type && (
              <DataTypography>Type: {selectedElement.Type}</DataTypography>
            )}
            {selectedElement.GUID && (
              <DataTypography>GUID: {selectedElement.GUID}</DataTypography>
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
