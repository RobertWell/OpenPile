import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TablePagination,
  TableBody,
  TableSortLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),

    "& thead th": {
      fontWeight: 600,
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },

    "& tbody td": {
      fontWeight: 300,
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

const useTable = (records, headCells, filterFn) => {
  const classes = useStyles();
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [dense, setDense] = React.useState(false);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblPagination = () => {
    return (
      <TablePagination
        component="div"
        rowsPerPage={rowsPerPage}
        count={records.length}
        rowsPerPageOptions={pages}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    );
  };
  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  const TblHead = (props) => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((cell) => (
            <TableCell key={cell.id}>
              {cell.disableSorting ? (
                cell.label
              ) : (
                <TableSortLabel
                  direction={order}
                  active={orderBy === cell.id}
                  onClick={() => {
                    handleSortRequest(cell.id);
                  }}
                >
                  {cell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, records.length - page * rowsPerPage);

  const EmptyRows = () =>
    emptyRows > 0 &&
    Array(emptyRows)
      .fill(0)
      .map((_, index) => (
        <TableRow key={index}>
          <TableCell colSpan={6}>&nbsp;</TableCell>
        </TableRow>
      ));

  const sort = (array, comparator) => {
    const stabilized = array.map((el, index) => [el, index]);
    stabilized.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilized.map((el) => el[0]);
  };
  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const recordsAfterPageAndSorting = () => {
    return sort(filterFn.fn(records), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  const TblContainer = ({ children }) => (
    <>
      <Table className={classes.table}>{children}</Table>
    </>
  );

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPageAndSorting,
    EmptyRows,
  };
};

export default useTable;
