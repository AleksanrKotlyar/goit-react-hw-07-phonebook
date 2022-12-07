import { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Box } from '../PhoneBook.styled';
import { SubmitBtn, LabelForm, InputForm } from './ContactForm.styled';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsOperations';
import { getContacts } from 'redux/selectors';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleOnInputChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      default:
        console.log('Invalid subscription type');
    }
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    const normalizeName = name.toLocaleLowerCase();
    const IsContactInList = contacts.find(
      contact => contact.name.toLocaleLowerCase() === normalizeName
    );
    IsContactInList
      ? alert(`${name} is already in contacts`)
      : dispatch(
          addContact({
            name: e.currentTarget.elements.name.value,
            phone: e.currentTarget.elements.phone.value,
          })
        );

    if (!IsContactInList) {
      setName('');
      setPhone('');
    }
  };

  return (
    <Box
      as="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      onSubmit={handleOnSubmit}
    >
      <LabelForm>
        Name
        <InputForm
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleOnInputChange}
        />
      </LabelForm>
      <LabelForm>
        Number
        <InputForm
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleOnInputChange}
        />
      </LabelForm>
      <SubmitBtn type="submit">
        <AiOutlineUserAdd /> Add contact
      </SubmitBtn>
    </Box>
  );
};

// ContactForm.propTypes = {
//   onSubmitForm: PropTypes.func.isRequired,
// };
