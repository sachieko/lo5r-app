import { TableSimpleView } from "../components/TableSimpleView";
import { useTerrains, columns } from "../helpers/useTerrains";
import "./Terrains.scss";

export const Terrains = function () {
  const terrainData = useTerrains();

  return (
    <TableSimpleView
      columns={columns}
      data={terrainData}
      route="terrains"
      tableClass="terrains-table"
    />
  );
};
