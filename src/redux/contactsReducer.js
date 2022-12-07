import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOperations';

const contacts = createReducer([], {
  [fetchContacts.fulfilled]: (_, action) => action.payload,

  [addContact.fulfilled]: (state, action) => {
    return [action.payload, ...state.contacts];
    // state.contacts.push([...action.payload]);
    // state.contacts = [{ ...action.payload }, ...state.contacts];
    // return { ...action.payload }, [...state.contacts.contacts];
    // state.contacts = [action.payload, ...state.contacts];
  },
  [deleteContact.fulfilled]: (state, action) => {
    const index = state.contacts.findIndex(
      contact => contact.id === action.payload
    );
    state.contacts.splice(index, 1);
  },
});

const isLoading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchContacts.pending]: () => null,
  [fetchContacts.rejected]: (_, action) => action.payload,
});

export default combineReducers({
  contacts,
  isLoading,
  error,
});
