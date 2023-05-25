import PropTypes from "prop-types";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

  function handleItemClick(element) {
    setSelectedElement({
      Name: element[0]?.Name?.value,
      LongName: element[0]?.Description?.value,
      Type: element[0]?.GlobalId?.value,
      GUID: element[0]?.type,
    });
  }

  return (
    <>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {filteredSite.map((site, i) => (
          <TreeItem
            nodeId={`site-${i}`}
            label={formatLabel(site, lengthName.Buildings)}
            key={i}
            onClick={() => handleItemClick(properties.Site)}
          >
            {filteredBuildings.map((building, j) => (
              <TreeItem
                nodeId={`building-${i}-${j}`}
                label={formatLabel(building, lengthName.Floors)}
                key={j}
                onClick={() => handleItemClick(properties.Buildings)}
              >
                {filteredFloors.map((floor, k) => (
                  <TreeItem
                    nodeId={`floor-${i}-${j}-${k}`}
                    label={formatLabel(floor, lengthName.Rooms)}
                    key={k}
                    onClick={() => handleItemClick(properties.Floors)}
                  >
                    {filteredRooms.map((room, l) => (
                      <TreeItem
                        nodeId={`room-${i}-${j}-${k}-${l}`}
                        label={room}
                        key={l}
                        onClick={() => handleItemClick(properties.Rooms)}
                      />
                    ))}
                  </TreeItem>
                ))}
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </>
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
  }).isRequired,
};

export default Menu;
