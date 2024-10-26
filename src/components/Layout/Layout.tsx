import { ReactNode, useEffect, useState } from 'react';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import styled from 'styled-components';
import SearchBar from 'components/SearchBar';
import GlobalLoader from 'components/GlobalLoader';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useIngredients } from 'components/Ingredient';
import useCocktails from 'components/Cocktail/CocktailsPage/useCocktails';
import { Row } from 'styles/components';
import AuthHandler from 'components/AuthHandler';
import useStore from 'store';
import { DownMd, UpMd } from 'styles/media';
import Sidebar from './Sidebar';
import IconButton from 'components/IconButton';

interface ILayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
  weight: ['300', '400', '700'],
  subsets: ['latin', 'cyrillic'],
});

const Layout = ({ children }: ILayoutProps) => {
  const { stopLoading, openSidebar } = useStore();
  const [searchValue, setSearchValue] = useState('');

  // prepare global data
  const query1 = useIngredients();
  const query2 = useCocktails();

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (query1.isError || query2.isError) {
      throw new Error('Global error! Cannot extract data');
    }

    if (query1.data && query2.data) {
      stopLoading();
    }
  }, [query1.isError, query2.isError, query1.data, query2.data, stopLoading]);

  return (
    <>
      <Page>
        <Sidebar />
        <Main>
          <Row $justifyContent="space-between" $gap="20px">
            <DownMd>
              <IconButton onClick={openSidebar}>open</IconButton>
            </DownMd>
            <SearchBar value={searchValue} onChange={handleSearchChange} />
            <UpMd>
              <AuthHandler />
            </UpMd>
          </Row>
          {children}
        </Main>
        <div id="modal-root" />
      </Page>
      <GlobalLoader />
      <ToastContainer position="bottom-center" hideProgressBar />
    </>
  );
};

export default Layout;

const Main = styled.main`
  max-width: 1700px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  padding: 15px 25px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 10px;
  }
`;

const Page = styled.div`
  display: flex;
  padding: 20px 20px 20px 0;
  min-height: 100dvh;
  ${roboto.style};

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 15px;
  }
`;
