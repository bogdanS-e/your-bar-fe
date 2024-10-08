import { useRouter } from 'next/router';
import styled from 'styled-components';

const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()}>
      <Icon>
        <svg
          fill="#686868"
          height="200px"
          width="200px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 330 330"
          stroke="#686868"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              id="XMLID_92_"
              d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001 l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996 C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"
            ></path>{' '}
          </g>
        </svg>
      </Icon>
      Go Back
    </Button>
  );
};

export default GoBackButton;

const Icon = styled.span`
  width: 20px;
  height: 20px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Button = styled.button`
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  font-size: 1.125rem;
  font-family: inherit;
  color: #686868;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.75;
  }
`;
