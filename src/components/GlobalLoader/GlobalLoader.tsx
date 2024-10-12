import styled, { keyframes } from 'styled-components';
import useStore from 'store';

const GlobalLoader = () => {
  const { isLoading } = useStore();

  return (
    <Container $isLoading={isLoading}>
      <Loader />
    </Container>
  );
};

export default GlobalLoader;

const wave = keyframes`
  to {
    background-position: -200% 0,-100% 100%
  }
`;

const Container = styled.div<{ $isLoading: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  transition:
    visibility 0.3s,
    opacity 0.3s;
  visibility: ${({ $isLoading }) => ($isLoading ? 'visible' : 'hidden')};
  opacity: ${({ $isLoading }) => ($isLoading ? '1' : '0')};
  z-index: 1000;
`;

const Loader = styled.div`
  display: inline-grid;
  padding: 5px;
  background: #fff;
  filter: blur(4px) contrast(12);

  &:before {
    content: '';
    height: 40px;
    aspect-ratio: 3;
    --c: #0000 64%, #000 66% 98%, #0000 101%;
    background:
      radial-gradient(35% 146% at 50% 159%, var(--c)) 0 0,
      radial-gradient(35% 146% at 50% -59%, var(--c)) 100% 100%;
    background-size: calc(200% / 3) 50%;
    background-repeat: repeat-x;
    -webkit-mask: repeating-linear-gradient(90deg, #000 0 10%, #0000 0 20%);
    animation: ${wave} 0.8s infinite linear;
  }
`;
