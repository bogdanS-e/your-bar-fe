import styled from "styled-components";

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

type TAlignItems =
  | TFlexAlignment
  | 'normal'
  | 'first baseline'
  | 'last baseline';

type TJustifyContent =
  | TFlexAlignment
  | 'left'
  | 'right'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type TGap = string  | 'normal';

interface IFlexProps {
  alignItems?: TAlignItems;
  justifyContent?: TJustifyContent;
  gap?: TGap;
}

export const Row = styled.div<IFlexProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems || 'center'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  gap: ${({ gap }) => gap || '0'};
`;