import { useState } from 'react';
import styled from 'styled-components';
import { Row } from 'styles/components';

interface IAvatarProps {
  picture: string;
  name: string;
}

const Avatar = ({ picture, name }: IAvatarProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(picture);

  return (
    <ImageWrapper $justifyContent="center">
      {name[0].toUpperCase()}

      {imageSrc && (
        <StyledImage
          src={picture}
          alt="Avatar"
          width={40}
          height={40}
          onError={() => {
            setImageSrc(null);
          }}
        />
      )}
    </ImageWrapper>
  );
};

export default Avatar;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  objectfit: contain;
`;

const ImageWrapper = styled(Row)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #9da1ff;
  color: white;
  position: relative;
  overflow: hidden;
`;
