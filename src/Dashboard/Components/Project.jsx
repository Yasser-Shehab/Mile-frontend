import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getProjects from "../../store/actions/projectAction";

function Project() {
  const projectsList = useSelector((state) => state.projectReducer.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(projectsList);
  return (
    <>
      <DataTable
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        value={projectsList}
      >
        <Column field="name" header="First Name"></Column>
        <Column field="budget" header="Budget"></Column>
        <Column field="createdAt" header="Created At"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="description" header="Basma"></Column>////new added
      </DataTable>
    </>
  );
}

export default Project;
