import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Contact interface for type safety
interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
}

// Define the ContactsState interface to represent the state structure
interface ContactsState {
  contacts: Contact[];
}

// Set the initial state for the contacts slice
const initialState: ContactsState = {
  contacts: [],
};

// Create the contacts slice using createSlice from Redux Toolkit
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    /**
     * Add a new contact to the state.
     * @param state - The current state of the contacts slice.
     * @param action - The action containing the new contact to be added.
     */
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    /**
     * Edit an existing contact in the state.
     * @param state - The current state of the contacts slice.
     * @param action - The action containing the updated contact.
     */
    editContact(state, action: PayloadAction<Contact>) {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    /**
     * Delete a contact from the state.
     * @param state - The current state of the contacts slice.
     * @param action - The action containing the id of the contact to be deleted.
     */
    deleteContact(state, action: PayloadAction<string>) {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
  },
});

// Export the actions generated by createSlice
export const { addContact, editContact, deleteContact } = contactsSlice.actions;

// Export the reducer to be used in the store
export default contactsSlice.reducer;