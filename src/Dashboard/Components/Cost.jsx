import React, { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector, useDispatch } from "react-redux";
import getCosts from "../../store/actions/costAction";

function Cost() {
  const costsList = useSelector((state) => state.costReducer.costs);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCosts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(costsList);
  return (
    <>
      <DataTable
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        value={costsList}
      >
        <Column field="worker.name" header="WorkerName"></Column>
        <Column field="project.name" header="ProjectName"></Column>
        <Column field="amount" header="Cost"></Column>
        <Column field="createdAt" header="CreatedAt"></Column>
      </DataTable>
    </>
  );
}

export default Cost;
