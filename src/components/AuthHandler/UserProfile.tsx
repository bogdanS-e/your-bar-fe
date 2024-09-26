import { useAuth0 } from '@auth0/auth0-react';
import Avatar from 'components/Avatar';
import Dropdown from 'components/Dropdown';
import styled from 'styled-components';
import { Column, Row } from 'styles/components';

const UserProfile = () => {
  const { user, isAuthenticated, logout } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  if (!user) {
    throw new Error('No user found');
  }

  const { name, email, picture, given_name } = user;
  console.log(user);

  return (
    <Row $gap="10px">
      <Column $alignItems="flex-end">
        <span>{name}</span>
        <Email>{email}</Email>
      </Column>
      <StyledDropdown
        trigger={
          <Avatar picture={picture || ''} name={name || given_name || 'U'} />
        }
        items={['logout']}
        position="left"
        renderItem={() => (
          <Row $gap="15px">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 1h8v2H4v18h6v2H2V1z" fill="currentColor"></path>
              <path
                d="M19.586 13H6v-2h13.586l-5.293-5.293 1.414-1.414 7 7a1 1 0 010 1.414l-7 7-1.414-1.414L19.586 13z"
                fill="currentColor"
              ></path>
            </svg>
            Log out
          </Row>
        )}
        onOptionClick={() => logout()}
      />
    </Row>
  );
};

export default UserProfile;
const StyledDropdown = styled(Dropdown)`
  .dropdown-menu {
    color: #686868;
  }
`;

const Email = styled.small`
  color: #686868;
  font-size: 0.875rem;
  line-height: 1;
`;
