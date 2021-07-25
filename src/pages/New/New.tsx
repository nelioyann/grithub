import { IonPage, IonContent, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react'
import React from 'react'
import { ColumnContainer, Heading2, Heading3, Heading4, LargeButton } from '../../theme/globalStyles'

const New = () => {
    return (
        <IonPage >
            {/* <Header name="Habits" icon={settingsOutline} iconTarget="/onboarding" /> */}
            <IonHeader>
                <IonToolbar color="light" >
                    <IonButtons slot="start">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>
                    <IonTitle>
                        <Heading4 style={{ color: "var(--ion-color-primary)", textAlign: "left" }}>New habit</Heading4>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                {/* <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" /> */}
                <div className="page-wrapper ion-padding-horizontal">

                    <div className="page-wrapper-content ">
                        <ColumnContainer style={{marginTop: "0"}}>
                        <Heading3  style={{ color: "var(--ion-color-primary)", textAlign: "center" }}>
                            I want to
                        </Heading3>
                        <IonItem color="light">
                            <IonLabel position="floating">New habit</IonLabel>
                            <IonInput value={""}></IonInput>
                        </IonItem>
                        <Heading3  style={{ color: "var(--ion-color-primary)", textAlign: "center" }}>
                            Everyday
                        </Heading3>
                        <IonButton routerLink="/"  style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill="solid" color="primary">
                                <LargeButton>

                                    Create habit
                                </LargeButton>

                            </IonButton>
                        </ColumnContainer>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default New
