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
    const handleNotification = async (willSchedule: boolean) => {
        console.log("Showing notifications for morning", willSchedule);
        if (willSchedule) {
            await notifications.schedule();
            // notifications.isAccessGranted()
        }
    }
    return (
        <IonPage>
            <Header name="Notifications" withBackButton backButtonLink='/tabs/settings' />
            <Content>
                <div
                    className="page-wrapper ion-padding-horizontal"
                //   style={{ alignItems: "center"}}
                >
                    <div
                        className="page-wrapper-content"
                        style={{ position: "relative" }}
                    >
                        <IonItem color="light" lines="none">
                            <IonIcon slot="start" icon={cafeOutline}></IonIcon>
                            <MediumParagraph>Morning motivation</MediumParagraph>
                            <IonToggle
                                ref={morningToggle}
                                mode="ios"
                                checked={isScheduled}
                                disabled={true}
                                id="themeToggle"
                                slot="end"
                                onIonChange={(e) => handleNotification(e.detail.checked)}
                            />
                        </IonItem>
                        <p>This feature is currently in development</p>
                        
                    </div>
                </div>
            </Content>
        </IonPage>
    )
}

export default Notifications