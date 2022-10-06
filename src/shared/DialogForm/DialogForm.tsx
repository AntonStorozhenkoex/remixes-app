import React, { FC, useMemo } from 'react';
import { useFormikContext } from 'formik';
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
  FormControl,
  Typography
} from '@mui/material';
import { genres } from '../../contants';
import styles from './styles';
import { IFormValues } from '../../../types';

interface IDialogForm {
  isOpen: boolean;
  remixId: number | undefined;
  setOpen: (prevState: boolean) => boolean | void;
}

const DialogForm: FC<IDialogForm> = ({ isOpen, setOpen, remixId }) => {
  const { errors, isValid, handleBlur, touched, handleSubmit, values, handleChange, resetForm } =
    useFormikContext<IFormValues>();
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const isDisableButton = useMemo(
    () => !isValid || Object.keys(touched).length === 0,
    [isValid, touched]
  );

  return (
    <Dialog open={isOpen} sx={styles.dialog}>
      <DialogTitle sx={styles.dialogTitle}>{remixId ? 'Edit Remix' : 'Add Remix'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={styles.dialogContent}>
          <Grid sx={styles.textFieldContainer}>
            <TextField
              data-input="name"
              sx={styles.textField}
              fullWidth
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <Typography sx={styles.errorMessage} variant="subtitle1">
                {errors.name}
              </Typography>
            )}
          </Grid>
          <Grid sx={styles.textFieldContainer}>
            <TextField
              data-input="authorEmail"
              sx={styles.textField}
              fullWidth
              label="Author Email"
              name="authorEmail"
              value={values.authorEmail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.authorEmail && touched.authorEmail && (
              <Typography sx={styles.errorMessage} variant="subtitle1">
                {errors.authorEmail}
              </Typography>
            )}
          </Grid>
          <Grid sx={styles.textFieldContainer}>
            <TextField
              data-input="description"
              sx={styles.textField}
              fullWidth
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && touched.description && (
              <Typography sx={styles.errorMessage} variant="subtitle1">
                {errors.description}
              </Typography>
            )}
          </Grid>
          <Grid sx={styles.textFieldContainer}>
            <TextField
              data-input="price"
              sx={styles.textField}
              fullWidth
              label="Price"
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
            />
            {errors.price && touched.price && (
              <Typography sx={styles.errorMessage} variant="subtitle1">
                {errors.price}
              </Typography>
            )}
          </Grid>
          <Grid sx={styles.textFieldContainer}>
            <TextField
              data-input="trackLength"
              sx={styles.textField}
              fullWidth
              label="Track Length"
              name="trackLength"
              value={values.trackLength}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
            />
            {errors.trackLength && touched.trackLength && (
              <Typography sx={styles.errorMessage} variant="subtitle1">
                {errors.trackLength}
              </Typography>
            )}
          </Grid>
          <Grid container justifyContent="space-between">
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="genre">Genre</InputLabel>
                <Select
                  data-input="genre"
                  labelId="genre"
                  label="Genre"
                  sx={styles.select}
                  name="genre"
                  value={values.genre}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
        </DialogContent>
        <DialogActions sx={styles.buttonsContainer}>
          <Button
            data-button="submit"
            disabled={isDisableButton}
            type="submit"
            sx={[styles.button, styles.submitButton]}
          >
            {remixId ? 'Edit' : 'Add'}
          </Button>
          <Button
            data-button="cancel"
            onClick={() => handleClose()}
            sx={[styles.button, styles.cancelButton]}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogForm;
