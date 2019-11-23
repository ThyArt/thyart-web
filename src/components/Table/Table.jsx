import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableHead from '@material-ui/core/TableHead';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import { map, entries, includes, filter, isEmpty, each } from 'lodash';

function Table({ rows, header, onRowClick, onDeleteClick }) {
  const [selected, setSelected] = useState([]);
  const [myRows, setMyRows] = useState(rows);
  const [order, setOrder] = useState('asc');
  let showDelete = true;

  if (onRowClick === undefined) {
    onRowClick = function(id) {};
  }
  if (onDeleteClick === undefined) {
    onDeleteClick = function(id) {};
    showDelete = false;
  }

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    if (includes(selected, id)) {
      setSelected(
        filter(selected, function(elem) {
          return elem !== id;
        })
      );
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSortColumn = index => {
    if (order === 'asc') {
      setMyRows(
        myRows.sort(function(a, b) {
          const arg1 = a[Object.keys(a)[index]];
          const arg2 = b[Object.keys(b)[index]];
          if (arg1 < arg2) return -1;
          if (arg1 > arg2) return 1;
          return 0;
        })
      );
    } else {
      setMyRows(
        myRows.sort(function(a, b) {
          const arg1 = a[Object.keys(a)[index]];
          const arg2 = b[Object.keys(b)[index]];
          if (arg1 > arg2) return -1;
          if (arg1 < arg2) return 1;
          return 0;
        })
      );
    }
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const handleDeleteClick = () => {
    each(selected, id => onDeleteClick(id));
  };

  return (
    <>
      <Toolbar>
        {selected.length > 0 ? (
          <>
            <Typography color="secondary" variant="subtitle1">
              {selected.length} séléctionnés
            </Typography>

            {showDelete ? (
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={() => handleDeleteClick()}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </>
        ) : null}
      </Toolbar>

      <MTable>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            {map(header, (head, index) => (
              <TableCell key={`head#${index}`} onClick={() => handleSortColumn(index)}>
                <TableSortLabel direction={order}>{head}</TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {map(myRows, (row, index) => (
            <TableRow hover key={`row#${index}`} onClick={() => onRowClick(row.id)} role="checkbox">
              <TableCell padding="checkbox">
                {isEmpty(row) ? null : (
                  <Checkbox onClick={event => handleCheckboxClick(event, row.id)} />
                )}
              </TableCell>
              {entries(row).map(([key, value], i) => {
                if (key === 'id') return null;
                return <TableCell key={`cell#${i}`}>{value}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </MTable>
    </>
  );
}

Table.propTypes = {
  rows: PropTypes.array.isRequired,
  header: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

export default Table;
