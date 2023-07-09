import React, { Component } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const Schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces.'
    ),
  number: yup
    .string()
    .required()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

const initialValues = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    this.props.onSubmit(newContact);
    resetForm();
  };

  nameId = nanoid();
  numberId = nanoid();

  render() {
    ContactForm.propType = {
      onSubmit: PropTypes.func,
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={Schema}
      >
        <Form className={css.form}>
          <label htmlFor={this.nameId}>name*</label>
          <Field
            id={this.nameId}
            className={css.input}
            type="text"
            name="name"
            placeholder="Name Surname"
          />
          <ErrorMessage name="name" component="span" />

          <label htmlFor={this.numberId}>number*</label>
          <Field
            id={this.numberId}
            className={css.input}
            type="tel"
            name="number"
            placeholder="000-00-00"
          />
          <ErrorMessage name="number" component="span" />

          <button type="submit" className={css.addButton}>
            Add contact
          </button>
        </Form>
      </Formik>
    );
  }
}

// ==========first variant without Formik================

// export class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleChenge = e => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = e => {
//     const { name, number } = this.state;
//     e.preventDefault();
//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.props.onSubmit(newContact);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({
//       name: '',
//       number: '',
//     });
//   };

//   nameId = nanoid();
//   numberId = nanoid();

//   render() {
//     return (
//       <form className={css.form} onSubmit={this.handleSubmit}>
//         <label htmlFor={this.nameId}>name</label>
//         <input
//           id={this.nameId}
//           className={css.input}
//           type="text"
//           name="name"
//           value={this.state.name}
//           title="Name may contain only letters, apostrophe, dash and spaces.
//             For example Adrian, Jacob Mercer, Charles de Batz de Castelmore
//             d'Artagnan"
//           required
//           onChange={this.handleChenge}
//         />

//         <label htmlFor={this.numberId}>number</label>
//         <input
//           id={this.numberId}
//           className={css.input}
//           type="tel"
//           name="number"
//           value={this.state.number}
//           title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//           required
//           onChange={this.handleChenge}
//         />
//         <button type="submit" className={css.addButton}>
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }

// const initialValues = {
//   name: '',
//   number: '',
// };
