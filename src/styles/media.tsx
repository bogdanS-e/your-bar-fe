import { ReactNode } from 'react';
import { useTheme } from 'styled-components';
import useMediaQuery from '../hooks/useMediaQuery';

interface IMediaProps {
  children: ReactNode;
}

export const UpMd = ({ children }: IMediaProps) => {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  if (!isUpMd) {
    return null;
  }

  return children;
};

export const DownMd = ({ children }: IMediaProps) => {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

  if (!isDownMd) {
    return null;
  }

  return children;
};
