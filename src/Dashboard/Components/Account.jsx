import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts, getSumCost } from "../../store/actions/accountAction";
import { useEffect } from "react";

function Account() {
  const accountList = useSelector((state) => state.accountReducer.accounts);
  const costsSumList = useSelector((state) => state.accountReducer.costsSum);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccounts());
    dispatch(getSumCost());
  }, []);
  console.log(costsSumList);
  return (
    <>
      <DataTable value={costsSumList}>
        <Column field="_id" header="Project Name"></Column>
        <Column field="total" header="Sum"></Column>
      </DataTable>
    </>
  );
}

export default Account;
