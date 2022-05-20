import { IonContent } from '@ionic/react';
import React from 'react';
import styled, { css } from "styled-components";
import { isPlatform } from '@ionic/react';

const PageContentWrapper = styled.div`

`


const StyledContent = styled(IonContent) <{ onDesktop: boolean }>`
    --background: var(--ion-color-light);
    ${PageContentWrapper}{
    padding-bottom: 5em;
    }
    ${({ onDesktop }) =>
        onDesktop &&
        css`
            &::part(scroll){
                overflow: hidden;
            }
    
    ${PageContentWrapper}{
        height: 100vh;
        overflow: auto;
        /* padding-top: 3em; */
        /* Reserves the scrollbar space to avoid visual shifts */
        scrollbar-gutter: stable;
        &::-webkit-scrollbar {
        width: 12px;
        }
        &::-webkit-scrollbar-track {
        background: var(--ion-color-light);
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        }

        &::-webkit-scrollbar-thumb {
        background: var(--ion-color-dark);
        box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
        border-radius: 5px;
        }
        

        
    }
        `
    }
    
`

const PageContentInner = styled.div`
    width: clamp(15em, 100%, 65em); //set on higher styled component
    margin: auto;
`

interface IContainer  {

}
const Content: React.FC<IContainer> = ({ children, ...props }) => {

    return (
        <StyledContent fullscreen onDesktop={isPlatform('desktop')}>
            <PageContentWrapper>
                <PageContentInner>
                    {children}
                </PageContentInner>
            </PageContentWrapper>
        </StyledContent>
    )
};

export default Content;
