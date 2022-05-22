import { IonIcon, IonItem, IonPage, IonToggle } from '@ionic/react'
import React, { useRef } from 'react'
import Content from '../../components/Content/Content'
import Header from '../../components/Headers/Header'
import { MediumParagraph } from '../../theme/globalStyles'
import notifications from "../../components/LocalNotifications/LocalNotifications";
import { cafeOutline } from 'ionicons/icons'

const Notifications = () => {
    const morningToggle = useRef<HTMLIonToggleElement>(null);
    const isScheduled = false;
    // const afternoonToggle = useRef<HTMLIonToggleElement>(null);
    const handleNotification = (willSchedule: boolean) => {
        console.log("Showing notifications for morning", willSchedule);
        if (willSchedule) {
            notifications.testSchedule();
            // notifications.isAccessGranted()
        }
    }
    return (
        <IonPage>
            <Header name="Notifications" withBackButton backButtonLink='/tabs/settings' />
            <Content>
                <IonItem color="light" lines="none">
                    <IonIcon slot="start" icon={cafeOutline}></IonIcon>
                    <MediumParagraph>Morning motivation</MediumParagraph>
                    <IonToggle
                        ref={morningToggle}
                        mode="ios"
                        checked={isScheduled}
                        id="themeToggle"
                        slot="end"
                        onIonChange={(e) => handleNotification(e.detail.checked)}
                    />
                </IonItem>
                <IonItem button color="light" lines="none" onClick={() => notifications.requestAccess()}>
                    Request permission to send notifications
                </IonItem>
            </Content>
        </IonPage>
    )
}

export default Notifications