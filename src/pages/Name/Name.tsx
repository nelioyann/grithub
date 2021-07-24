import { IonPage, IonContent, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react'
import React from 'react'
import { Heading2, LargeButton, ColumnContainer } from '../../theme/globalStyles'
import Lottie from "react-lottie";
import personnageAnimation from "./character.json"
import { text } from 'ionicons/icons';

const characterOptions = { loop: true, animationData: personnageAnimation, autoplay: true }


const Name: React.FC = () => {
    return (
        <IonPage >

            <IonContent fullscreen >

                <div className="page-wrapper ion-padding-horizontal">

                    <div className="page-wrapper-content">
                        <ColumnContainer style={{marginTop: "2em"}}>

                        <Heading2>
                            How should we refer to you ?
                        </Heading2>


                        <Lottie isClickToPauseDisabled={true} options={characterOptions} height={230} width={300} />

                        <IonItem color="light">
                            <IonLabel position="floating">Preferred name</IonLabel>
                            <IonInput value={""}></IonInput>
                        </IonItem>
                        <IonButton routerLink="/tabs/habits"  style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill="solid" color="primary">
                                <LargeButton>

                                    Save
                                </LargeButton>

                            </IonButton>


                        </ColumnContainer>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Name
