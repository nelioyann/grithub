import { IonPage, IonContent, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react'
import { settingsOutline } from 'ionicons/icons'
import React from 'react'
import Header from '../../components/Headers/Header'
import { Heading2, Heading4, Heading5 } from '../../theme/globalStyles'

const Settings = () => {
    return (
        <IonPage >
            <IonHeader>
                <IonToolbar  >
                    <IonButtons slot="start">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>
                    <IonTitle>
                        <Heading4 style={{ color: "var(--ion-color-primary)", textAlign: "left" }}>Settings</Heading4>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                {/* <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" /> */}
                <div className="page-wrapper ion-padding-horizontal">

                    <div className="page-wrapper-content ">
                        <Heading2>
                            Settings
                        </Heading2>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Settings
