/* BTIB */
import useIfc from "../../hooks/useIfc";
import * as styled from "./style";
/* Libs & plugins */
import { useEffect, useState } from "react";
import { CardContent } from "@mui/material";
import PropTypes from "prop-types";

const { StyledCard, CloseButton, InfoTypography, DataTypography } = styled;

function CardProperties({ selectedElement, onClose }) {
  const { ifcApi } = useIfc();
  const [typeName, setTypeName] = useState("");

  useEffect(() => {
    if (!selectedElement || !ifcApi) {
      return;
    }
    const typeName = ifcApi.GetNameFromTypeCode(selectedElement.Type);
    setTypeName(typeName);
  }, [ifcApi, selectedElement]);

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
              <DataTypography>Type: {typeName}</DataTypography>
            )}
            {selectedElement.GUID && (
              <DataTypography>GUID: {selectedElement.GUID}</DataTypography>
            )}
            {selectedElement.Assignment && (
              <DataTypography>
                Assignement: {selectedElement.Assignment}
              </DataTypography>
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
