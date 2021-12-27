import { IonButton } from '@ionic/react'
import React from 'react'
import { MediumButton } from '../../theme/globalStyles'



export interface ButtonProps {
    label?: string;
    size?: "default" | "large" | "small" ;
    fill?: "clear" | "outline" | "solid";
    color?: "primary" | "secondary" | "medium" | "tertiary"; // TODO: add the rest
    routerLink?: string | undefined;
    onClick?: (event: Event) => void;
}


const Button: React.FC<ButtonProps> = ({ label, fill, routerLink, color, onClick }) => {
    return (<IonButton routerLink={routerLink} style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill={fill} color={color}>
        <MediumButton>
            {label}
        </MediumButton>
    </IonButton>)
}




export { Button };