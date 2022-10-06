import React, { FC, useCallback, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import RemixTable from '../RemixTable/RemixTable';
import { GET_REMIXES_QUERY } from '../../graphql/queries/getRemixesQuery';
import AddPanel from '../AddPanel/AddPanel';
import DialogForm from '../../shared/DialogForm/DialogForm';
import { IFormValues } from '../../../types';
import { validationSchema } from '../../validation';
import { EDIT_REMIX_MUTATION } from '../../graphql/mutations/editRemixMutation';
import { CREATE_REMIX_MUTATION } from '../../graphql/mutations/createRemixMutation';
import CustomAlert from '../../shared/CustomAlert/CustomAlert';
import { SortDirectionEnum } from '../../graphql/types/_server';
import { payload } from '../../contants';

const Remixes: FC = () => {
  const [getRemixes, { data }] = useLazyQuery(GET_REMIXES_QUERY, {
    variables: {
      payload
    }
  });
  const [isOpen, setOpen] = useState<boolean>(false);
  const [remixId, setRemixId] = useState<undefined | number>(undefined);
  const [isOpenAlert, setOpenAlert] = useState<boolean>(false);
  const { remixes } = data || [];
  const initialValues: IFormValues = {
    name: '',
    authorEmail: '',
    genre: 'rock',
    description: '',
    price: '',
    trackLength: '',
    isStore: true
  };
  const [editRemix, { error: editError }] = useMutation(EDIT_REMIX_MUTATION, {
    refetchQueries: [
      {
        query: GET_REMIXES_QUERY,
        variables: {
          payload
        }
      }
    ]
  });
  const [addNewRemix, { loading: addLoading, error: addError }] = useMutation(
    CREATE_REMIX_MUTATION,
    {
      refetchQueries: [
        {
          query: GET_REMIXES_QUERY,
          variables: {
            payload
          }
        }
      ]
    }
  );

  const handleSubmit = (payload: IFormValues) => {
    if (remixId) {
      editRemix({ variables: { ...payload, id: remixId } });
    } else {
      addNewRemix({ variables: payload });
    }
    setRemixId(undefined);
    setOpenAlert(true);
    setOpen(false);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    getRemixes();
  }, []);

  const handleSortRemixes = useCallback((columnName: string, direction: SortDirectionEnum) => {
    getRemixes({
      variables: {
        payload: {
          ...payload,
          sorts: [{ columnName, direction }]
        }
      }
    });
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {() => (
        <Form>
          <AddPanel setOpen={setOpen} />
          {data?.remixes?.items && (
            <RemixTable
              remixes={remixes}
              setOpen={setOpen}
              setRemixId={setRemixId}
              handleSortRemixes={handleSortRemixes}
            />
          )}
          <DialogForm remixId={remixId} isOpen={isOpen} setOpen={setOpen} />
          {addLoading || (
            <CustomAlert
              open={isOpenAlert}
              errorMessage={addError?.message || editError?.message}
              handleClose={handleCloseAlert}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Remixes;
