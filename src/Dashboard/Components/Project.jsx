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
  }, []);
  console.log(projectsList);
  return (
    <>
      <DataTable value={projectsList}>
        <Column field="name" header="First Name"></Column>
        <Column field="budget" header="Budget"></Column>
        <Column field="createdAt" header="Created At"></Column>
        <Column field="description" header="Description"></Column>
      </DataTable>
    </>
  );
}

export default Project;
