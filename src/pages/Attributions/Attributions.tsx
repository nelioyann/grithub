import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton, IonTitle, IonItem } from '@ionic/react'
import React from 'react'
import { LargeButton, ColumnContainer, MediumParagraph, Heading4 } from '../../theme/globalStyles'

const Attributions: React.FC = () => {
    return (
        <IonPage >
            <IonHeader mode="ios" className="ion-padding-vertical ion-no-border">
                <IonToolbar color="light" >
                    <IonButtons slot="">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>
                    <IonTitle slot="">
                        <Heading4 style={{ color: "var(--ion-color-dark)", textAlign: "center" }}>Attributions</Heading4>

                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >

                <div className="page-wrapper ion-padding-horizontal" >

                    <div className="page-wrapper-content">
                        <IonItem color="light">
                            <MediumParagraph>Illustrations: absurd.design</MediumParagraph>
                        </IonItem>
                        <IonItem color="light">
                            <MediumParagraph>Animations: LottieFiles</MediumParagraph>
                        </IonItem>
                        <IonItem color="light">
                            <MediumParagraph>User Icons: Boring Avatars</MediumParagraph>
                        </IonItem>
                        <IonItem color="light">
                            <MediumParagraph>Emoji Picker React</MediumParagraph>
                        </IonItem>
                        <IonItem color="light">
                            <MediumParagraph>Voice Assistant: Alan AI</MediumParagraph>
                        </IonItem>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Attributions
