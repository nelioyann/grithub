import { IonPage, IonContent } from '@ionic/react'
import { settingsOutline } from 'ionicons/icons'
import React from 'react'
import Header from '../../components/Headers/Header'
import { Heading2, Heading5 } from '../../theme/globalStyles'

const Settings = () => {
    return (
        <IonPage >
            {/* <Header name="Habits" icon={settingsOutline} iconTarget="/onboarding" /> */}
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
