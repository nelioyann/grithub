import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton, IonTitle, IonItem } from '@ionic/react'
import React from 'react'
import Content from '../../components/Content/Content'
import { LargeButton, ColumnContainer, MediumParagraph, Heading4, LargeParagraph } from '../../theme/globalStyles'

const Attributions: React.FC = () => {
    return (
        <IonPage >
            <IonHeader mode="ios" className="ion-padding-vertical ion-no-border">
                <IonToolbar color="light" >
                    <IonButtons slot="">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>
                    <IonTitle slot="">
                        <Heading4 style={{ color: "var(--ion-color-dark)", textAlign: "center", margin: "auto" }}>Attributions</Heading4>

                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <Content>

                <div className="page-wrapper ion-padding-horizontal" >

                    <div className="page-wrapper-content">
                        <IonItem color="light">
                            <LargeParagraph>Illustrations: absurd.design</LargeParagraph>
                        </IonItem>
                        <IonItem color="light">
                            <LargeParagraph>Animations from LottieFiles</LargeParagraph>
                        </IonItem>
                        <IonItem color="light">
                            <LargeParagraph>User Icons generated with the Boring Avatars library</LargeParagraph>
                        </IonItem>
                        <IonItem color="light">
                            <LargeParagraph>Emoji Picker React</LargeParagraph>
                        </IonItem>
                        <IonItem color="light">
                            <LargeParagraph>Voice Assistant: Alan AI</LargeParagraph>
                        </IonItem>
                    </div>
                </div>
            </Content>
        </IonPage>
    )
}

export default Attributions
