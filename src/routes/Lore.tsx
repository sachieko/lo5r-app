import { TableCardView } from "../components/TableCardView";
import { useLore, columns } from "../helpers/useLore";
import "./Lore.scss";

export const Lore = function () {
  const loreData = useLore();

  return (
    <TableCardView
      columns={columns}
      data={loreData}
      route={"lore"}
      tableClass={"lore-table"}
    />
  );
};
