import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { getSumCost } from "../../store/actions/accountAction";
import { useEffect } from "react";

function Account() {
  const costsSumList = useSelector((state) => state.accountReducer.costsSum);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSumCost());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(costsSumList);
  return (
    <>
      <DataTable
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        value={costsSumList}
      >
        <Column field="_id" header="Project Name"></Column>
        <Column field="total" header="Sum"></Column>
        <Column field="budget" header="Budget"></Column>
      </DataTable>
    </>
  );
}

export default Account;
