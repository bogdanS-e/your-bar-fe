import styled, { css, DefaultTheme, RuleSet } from 'styled-components';

interface TypographyProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline';
  align?: 'left' | 'center' | 'right' | 'justify';
}

const getVariantStyles = (
  variant: TypographyProps['variant'],
  theme: DefaultTheme
): RuleSet<object> => {
  switch (variant) {
    case 'h1':
      return css`
        font-size: 2.5rem;
        font-weight: 700;
      `;
    case 'h2':
      return css`
        font-size: 2rem;
        font-weight: 700;
      `;
    case 'h3':
      return css`
        font-size: 1.75rem;
        font-weight: 700;
      `;
    case 'h4':
      return css`
        font-size: 1.5rem;
        font-weight: 700;

        ${theme.breakpoints.down('md')} {
          font-size: 1.25rem;
        }
      `;
    case 'h5':
      return css`
        font-size: 1.25rem;
        font-weight: 700;

        ${theme.breakpoints.down('md')} {
          font-size: 1rem;
        }
      `;
    case 'h6':
      return css`
        font-size: 1rem;
        font-weight: 700;
      `;
    case 'subtitle1':
      return css`
        font-size: 1rem;
        font-weight: 400;

        ${theme.breakpoints.down('md')} {
          font-size: 0.875rem;
        }
      `;
    case 'subtitle2':
      return css`
        font-size: 0.875rem;
        font-weight: 400;

        ${theme.breakpoints.down('md')} {
          font-size: 0.75rem;
        }
      `;
    case 'body1':
      return css`
        font-size: 1rem;
        font-weight: 300;
      `;
    case 'body2':
      return css`
        font-size: 0.875rem;
        font-weight: 300;
      `;
    default:
      return css`
        font-size: 1rem;
        font-weight: 300;
      `;
  }
};

const variantStyles = {
  h1: `
    font-size: 2.5rem;
    font-weight: 700;
  `,
  h2: `
    font-size: 2rem;
    font-weight: 700;
  `,
  h3: `
    font-size: 1.75rem;
    font-weight: 700;

    
  `,
  h4: `
    font-size: 1.5rem;
    font-weight: 700;
  `,
  h5: `
    font-size: 1.25rem;
    font-weight: 700;
  `,
  h6: `
    font-size: 1rem;
    font-weight: 700;
  `,
  subtitle1: `
    font-size: 1rem;
    font-weight: 400;
  `,
  subtitle2: `
    font-size: 0.875rem;
    font-weight: 400;
  `,
  body1: `
    font-size: 1rem;
    font-weight: 300;
  `,
  body2: `
    font-size: 0.875rem;
    font-weight: 300;
  `,
  caption: `
    font-size: 0.75rem;
    font-weight: 300;
  `,
  overline: `
    font-size: 0.625rem;
    font-weight: 300;
    text-transform: uppercase;
  `,
};

const Typography = styled.span<TypographyProps>`
  text-align: ${({ align }) => align || 'left'};

  ${({ variant = 'body1', theme }) => getVariantStyles(variant, theme)}
`;

export default Typography;
