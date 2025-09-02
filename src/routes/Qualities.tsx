import { TableSimpleView } from "../components/TableSimpleView";
import { useQualities, columns } from "../helpers/useQualities";
import "./Qualities.scss";

export const Qualities = function () {
  const qualitiesData = useQualities();

  return (
      <TableSimpleView
        columns={columns}
        data={qualitiesData}
        route="qualities"
        tableClass="qualities-table"
      />
  );
};
