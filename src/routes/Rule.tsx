import { TableCardView } from "../components/TableCardView";
import { useRules, columns } from "../helpers/useRules";
import "./Rule.scss";

export const Rule = function () {
  const ruleData = useRules();

  return (
    <TableCardView
      columns={columns}
      data={ruleData}
      route={"rules"}
      tableClass={"rule-table"}
    />
  );
};
