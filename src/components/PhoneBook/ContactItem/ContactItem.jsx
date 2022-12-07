import { ContactNumber, DeleteBtn } from './ContactItem.styled';
import { AiOutlineUserDelete } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsOperations';

export const Item = ({ name, phone, id }) => {
  const dispatch = useDispatch();

  return (
    <>
      {name}: <ContactNumber>{phone}</ContactNumber>
      <DeleteBtn type="button" onClick={() => dispatch(deleteContact(id))}>
        <AiOutlineUserDelete />
        Delete
      </DeleteBtn>
    </>
  );
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
