import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function Worker() {
  return (
    <>
      <DataTable>
        <Column field="code" header="FirstName"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </>
  );
}

export default Worker;
