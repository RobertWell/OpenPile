import React, { useState } from "react";
import EmployeeForm from "../Components/EmployeeForm";
import PageHeader from "../App/_Layout/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import useTable from "../hooks/useTable";
import {
  getEmployees,
  insertEmployee,
  updatetEmployee,
  deleteEmployee,
} from "../Services/employeeService";
import {
  Paper,
  makeStyles,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import { Input, Button, ActionButton } from "../Components/controls";
import { SearchOutlined } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../Components/Popup";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../Components/Notification";
import ConfirmDialog from "../Components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  SearchInput: {
    width: "75%",
  },
  newBtn: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department" },
  { id: "actions", label: "actions", disableSorting: false },
];

const Employees = () => {
  const classes = useStyles();

  const [records, setRecords] = useState(getEmployees());
  const [filterFn, setFilterFn] = useState({ fn: (items) => items });
  const [openpopup, setOpenpopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const {
    TblContainer,
    recordsAfterPageAndSorting,
    EmptyRows,
    TblHead,
    TblPagination,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else return items.filter((x) => x.fullName.includes(target.value));
      },
    });
  };

  const addOrEdit = (employee, resetForm) => {
    if (!employee.id) insertEmployee(employee);
    else updatetEmployee(employee);
    resetForm();
    setOpenpopup(!openpopup);
    setRecords(getEmployees());
    setNotify({
      isOpen: true,
      message: "Submit Successfully",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenpopup(true);
  };
  const handleDelete = (item) => {
    deleteEmployee(item);
    setRecords(getEmployees());
    setNotify({
      isOpen: true,
      message: "Delete Successfully",
      type: "error",
    });
  };
  return (
    <div>
      <PageHeader
        title="Page Header"
        subTitle="Page description"
        icon={<PeopleOutlineIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Input
            className={classes.SearchInput}
            label="Search Employees"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
          <Button
            text="Add New"
            startIcon={<AddIcon />}
            className={classes.newBtn}
            variant="outlined"
            onClick={() => setOpenpopup(!openpopup)}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPageAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <ActionButton
                    color="primary"
                    onClick={() => openInPopup(item)}
                  >
                    <EditIcon />
                  </ActionButton>
                  <ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are You Sure to delete this record?",
                        subtitle: "You can't undo this operation",
                        onConfirm: () => handleDelete(item),
                      });
                    }}
                  >
                    <CloseIcon />
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}

            <EmptyRows />
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Add New Employee"
        openPopup={openpopup}
        setOpenPopup={setOpenpopup}
      >
        <EmployeeForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
};

export default Employees;
