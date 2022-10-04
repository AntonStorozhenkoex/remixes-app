import React, { FC, useEffect, useState } from 'react';
import {
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  Table,
  TableBody,
  Grid,
  Button
} from '@mui/material';
import ReactPaginate from 'react-paginate';
import { IRemixesModel, IRemixModel } from '@/graphql/types/_server';
import TableItem from '../TableItem/TableItem';
import styles from './styles';

interface IRemixTable {
  remixes: IRemixesModel;
  setOpen: (prevState: boolean) => boolean | void;
  setRemixId: (prevState: undefined | number) => number | undefined | void;
}

const RemixTable: FC<IRemixTable> = ({ setRemixId, remixes, setOpen }) => {
  const { items } = remixes;
  const [currentItems, setCurrentItems] = useState<IRemixModel[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <TableContainer sx={styles.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Author Email</TableCell>
            <TableCell align="center">Genre</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Track length</TableCell>
            <TableCell align="center">Store</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.length > 0 &&
            currentItems.map((remix) => (
              <TableItem key={remix.id} remix={remix} setOpen={setOpen} setRemixId={setRemixId} />
            ))}
        </TableBody>
      </Table>
      <Grid container sx={styles.pagination}>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<Button sx={styles.button}>Next</Button>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel={<Button sx={styles.button}>Prev</Button>}
          pageClassName="pageCount"
        />
      </Grid>
    </TableContainer>
  );
};

export default RemixTable;
