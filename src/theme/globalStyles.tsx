import styled, { createGlobalStyle, css } from "styled-components";
import { ButtonProps } from "../components/Buttons/Button";


const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;  
}
`
export default GlobalStyle;

interface ColoredProps {
    color?: "primary" | "secondary" | "tertiary" | "medium" | "dark" | "light";
}

export const SmallParagraph = styled.p<ColoredProps>`
  font-size: var(--step--2);
  line-height: 150%;
  color: ${props => props.color ? `var(--ion-color-${props.color}` : `inherit`};
  /* --ionicon-stroke-width: 64px; */
  white-space: normal;
  font-weight: var(--font-regular);
`;
export const MediumParagraph = styled(SmallParagraph)`
  font-size: var(--step--1);
  font-weight: var(--font-regular);
`;
export const LargeParagraph = styled(MediumParagraph)`
  font-size: var(--step-0);
  line-height: 162%;
  font-weight: initial;
`;

export const ButtonText = styled.p<ButtonProps>`
    ${({ size }) =>
        size === "default" &&
        css`
            font-size: var(--step--1);
            font-weight: var(--font-bold);
            line-height: 18px;
        `
    }
    ${({ size }) =>
        size === "large" &&
        css`
            font-size: var(--step-0);
            min-width: 150px;
            font-weight: var(--font-bold);
            line-height: 122%;
        `
    }
`
export const MediumButton = styled(MediumParagraph)`
  font-size: var(--step--1);
  font-weight: var(--font-bold);
  line-height: 18px;
  `;
export const LargeButton = styled(MediumButton)`
  font-size: 1.125rem;
  min-width: 150px;
  font-weight: var(--step-0);
  line-height: 122%;
`;

export const Heading2 = styled.h2<ColoredProps>`
    font-weight: var(--font-bold);
    color: ${props => props.color ? `var(--ion-color-${props.color}` : `var(--ion-color-dark)`};
    font-size: var(--step-4);
    line-height: 115%;
    letter-spacing: -1px;
    white-space: normal;
`
export const Heading3 = styled.h3<ColoredProps>`
    font-weight: var(--font-bold);
    color: ${props => props.color ? `var(--ion-color-${props.color}` : `var(--ion-color-dark)`};
    font-size: var(--step-3);
    line-height: 130%;
    letter-spacing: -1px;
    white-space: normal;
`

export const Heading4 = styled.h4<ColoredProps>`
    font-weight: var(--font-regular);
    color: ${props => props.color ? `var(--ion-color-${props.color}` : `var(--ion-color-dark)`};
    padding: 0;
    margin: 0;
    /* margin: 2rem 0 1rem; */
    max-width: 40ch;
    white-space: normal;
    font-size: var(--step-2);
    line-height: 133%;
`
export const Heading5 = styled.h5<ColoredProps>`
    font-weight: var(--font-regular);
    color: ${props => props.color ? `var(--ion-color-${props.color}` : `var(--ion-color-dark)`};
    font-size: var(--step-1);
    line-height: 130%;
    white-space: normal;
`
export const Heading6 = styled.h6<ColoredProps>`
    font-weight: var(--font-regular);
    color: ${props => props.color ? `var(--ion-color-${props.color}` : `var(--ion-color-dark)`};
    font-size: var(--step-0);
    line-height: 130%;
    white-space: normal;
`



export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
`
export const RowContainer = styled.div`
    display: flex;
    align-items: center;
    /* flex-direction: column; */
`

export const HorizontalScroll = styled.div`
    overflow: auto;
    white-space: nowrap;
`


interface ModuleProps {
    unique?: boolean;
}

export const ModuleWrapper = styled.div<ModuleProps>`
    border: 2px solid var(--ion-color-medium);
    border-radius: 8px;
    width: ${props => props.unique ? "100%" : "90%"};
    margin: ${props => props.unique ? "auto" : "0 8px"};
    max-width: 500px;
    display: inline-block;
    cursor: pointer;

`



// :root{
//     --font-extrabold: 800;
//     --font-bold: 700;
//     --font-semibold: 700;
//     --font-regular: 400;
// }

// h1, h2, h3{
//     font-weight: var(--font-extrabold)!important;
// }
// h4, h5{
//     font-weight: var(--font-bold)!important;
// }

// .button-small, .button-medium, .button-large, .paragraph-small{
//     font-weight: var(--font-bold);
//     text-transform: none;
// }

// .paragraph-medium, .paragraph-large{
//     font-weight: var(--font-semibold)!important;

// }
// .button-small{
//     font-size: 0.75rem;
//     line-height: 150%;
// }
// .button-medium{
//     font-size: 0.875rem;
//     line-height: 150%;
// }
// .button-large{
//     font-size: 1rem ;
//     line-height: 162%;
// }

// .flex{
//     display: flex;
// }

// .paragraph-small{
//     font-size: 0.75rem;
//     line-height: 150%;
// }
// .paragraph-medium{
//     font-size: 0.875rem;
//     line-height: 150%;
// }
// .paragraph-large{
//     font-size: 1rem;
//     line-height: 162%;
// }
