import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React from "react";

function Specialization() {
  return (
    <>
      <DataTable>
        <Column field="name" header="FirstName"></Column>
        <Column field="address" header="Address"></Column>
        <Column field="mobile" header="Mobile"></Column>
        <Column field="nationalID" header="ID"></Column>
      </DataTable>
    </>
  );
}

export default Specialization;
