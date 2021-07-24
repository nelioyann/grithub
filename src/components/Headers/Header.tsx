import React from "react";
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
// import { home } from "ionicons/icons";
import { Heading3, Heading4 } from "../../theme/globalStyles";
import { personCircle, search, ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";

interface HeaderProps {
    name: string;
    icon: string;
    collapsible?: boolean;
    iconTarget?: string;


}
// style={{backgroundColor: "var(--ion-color-light)"}}
const Header: React.FC<HeaderProps> = ({ name, icon, collapsible, iconTarget }) => {
    return (
        <IonHeader   collapse={collapsible ? "condense" : undefined} className="ion-padding-horizontal ion-no-border">
            <IonToolbar   >
                <IonButtons slot="primary" collapse={true}>
                    <IonButton fill="clear" color="dark" routerLink={iconTarget}>
                        <IonIcon icon={icon} />
                    </IonButton>
                </IonButtons>
                <IonTitle  size={collapsible ? "large" : undefined}>
                    {collapsible ? <Heading3 style={{ color: "var(--ion-color-primary)" }} >{name}</Heading3> : <Heading4 style={{ color: "var(--ion-color-primary)" }}>{name}</Heading4>}
                </IonTitle>
            </IonToolbar>

        </IonHeader>
    );
};

export default Header;