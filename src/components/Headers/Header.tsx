import React from "react";
import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
// import { home } from "ionicons/icons";
import { Heading3, Heading4, Heading6 } from "../../theme/globalStyles";
import { personCircle, search, ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";

interface HeaderProps {
    name: string;
    icon?: string;
    collapsible?: boolean;
    iconTarget?: string;
    withBackButton?: boolean;
    backButtonLink?: string;

}
// style={{backgroundColor: "var(--ion-color-light)"}}
const Header: React.FC<HeaderProps> = ({ name, icon, collapsible, iconTarget, withBackButton, backButtonLink = "tabs/habits" }) => {
    return (
        <IonHeader mode="ios" collapse={collapsible ? "condense" : undefined} style={{ paddingTop: "2em", paddingBottom: "2em" }}>
            <IonToolbar color="light"  >
                {withBackButton &&
                    <IonButtons slot="start">
                        <IonBackButton color="dark" text="" defaultHref={backButtonLink} />
                    </IonButtons>
                }
                {icon && (
                    <IonButtons slot="primary" collapse={true}>
                        <IonButton fill="clear" color="dark" routerLink={iconTarget}>
                            <IonIcon icon={icon} />
                        </IonButton>
                    </IonButtons>)
                }
                <IonTitle size={collapsible ? "large" : undefined}>
                    <Heading6 style={{ color: "var(--ion-color-primary)" }}>{name}</Heading6>
                </IonTitle>
            </IonToolbar>

        </IonHeader>
    );
};

export default Header;