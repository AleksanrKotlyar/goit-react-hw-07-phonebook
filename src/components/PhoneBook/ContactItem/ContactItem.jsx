import { ContactNumber, DeleteBtn } from './ContactItem.styled';
import { AiOutlineUserDelete } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsOperations';
import { IsLoading } from 'redux/selectors';

export const Item = ({ name, phone, id }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(IsLoading);

  return (
    <>
      {name}: <ContactNumber>{phone}</ContactNumber>
      <DeleteBtn
        type="button"
        disabled={isLoading}
        onClick={() => dispatch(deleteContact(id))}
      >
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
