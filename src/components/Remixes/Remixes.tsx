import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Formik, Form } from 'formik';
import RemixTable from '../RemixTable/RemixTable';
import { GET_REMIXES_QUERY } from '@/graphql/queries/getRemixesQuery';
import AddPanel from '@/components/AddPanel/AddPanel';
import DialogForm from '@/shared/DialogForm/DialogForm';
import { IFormValues } from '../../../types';

const Remixes: FC = () => {
  const { data, loading, error } = useQuery(GET_REMIXES_QUERY);
  const [isOpen, setOpen] = useState(false);
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

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)}>
      {() => (
        <Form>
          <RemixTable remixes={remixes} setOpen={setOpen} />
          <AddPanel setOpen={setOpen} />
          <DialogForm isOpen={isOpen} setOpen={setOpen} />
        </Form>
      )}
    </Formik>
  );
};

export default Remixes;
