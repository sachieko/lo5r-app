import { TableSimpleView } from "../components/TableSimpleView";
import { useConditions, columns } from "../helpers/useConditions";
import "./Conditions.scss";

export const Conditions = function () {
  const conditionData = useConditions();

  return (
    <TableSimpleView
      columns={columns}
      data={conditionData}
      route="conditions"
      tableClass="conditions-table"
    />
  );
};
