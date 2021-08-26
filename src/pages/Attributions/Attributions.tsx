import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton, IonTitle, IonItem } from '@ionic/react'
import React from 'react'
import { LargeButton, ColumnContainer, MediumParagraph, Heading4 } from '../../theme/globalStyles'

const Attributions: React.FC = () => {
    return (
        <IonPage >
            <IonHeader  mode="ios" className="ion-padding-vertical ion-no-border">
                <IonToolbar color="light" >
                    <IonButtons slot="">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>
                    <IonTitle>
                    <Heading4 style={{ color: "var(--ion-color-dark)", textAlign: "left" }}>Attributions</Heading4>
                        
                        </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >

                <div className="page-wrapper ion-padding-horizontal" >

                    <div className="page-wrapper-content">
                        <IonItem color="light">
                            <MediumParagraph>Illustration from absurd.design</MediumParagraph>
                        </IonItem>
                        <IonItem color="light">
                            <MediumParagraph>Animations from LottieFiles</MediumParagraph>
                        </IonItem>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Attributions
