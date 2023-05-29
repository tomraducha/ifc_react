import PropTypes from "prop-types";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { StyledCard } from "./style";

function Menu({ name, lengthName, properties, setSelectedElement }) {
  const filteredSite = removeDuplicates(name.Site || []);
  const filteredBuildings = removeDuplicates(name.Buildings || []);
  const filteredFloors = removeDuplicates(name.Floors || []);
  const filteredRooms = removeDuplicates(name.Rooms || []);

  function formatLabel(label, length) {
    return length ? `${label} (${length})` : label;
  }

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  function handleItemClick(element, index, parentNames) {
    setSelectedElement({
      Name: element[index]?.Name?.value,
      LongName: element[index]?.Description?.value,
      Type: element[index]?.type,
      GUID: element[index]?.GlobalId?.value,
      ...parentNames,
    });
  }

  return (
    <StyledCard>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {filteredSite.map((site, i) => (
          <TreeItem
            nodeId={`site-${i}`}
            label={formatLabel(site, lengthName.Buildings)}
            key={i}
            onClick={() => handleItemClick(properties.Site, i, {})}
          >
            {filteredBuildings.map((building, j) => (
              <TreeItem
                nodeId={`building-${i}-${j}`}
                label={formatLabel(building, lengthName.Floors)}
                key={j}
                onClick={() =>
                  handleItemClick(properties.Buildings, j, {
                    Assignment: site,
                  })
                }
              >
                {filteredFloors.map((floor, k) => (
                  <TreeItem
                    nodeId={`floor-${i}-${j}-${k}`}
                    label={formatLabel(floor, lengthName.Rooms)}
                    key={k}
                    onClick={() =>
                      handleItemClick(properties.Floors, k, {
                        Assignment: building,
                      })
                    }
                  >
                    {filteredRooms.map((room, l) => (
                      <TreeItem
                        nodeId={`room-${i}-${j}-${k}-${l}`}
                        label={room}
                        key={l}
                        onClick={() =>
                          handleItemClick(properties.Rooms, l, {
                            Assignment: floor,
                          })
                        }
                      />
                    ))}
                  </TreeItem>
                ))}
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </StyledCard>
  );
}

Menu.propTypes = {
  name: PropTypes.shape({
    Site: PropTypes.array,
    Buildings: PropTypes.array,
    Floors: PropTypes.array,
    Rooms: PropTypes.array,
  }).isRequired,
  lengthName: PropTypes.shape({
    Buildings: PropTypes.number,
    Floors: PropTypes.number,
    Rooms: PropTypes.number,
  }).isRequired,
  properties: PropTypes.shape({
    find: PropTypes.func,
    Rooms: PropTypes.array,
    Floors: PropTypes.array,
    Buildings: PropTypes.array,
    Site: PropTypes.array,
  }).isRequired,
  setSelectedElement: PropTypes.func.isRequired,
};

export default Menu;
