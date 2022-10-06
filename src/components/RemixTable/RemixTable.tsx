import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import ReactPaginate from 'react-paginate';
import { IRemixesModel, IRemixModel, SortDirectionEnum } from '../../graphql/types/_server';
import TableItem from '../TableItem/TableItem';
import styles from './styles';

interface IRemixTable {
  remixes: IRemixesModel;
  setOpen: (prevState: boolean) => boolean | void;
  setRemixId: (prevState: undefined | number) => number | undefined | void;
  handleSortRemixes: (columnName: string, direction: SortDirectionEnum) => void;
}

const RemixTable: FC<IRemixTable> = ({ setRemixId, remixes, setOpen, handleSortRemixes }) => {
  const { items } = remixes;
  const [currentItems, setCurrentItems] = useState<IRemixModel[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const [sortSetting, setSortSetting] = useState(SortDirectionEnum.Asc);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  const handleSort = (name: string) => {
    handleSortRemixes(name, sortSetting);
    setSortSetting((prevState) =>
      prevState === SortDirectionEnum.Asc ? SortDirectionEnum.Desc : SortDirectionEnum.Asc
    );
  };

  return (
    <TableContainer sx={styles.table}>
      <Table data-table="remixes">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort('name')} align="left">
              Name
            </TableCell>

            <TableCell onClick={() => handleSort('authorEmail')} align="center">
              Author Email
            </TableCell>

            <TableCell onClick={() => handleSort('genre')} align="center">
              Genre
            </TableCell>

            <TableCell onClick={() => handleSort('description')} align="center">
              Description
            </TableCell>

            <TableCell onClick={() => handleSort('price')} align="center">
              Price
            </TableCell>

            <TableCell onClick={() => handleSort('trackLength')} align="center">
              Track length
            </TableCell>

            <TableCell onClick={() => handleSort('isStore')} align="center">
              Store
            </TableCell>

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

      {items.length > itemsPerPage && (
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
      )}
    </TableContainer>
  );
};

export default RemixTable;
