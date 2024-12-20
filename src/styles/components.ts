import styled from 'styled-components';

type TFlexAlignment =
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline'
  | 'safe center'
  | 'unsafe center';

type TAlignItems = TFlexAlignment | 'normal' | 'first baseline' | 'last baseline';

type T$justifyContent =
  | TFlexAlignment
  | 'left'
  | 'right'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type TGap = string | 'normal';

type T$flexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

interface IFlexProps {
  $alignItems?: TAlignItems;
  $justifyContent?: T$justifyContent;
  $flexWrap?: T$flexWrap;
  $gap?: TGap;
  '$sm-gap'?: TGap;
  '$md-gap'?: TGap;
  $fullWidth?: boolean;
}

export const Row = styled.div<IFlexProps>`
  display: flex;
  align-items: ${({ $alignItems }) => $alignItems || 'center'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'flex-start'};
  flex-wrap: ${({ $flexWrap }) => $flexWrap || 'nowrap'};
  gap: ${({ $gap }) => $gap || '0'};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ theme }) => theme.breakpoints.down('md')} {
    gap: ${({ $gap, ...rest }) => rest['$md-gap'] || $gap || '0'};
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: ${({ $gap, ...rest }) => rest['$sm-gap'] || rest['$md-gap'] || $gap || '0'};
  }
`;

export const Column = styled(Row)`
  flex-direction: column;
`;

export const ImageCircle = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: #fff;
  flex-shrink: 0;

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 60px;
    height: 60px;
  }
`;
