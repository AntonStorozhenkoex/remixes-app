import React, { FC } from 'react';
import { TableContainer, TableRow, TableCell, TableHead, Table, TableBody } from '@mui/material';
import { IRemixesModel } from '@/graphql/types/_server';
import TableItem from '../TableItem/TableItem';

interface IRemixTable {
  remixes: IRemixesModel;
  setOpen: (prevState: boolean) => boolean | void;
}

const RemixTable: FC<IRemixTable> = ({ remixes, setOpen }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Author Email</TableCell>
            <TableCell align="center">Genre</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Track length</TableCell>
            <TableCell align="center">Store</TableCell>
            <TableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {remixes?.items.map((remix) => (
            <TableItem key={remix.id} remix={remix} setOpen={setOpen} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RemixTable;
