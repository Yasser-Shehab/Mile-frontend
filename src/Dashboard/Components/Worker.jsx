import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getWorkers from "../../store/actions/workerAction";

function Worker() {
  const workersList = useSelector((state) => state.workerReducer.workers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkers());
  }, []);
  return (
    <>
      <DataTable value={workersList}>
        <Column field="name" header="FirstName"></Column>
        <Column field="address" header="Address"></Column>
        <Column field="mobile" header="Mobile"></Column>
        <Column field="nationalID" header="ID"></Column>
      </DataTable>
    </>
  );
}

export default Worker;
