import React, { FC } from 'react';
import { useMutation } from '@apollo/client';
import { Button, TableCell, TableRow } from '@mui/material';
import { IRemixModel } from '@/graphql/types/_server';
import styles from './styles';
import { DELETE_REMIX_BY_ID } from '@/graphql/mutations/deleteRemixById';
import { GET_REMIXES_QUERY } from '@/graphql/queries/getRemixesQuery';

interface ITableItem {
  remix: IRemixModel;
  key: number;
  setOpen: (prevState: boolean) => boolean | void;
}

const TableItem: FC<ITableItem> = ({ remix, key, setOpen }) => {
  const [deleteRemix, { data, loading, error }] = useMutation(DELETE_REMIX_BY_ID, {
    variables: {
      id: remix.id
    },
    refetchQueries: [{ query: GET_REMIXES_QUERY }]
  });
  const handleEdit = () => {
    setOpen(true);
  };

  return (
    <TableRow>
      <TableCell align="center">{remix.name}</TableCell>
      <TableCell align="center">
        {remix.authorEmail} + {remix.id}
      </TableCell>
      <TableCell align="center">{remix.genre}</TableCell>
      <TableCell align="center">{remix.description}</TableCell>
      <TableCell align="center">{remix.price}</TableCell>
      <TableCell align="center">{remix.trackLength}</TableCell>
      <TableCell align="center">{remix.isStore ? 'Yes' : 'No'}</TableCell>
      <TableCell align="center">
        <Button sx={styles.button} onClick={() => handleEdit()}>
          Edit
        </Button>
        <Button sx={styles.button} onClick={() => deleteRemix()}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
