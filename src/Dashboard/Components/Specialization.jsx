import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getSpecializations from "../../store/actions/specAction";

function Specialization() {
  const specsList = useSelector((state) => state.specializationReducer.specs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecializations());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <DataTable
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        value={specsList}
      >
        <Column field="name" header="First Name"></Column>
        <Column field="type" header="Type"></Column>
      </DataTable>
    </>
  );
}

export default Specialization;
