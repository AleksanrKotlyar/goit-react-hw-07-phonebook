import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOperations';
import { toast } from 'react-hot-toast';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
      toast.loading('Loading contacts...', {
        style: {
          background: '#9aec3d4d',
        },
      });
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
      toast.dismiss();
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
      toast.dismiss();
    },
    [addContact.pending](state) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
      toast(`Contact ${action.payload.name} added`, {
        duration: 1500,
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#9aec3d4d',
          border: '1px solid #333',
          color: '#000',
        },
      });
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
      toast.success(`Contact ${action.payload.name} deleted`, {
        duration: 1500,
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#9aec3d4d',
          border: '1px solid #333',
          color: '#000',
        },
      });
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload.msg;
      toast.error(`${action.payload.msg}`);
    },
  },
});
