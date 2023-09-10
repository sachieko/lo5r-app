import { useOpportunities } from "../helpers/useOpportunities";
import { IOpportunity } from "../helpers/interfaces";
import { Table, TableColumn } from "../components/Table";
import './Opportunity.scss';

export const Opportunity = function() {
  const opps = useOpportunities();

  // Define the columns we'd like for the table from the opportunity data type
  const columns: TableColumn<IOpportunity, keyof IOpportunity>[] = [
    {
      key: 'ring',
      header: 'Ring'
    },
    {
      key: 'category',
      header: 'Category'
    },
    {
      key: 'cost',
      header: 'Cost'
    },
    {
      key: 'effect',
      header: 'Effect'
    },
    {
      key: 'name',
      header: 'Technique'
    }
  ];

  return (
    <div className='table-container'>
      <Table data={opps} columns={columns} />
    </div>
  );
};