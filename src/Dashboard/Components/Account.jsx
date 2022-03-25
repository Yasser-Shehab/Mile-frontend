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
  const moneyData = (rowData) => {
    return (
      <>
        <p
          className={
            rowData.total > rowData.budget
              ? "text-orange-500 font-bold"
              : "text-green-500 font-bold"
          }
        >
          {rowData.total}
        </p>
      </>
    );
  };
  return (
    <>
      <DataTable
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        value={costsSumList}
        responsiveLayout="scroll"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} of Accounts"
      >
        <Column
          filter
          filterPlaceholder="filter..."
          field="_id"
          header="اسم المشروع"
        ></Column>
        <Column
          body={moneyData}
          field="total"
          header="المبلغ المنفق حتى الان"
        ></Column>
        <Column
          field="budget"
          className="font-bold"
          header="المبلغ المتوقع"
        ></Column>
      </DataTable>
    </>
  );
}

export default Account;
