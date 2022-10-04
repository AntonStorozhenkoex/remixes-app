import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Formik, Form } from 'formik';
import RemixTable from '../RemixTable/RemixTable';
import { GET_REMIXES_QUERY } from '@/graphql/queries/getRemixesQuery';
import AddPanel from '@/components/AddPanel/AddPanel';
import DialogForm from '@/shared/DialogForm/DialogForm';
import { IFormValues } from '../../../types';
import { validationSchema } from '@/validation';
import { EDIT_REMIX_MUTATION } from '@/graphql/mutations/editRemixMutation';
import { CREATE_REMIX_MUTATION } from '@/graphql/mutations/createRemixMutation';
import CustomAlert from '@/shared/CustomAlert/CustomAlert';

const Remixes: FC = () => {
  const { data, refetch } = useQuery(GET_REMIXES_QUERY);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [remixId, setRemixId] = useState<undefined | number>(undefined);
  const [isOpenAlert, setOpenAlert] = useState<boolean>(false);
  const { remixes } = data || [];
  const initialValues: IFormValues = {
    name: '',
    authorEmail: '',
    genre: 'rock',
    description: '',
    price: 0,
    trackLength: 0,
    isStore: true
  };
  const [editRemix] = useMutation(EDIT_REMIX_MUTATION, {
    refetchQueries: [{ query: GET_REMIXES_QUERY }]
  });
  const [addNewRemix, { loading: addLoading, error: addError }] = useMutation(
    CREATE_REMIX_MUTATION,
    {
      refetchQueries: [{ query: GET_REMIXES_QUERY }]
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
    refetch();
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

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
          {data?.remixes?.items && (
            <RemixTable remixes={remixes} setOpen={setOpen} setRemixId={setRemixId} />
          )}
          <AddPanel setOpen={setOpen} />
          <DialogForm remixId={remixId} isOpen={isOpen} setOpen={setOpen} />
          {addLoading || (
            <CustomAlert
              open={isOpenAlert}
              errorMessage={addError?.message}
              handleClose={handleCloseAlert}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Remixes;
