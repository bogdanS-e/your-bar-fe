import { ReactNode, useEffect, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Roboto } from 'next/font/google';
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
import { ArrowRightIcon, BurgerIcon, SearchIcon } from 'components/Icons';
import { useToggle } from 'hooks';
import Multiselect from 'components/Multiselect';
import { useRouter } from 'next/router';
import { cocktailTagInfo } from 'types/cocktail';
import { ingredientTagInfo } from 'types/ingredient';

interface ILayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
  weight: ['300', '400', '700'],
  subsets: ['latin', 'cyrillic'],
});

const cocktailsFilter = Object.values(cocktailTagInfo);
const ingredientsFilter = Object.values(ingredientTagInfo);

const Layout = ({ children }: ILayoutProps) => {
  const router = useRouter();

  const { stopLoading, openSidebar } = useStore();
  const [searchValue, setSearchValue] = useState('');
  const [isSearchOpen, isSearchOpenHandler] = useToggle(false);

  const {
    selectedCocktailTags,
    selectedIngredientTags,
    setSelectedIngredientTags,
    setSelectedCocktailTags,
  } = useStore();

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
          <DownMd>
            <SwitchTransition>
              <CSSTransition
                key={isSearchOpen.toString()}
                timeout={300}
                classNames="fade-left"
                unmountOnExit
              >
                <Row $justifyContent="space-between" $gap="20px" $md-gap="10px">
                  {isSearchOpen ? (
                    <>
                      <CloseSearchButton size={40} onClick={isSearchOpenHandler.off}>
                        <ArrowRightIcon />
                      </CloseSearchButton>
                      <SearchBar value={searchValue} hideIcon onChange={handleSearchChange} />
                    </>
                  ) : (
                    <>
                      <TopBarIcon onClick={openSidebar} size={40}>
                        <BurgerIcon />
                      </TopBarIcon>

                      {router.pathname === '/ingredients' ? (
                        <Multiselect
                          key="ingredient"
                          options={ingredientsFilter}
                          selectedOptions={selectedIngredientTags}
                          onChange={setSelectedIngredientTags}
                        />
                      ) : (
                        <Multiselect
                          key="cocktail"
                          options={cocktailsFilter}
                          selectedOptions={selectedCocktailTags}
                          onChange={setSelectedCocktailTags}
                        />
                      )}

                      <SearchButton size={40} onClick={isSearchOpenHandler.on}>
                        <SearchIcon />
                      </SearchButton>
                    </>
                  )}
                </Row>
              </CSSTransition>
            </SwitchTransition>
          </DownMd>
          <Row $justifyContent="space-between" $gap="20px" $md-gap="10px">
            <UpMd>
              <SearchBar value={searchValue} onChange={handleSearchChange} />
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

const TopBarIcon = styled(IconButton)`
  padding: 5px;

  &:hover {
    background: white;
  }
`;

const SearchButton = styled(TopBarIcon)`
  color: transparent;
`;

const CloseSearchButton = styled(TopBarIcon)`
  padding: 6px;

  svg {
    transform: rotateY(180deg);
  }
`;

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
