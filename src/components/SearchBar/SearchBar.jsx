import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { object, string } from 'yup';

import {
  SearchbarWrapper,
  SearchbarForm,
  SearchButton,
  SearchButtonLabel,
  Input,
} from './SearchBar.styled';

let schema = object({
  searchText: string().trim().required(),
});

export function SearchBar({ onSubmit }) {
  const onSubmitForm = ({ searchText }, { resetForm }) => {
    if (!searchText) {
      return;
    }
    resetForm();
    onSubmit(searchText);
  };

  return (
    <SearchbarWrapper>
      <Formik
        initialValues={{ searchText: '' }}
        validationSchema={schema}
        onSubmit={onSubmitForm}
      >
        <SearchbarForm>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <Input
            type="text"
            name="searchText"
            autoComplete="true"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchbarForm>
      </Formik>
    </SearchbarWrapper>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
