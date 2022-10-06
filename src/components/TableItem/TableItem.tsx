import React, { Dispatch, FC, SetStateAction } from 'react';
import { useMutation } from '@apollo/client';
import { useFormikContext } from 'formik';
import { Button, TableCell, TableRow } from '@mui/material';
import { IRemixModel } from '@/graphql/types/_server';
import styles from './styles';
import { DELETE_REMIX_BY_ID } from '@/graphql/mutations/deleteRemixById';
import { GET_REMIXES_QUERY } from '@/graphql/queries/getRemixesQuery';
import { payload } from '@/contants';

interface ITableItem {
  remix: IRemixModel;
  setOpen: (prevState: boolean) => boolean | void;
  setRemixId: (prevState: number | undefined) => number | void | undefined;
}

const TableItem: FC<ITableItem> = ({ remix, setRemixId, setOpen }) => {
  const { setValues } = useFormikContext();
  const [deleteRemix, { data, loading, error }] = useMutation(DELETE_REMIX_BY_ID, {
    variables: {
      id: remix.id
    },
    refetchQueries: [
      {
        query: GET_REMIXES_QUERY,
        variables: {
          payload
        }
      }
    ]
  });
  const handleEdit = () => {
    setValues({
      name: remix.name,
      authorEmail: remix.authorEmail,
      genre: remix.genre,
      description: remix.description,
      price: remix.price,
      trackLength: remix.trackLength,
      isStore: remix.isStore
    });
    setOpen(true);
    setRemixId(remix.id);
  };

  return (
    <TableRow>
      <TableCell align="left">{remix.name}</TableCell>
      <TableCell align="center">
        {remix.authorEmail} + {remix.id}
      </TableCell>
      <TableCell align="center">{remix.genre}</TableCell>
      <TableCell align="center">{remix.description}</TableCell>
      <TableCell align="center">{remix.price}</TableCell>
      <TableCell align="center">{remix.trackLength}</TableCell>
      <TableCell align="center">{remix.isStore ? 'Yes' : 'No'}</TableCell>
      <TableCell align="right">
        <Button data-button="edit" sx={styles.button} onClick={() => handleEdit()}>
          Edit
        </Button>
        <Button data-button="delete" sx={styles.button} onClick={() => deleteRemix()}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
