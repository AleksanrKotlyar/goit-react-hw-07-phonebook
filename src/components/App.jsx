import { PhoneBook } from './PhoneBook/PhoneBook';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <PhoneBook />
    </>
  );
};
