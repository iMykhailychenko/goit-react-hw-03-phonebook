import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const validName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const validNumber = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

const ContactForm = ({ onAddedContact }) => {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'This is required field';
        } else if (!values.number) {
          errors.number = 'This is required field';
        } else if (!validName.test(values.name)) {
          errors.name = 'Invalid name';
        } else if (!validNumber.test(values.number)) {
          errors.number = 'Invalid number';
        }

        return errors;
      }}
      onSubmit={values => onAddedContact(values)}
    >
      {() => (
        <Form>
          <label className={styles.label}>
            <span className="subtitle">Name</span>
            <Field
              className={styles.input}
              type="text"
              name="name"
              placeholder="Enter the contact name..."
              autoComplete="off"
            />
            <ErrorMessage
              name="name"
              render={msg => <div className={styles.errors}>{msg}</div>}
            />
          </label>

          <label className={styles.label}>
            <span className="subtitle">Number</span>
            <Field
              className={styles.input}
              type="tel"
              name="number"
              placeholder="Enter the number..."
              autoComplete="off"
            />
            <ErrorMessage
              name="number"
              render={msg => <div className={styles.errors}>{msg}</div>}
            />
          </label>

          <button className={styles.btn} type="submit">
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

ContactForm.propTypes = {
  onAddedContact: PropTypes.func.isRequired,
};

export default ContactForm;
