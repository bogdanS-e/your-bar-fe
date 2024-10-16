import React, { useEffect, useId, useState } from 'react';
import styled, { css } from 'styled-components';
import IconButton from 'components/IconButton';
import { useToggle } from 'hooks';
import { urlToFile } from 'utils/common';

interface ImageInputProps {
  label?: string;
  initialImage?: string;
  onImageChange: (file: File | null) => void;
}

const isValidImageFile = (file: File | null): boolean => {
  return file?.type.startsWith('image/') ?? false;
};

const ImageInput = ({ label = 'Add image', initialImage, onImageChange }: ImageInputProps) => {
  const inputId = useId();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragOver, isDragOverHandler] = useToggle(false);
  const [isLoading, isLoadingHandler] = useToggle(false);

  useEffect(() => {
    if (!initialImage) {
      return;
    }

    urlToFile(initialImage).then(handleImageChange);
  }, [initialImage]);

  const handleImageChange = (file: File | null) => {
    if (file) {
      if (!isValidImageFile(file)) {
        alert('Invalid file');

        return;
      }

      isLoadingHandler.on();
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        isLoadingHandler.off();
      };

      reader.readAsDataURL(file);
      onImageChange(file);

      return;
    }

    setImageUrl(null);
    isLoadingHandler.off();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleImageChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    isDragOverHandler.on();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    isDragOverHandler.off();

    const file = e.dataTransfer.files?.[0] || null;

    handleImageChange(file);
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    onImageChange(null);
  };

  return (
    <InputContainer>
      <ImagePreviewContainer>
        <ImagePreview
          $imageUrl={imageUrl || ''}
          htmlFor={inputId}
          $isDragOver={isDragOver}
          $isLoading={isLoading}
          onDragOver={handleDragOver}
          onDragLeave={isDragOverHandler.off}
          onDrop={handleDrop}
        >
          {!imageUrl && label}
        </ImagePreview>
        {imageUrl && (
          <RemoveIcon size={20} onClick={handleRemoveImage}>
            x
          </RemoveIcon>
        )}
      </ImagePreviewContainer>
      <StyledInput id={inputId} type="file" accept="image/*" onChange={handleFileInputChange} />
    </InputContainer>
  );
};

export default ImageInput;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  width: 110px;
  aspect-ratio: 1 / 1;
`;

const ImagePreview = styled.label<{
  $imageUrl: string;
  $isDragOver: boolean;
  $isLoading: boolean;
}>`
  width: 100%;
  height: 100%;
  background: #f0f0f0 url(${({ $imageUrl }) => $imageUrl}) no-repeat center;
  background-size: contain;
  border-radius: 10px;
  border: ${({ $isDragOver }) => ($isDragOver ? '2px solid #3f51b5' : '2px dashed #ccc')};
  color: ${({ $isDragOver }) => ($isDragOver ? '#3f51b5' : '#aaa')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  transition:
    border-color 0.3s ease,
    color 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #3f51b5;
  }

  ${({ $imageUrl }) =>
    $imageUrl &&
    css`
      border: none;
      color: transparent;
    `}

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.15s;
    opacity: ${({ $isLoading }) => ($isLoading ? '0.5' : '0')};
  }
`;

const RemoveIcon = styled(IconButton)`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #ffffff;
  transition: background 0.3s ease;

  &:hover {
    background: #ffcccc;
  }
`;

const StyledInput = styled.input`
  display: none;
`;
