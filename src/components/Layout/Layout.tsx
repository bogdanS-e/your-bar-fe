import { ReactNode, useEffect } from 'react';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import IconButton from 'components/IconButton';
import SearchBar from 'components/SearchBar';
import GlobalLoader from 'components/GlobalLoader';
import { useQueries } from '@tanstack/react-query';
import useGlobalStore from '../../globalStore';

interface ILayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
});

const Layout = ({ children }: ILayoutProps) => {
  const router = useRouter();
  const { stopLoading } = useGlobalStore();

  // prepare global data
  const [query1, query2] = useQueries({
    queries: [
      {
        queryKey: ['ingredients'],
        queryFn: async () => await fetch('https://dummyjson.com/products'),
      },
      {
        queryKey: ['cooktails'],
        queryFn: async () => await fetch('https://dummyjson.com/products'),
      },
    ],
  });

  useEffect(() => {
    if (query1.isError || query2.isError) {
      throw new Error('Global error! Cannot extract data');
    }

    if (query1.data && query2.data) {
      stopLoading();
    }
  }, [query1.isError, query2.isError, query1.data, query2.data]);

  return (
    <>
      <Page>
        <Nav>
          <Link style={{ display: 'block' }} href="/">
            <StyledIconButton size={50} isActive={router.pathname === '/'}>
              <svg
                fill="#000000"
                height="200px"
                width="200px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <g>
                    {' '}
                    <g>
                      {' '}
                      <path d="M426.667,0c-43.844,0-80.038,33.248-84.774,75.852H9.482c-3.912,0-7.421,2.398-8.838,6.046 c-1.417,3.639-0.449,7.787,2.431,10.426l224.481,205.775v194.937H123.26V512h104.296h18.963h94.815v-18.963h-94.815V298.099 l146.636-134.419c10.602,4.551,21.826,6.986,33.512,6.986c47.051,0,85.333-38.278,85.333-85.333C512,38.278,473.718,0,426.667,0z M237.037,281.065L137.29,189.63h199.495L237.037,281.065z M357.471,170.667H116.604L33.857,94.815h406.361L357.471,170.667z M426.667,151.704c-6.089,0-12-0.898-17.732-2.486L471,92.324c2.88-2.639,3.847-6.787,2.431-10.426 c-1.417-3.648-4.926-6.046-8.838-6.046H361.053c4.625-32.106,32.243-56.889,65.613-56.889c36.597,0,66.37,29.778,66.37,66.37 C493.037,121.926,463.264,151.704,426.667,151.704z"></path>{' '}
                    </g>{' '}
                  </g>{' '}
                </g>
              </svg>
            </StyledIconButton>
          </Link>
          <Link style={{ display: 'block' }} href="/ingredients">
            <StyledIconButton
              size={50}
              isActive={router.pathname === '/ingredients'}
            >
              <svg
                fill="#000000"
                version="1.1"
                id="Warstwa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 160 160"
                enable-background="new 0 0 160 160"
                stroke="#000000"
                stroke-width="0.0016"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    id="lemon"
                    d="M146.176,80.415c-2.453-5.627-5.908-10.691-10.279-15.063c-4.578-4.579-9.926-8.156-15.893-10.63 C114.047,52.252,107.736,51,101.248,51s-12.799,1.252-18.757,3.721c-5.966,2.474-11.313,6.05-15.892,10.63 c-4.369,4.371-7.824,9.434-10.28,15.061l-0.595,0.547L31.932,57.173c-1.563-1.562-4.095-1.562-5.656,0 c-9.055,9.054-14.042,21.091-14.042,33.894c0,12.805,4.987,24.842,14.042,33.895c7.922,7.92,18.129,12.729,29.135,13.807 c0.271,0.059,0.549,0.092,0.837,0.092c0.058,0,0.111-0.016,0.168-0.018c1.245,0.096,2.497,0.158,3.758,0.158 c0.002,0,0.002,0,0.003,0c7.185,0,14.128-1.57,20.439-4.549c0.637,0.299,1.26,0.576,1.872,0.83 c5.949,2.468,12.261,3.719,18.759,3.719s12.81-1.251,18.758-3.719c5.964-2.475,11.312-6.053,15.894-10.635 c4.375-4.377,7.83-9.443,10.281-15.073l12.557-11.781c0.813-0.761,1.27-1.825,1.264-2.938c-0.006-1.112-0.475-2.172-1.293-2.924 L146.176,80.415z M21.019,99h10.229c2.209,0,4-1.791,4-4s-1.791-4-4-4H20.235c0.015-9.297,3.186-18.106,9.008-25.203l23.534,23.528 c0.001,0.001,0.002,0.003,0.003,0.003l32.66,32.65l0.013,0.013c-0.505,0.413-1.019,0.812-1.54,1.198 c-0.077,0.057-0.156,0.109-0.232,0.166c-0.449,0.328-0.904,0.647-1.365,0.957c-0.094,0.062-0.187,0.121-0.279,0.182 c-0.471,0.309-0.947,0.607-1.432,0.896c-0.064,0.039-0.129,0.077-0.194,0.115c-0.549,0.323-1.105,0.637-1.67,0.934 c-0.003,0.002-0.006,0.004-0.01,0.006c-5.634,2.962-11.934,4.541-18.479,4.553V120c0-2.209-1.791-4-4-4s-4,1.791-4,4v10.216 c-6.357-1.272-12.288-4.075-17.348-8.224l9.175-9.162c1.563-1.561,1.565-4.094,0.004-5.656c-1.562-1.564-4.094-1.566-5.657-0.004 l-9.179,9.166C25.094,111.279,22.293,105.354,21.019,99z M140.205,104.211c-0.457,0.396-0.826,0.9-1.068,1.484 c-2.063,4.981-5.058,9.455-8.895,13.295c-3.836,3.837-8.313,6.832-13.303,8.902c-4.972,2.063-10.252,3.106-15.691,3.106 c-4.124,0-8.156-0.603-12.031-1.789c0.105-0.08,0.203-0.17,0.307-0.251c0.617-0.479,1.226-0.977,1.822-1.489 c0.201-0.172,0.403-0.344,0.602-0.52c0.716-0.636,1.421-1.285,2.103-1.966c0.011-0.01,0.021-0.018,0.027-0.026 c0.264-0.265,0.471-0.567,0.647-0.888c0.33-0.592,0.523-1.252,0.523-1.94l0,0l0,0c0-0.149-0.027-0.297-0.044-0.444 c-0.013-0.113-0.013-0.229-0.034-0.34c-0.004-0.019-0.012-0.035-0.016-0.056c-0.161-0.747-0.529-1.44-1.078-1.988L61.387,86.621 l0.981-0.9c0.428-0.394,0.765-0.875,0.988-1.412c2.069-4.987,5.063-9.461,8.9-13.301c3.833-3.833,8.309-6.827,13.299-8.896 C90.536,60.047,95.816,59,101.248,59s10.712,1.047,15.691,3.111c4.992,2.07,9.467,5.063,13.299,8.896 c3.838,3.839,6.832,8.313,8.9,13.3c0.223,0.536,0.561,1.019,0.987,1.411l9.995,9.187L140.205,104.211z"
                  ></path>{' '}
                </g>
              </svg>
            </StyledIconButton>
          </Link>
        </Nav>
        <Main>
          <SearchBar />
          {children}
        </Main>
        <div id="modal-root" />
      </Page>
      <GlobalLoader />
    </>
  );
};

export default Layout;

const Nav = styled.nav`
  padding: 5px 25px;
  background-color: #dacdcd;
  border-radius: 0 10px 10px 0;
  margin-right: 25px;
`;

const StyledIconButton = styled(IconButton)<{ isActive: boolean }>`
  width: 50px;
  height: 50px;
  color: ${(props) => (props.isActive ? '#909022' : 'inherit')};
`;

const Main = styled.main`
  max-width: 1700px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  padding: 15px 25px;
  width: 100%;
`;

const Page = styled.div`
  display: flex;
  padding: 20px 20px 20px 0;
  min-height: 100dvh;
  ${roboto.style};
`;
