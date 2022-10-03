import React, { FC, SetStateAction } from 'react';
import { useFormikContext } from 'formik';
import { useMutation } from '@apollo/client';
import {
  Grid,
  DialogTitle,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  Button,
  InputLabel,
  FormControl
} from '@mui/material';
import { genres } from '@/contants';
import styles from './styles';
import { IFormValues } from '../../../types';
import { CREATE_REMIX_MUTATION } from '@/graphql/mutations/createRemixMutation';
import { GET_REMIXES_QUERY } from '@/graphql/queries/getRemixesQuery';

interface IDialogForm {
  isOpen: boolean;
  setOpen: (prevState: boolean) => boolean | void;
}

const DialogForm: FC<IDialogForm> = ({ isOpen, setOpen }) => {
  const { handleSubmit, values, handleChange } = useFormikContext<IFormValues>();
  const [addNewRemix, { data, loading, error }] = useMutation(CREATE_REMIX_MUTATION, {
    variables: {
      name: values.name,
      authorEmail: values.authorEmail,
      isStore: values.isStore,
      description: values.description,
      price: Number(values.price),
      trackLength: Number(values.trackLength),
      genre: values.genre
    },
    refetchQueries: [{ query: GET_REMIXES_QUERY }]
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddNewQuery = () => {
    addNewRemix();
    setOpen(false);
  };
  console.log(values.isStore);

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Add Remix</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={styles.textField}
            fullWidth
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
          />
          <TextField
            sx={styles.textField}
            fullWidth
            label="Author Email"
            name="authorEmail"
            value={values.authorEmail}
            onChange={handleChange}
          />
          <TextField
            sx={styles.textField}
            fullWidth
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <TextField
            sx={styles.textField}
            fullWidth
            label="Price"
            name="price"
            value={values.price}
            onChange={handleChange}
          />
          <TextField
            sx={styles.textField}
            fullWidth
            label="Track Length"
            name="trackLength"
            value={values.trackLength}
            onChange={handleChange}
          />
          <Grid container justifyContent="space-between">
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="genre">Genre</InputLabel>
                <Select
                  labelId="genre"
                  label="Genre"
                  sx={styles.select}
                  name="genre"
                  value={values.genre}
                  onChange={handleChange}
                >
                  {genres.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <FormControlLabel
              control={
                <Checkbox
                  name="isStore"
                  value={values.isStore}
                  checked={values.isStore}
                  onChange={handleChange}
                />
              }
              label="Is store"
            />
          </Grid>
        </form>
      </DialogContent>
      <DialogActions sx={styles.buttonsContainer}>
        <Button onClick={() => handleAddNewQuery()} sx={[styles.button, styles.submitButton]}>
          Do it!
        </Button>
        <Button onClick={() => handleClose()} sx={[styles.button, styles.cancelButton]}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogForm;
