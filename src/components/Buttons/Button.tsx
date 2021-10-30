import { IonButton } from '@ionic/react'
import React from 'react'
import { MediumButton } from '../../theme/globalStyles'



export interface ButtonProps {
    label?: string;
    fill?: "clear" | "outline" | "solid";
    routerLink?: string;
}


const Button: React.FC<ButtonProps> = ({ label, fill, routerLink }) => {
    return (<IonButton routerLink={routerLink} style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill={fill} color="primary">
        <MediumButton>
            {label}
        </MediumButton>
    </IonButton>)
}




export { Button };