import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getSpecializations,addSpecializations} from "../../store/actions/specAction";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

let emptyProduct = {
  name: "AAA",

};

function Specialization() {
  const specsList = useSelector((state) => state.specializationReducer.specs);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const[inputValues,setInputValues]=useState({name:"",type:""});
  const[errors,setErrors]=useState({errName:"",errType:""});

  useEffect(() => {
    dispatch(getSpecializations());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(specsList);
  const openNew = () => {
    setInputValues(inputValues)
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
    // setProduct(inputValues);
    setInputValues({name:"",type:""})

  };

  const saveProduct = () => {
    setSubmitted(true);
    // setProductDialog(false);
    // setProduct(inputValues);
    // setInputValues({name:"",type:""})
    
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          // onClick={confirmDeleteSelected}
          // disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
  };
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        type="submit"
        // onClick={saveProduct}
      />
    </React.Fragment>
  );
  const nameHandel=(event)=>{
setInputValues({...inputValues,name:event.target.value})
console.log(inputValues);
  }

  const typeHandel=(event)=>{
    setInputValues({...inputValues,type:event.target.value})
    console.log(inputValues);
  }
  const submitHandel=(event)=>{
event.preventDefault();
console.log(inputValues);
dispatch(addSpecializations(inputValues));
// console.log("event");
  }
  
  
  return (
    <>
      <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
      <DataTable
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        value={specsList}
      >
        <Column field="name" header="First Name"></Column>
        <Column field="type" header="Type"></Column>
      </DataTable>
   {/* /////////////////////////////////////////////////////////////////////////////// */}
      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <form onSubmit={submitHandel} noValidate>
        <div className="field">
          <label htmlFor="name">أسم التخصص </label>
          <InputText
            id="name"
            value={inputValues.name}
            name="name"
            // onChange={(e) => onInputChange(e, "name")}
            onChange={nameHandel}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !inputValues.name })}
          />
          {submitted && !inputValues.name && (
            <small className="p-error">أسم التخصص مطلوب</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="typr">نوع التخصص</label>
          <InputText
            id="type"
            value={inputValues.type}
            name="type"
            // onChange={(e) => onInputChange(e, "name")}
            onChange={typeHandel}
            required
            className={classNames({ "p-invalid": submitted && !inputValues.type })}
          />
          {submitted && !inputValues.type && (
            <small className="p-error">نوع التخصص مطلوب</small>
          )}
        </div>
        <button type="submit">submit</button>
        </form>
     
      </Dialog>
    </>
  );
}

export default Specialization;
