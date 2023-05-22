import PropTypes from "prop-types";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Menu({ name }) {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {name.Site &&
        name.Site.map((site, i) => (
          <TreeItem nodeId={`site-${i}`} label={site} key={i}>
            {name.Bâtiments &&
              name.Bâtiments.map((building, j) => (
                <TreeItem
                  nodeId={`building-${i}-${j}`}
                  label={building}
                  key={j}
                >
                  {name.Etage &&
                    name.Etage.map((floor, k) => (
                      <TreeItem
                        nodeId={`floor-${i}-${j}-${k}`}
                        label={floor}
                        key={k}
                      >
                        {name.Pièce &&
                          name.Pièce.map((room, l) => (
                            <TreeItem
                              nodeId={`room-${i}-${j}-${k}-${l}`}
                              label={room}
                              key={l}
                            />
                          ))}
                      </TreeItem>
                    ))}
                </TreeItem>
              ))}
          </TreeItem>
        ))}
    </TreeView>
  );
}

Menu.propTypes = {
  name: PropTypes.shape({
    Site: PropTypes.array,
    Bâtiments: PropTypes.array,
    Etage: PropTypes.array,
    Pièce: PropTypes.array,
  }).isRequired,
};

export default Menu;
