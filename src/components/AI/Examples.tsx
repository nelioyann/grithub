import { IonChip, IonIcon, IonItem, IonLabel, useIonModal } from '@ionic/react';
import { calendar, checkmarkOutline, layers, moon, reader } from 'ionicons/icons';
import React from 'react'
import Lottie from "react-lottie";
import aiAnimation from "./Animations/ai.json"


const aiOptions = { loop: true, animationData: aiAnimation, autoplay: true }


const Examples = () => {
    return (
        <div className="page-wrapper ion-padding" style={{ alignItems: 'center', width: '100%', minHeight: "auto"}}>

            <div className="page-wrapper-content">
            <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        height: "5px",
                        width: "80px",
                        backgroundColor: "var(--ion-color-dark)",
                        margin: "1rem 0",
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                  </div>
              <IonChip>Say 'Hide examples' to hide this</IonChip>

            <Lottie isClickToPauseDisabled={true} options={aiOptions} height={200} width={300} />
            
            
              <IonItem
                color="medium"
                lines="none"
                className="ion-margin"
                style={{"--border-radius"	: "5px"}}
              >
                <IonIcon slot="start" icon={calendar}></IonIcon>
                <IonLabel>Give me a summary</IonLabel>
              </IonItem>
            <IonItem
                color="medium"
                lines="none"
                className="ion-margin"
                style={{"--border-radius"	: "5px"}}
              >
                <IonIcon slot="start" icon={moon}></IonIcon>
                <IonLabel>Turn on dark mode</IonLabel>
              </IonItem>
           
            <IonItem
                color="medium"
                lines="none"
                className="ion-margin"
                style={{"--border-radius"	: "5px"}}
              >
                <IonIcon slot="start" icon={reader}></IonIcon>
                <IonLabel>Tell me what are my habits</IonLabel>
              </IonItem>
              <IonItem
                color="medium"
                lines="none"
                className="ion-margin"
                style={{"--border-radius"	: "5px"}}
              >
                <IonIcon slot="start" icon={layers}></IonIcon>
                <IonLabel>Go to first tab</IonLabel>
              </IonItem>
              <IonItem
                color="medium"
                lines="none"
                className="ion-margin"
                style={{"--border-radius"	: "5px"}}
              >
                <IonIcon slot="start" icon={checkmarkOutline}></IonIcon>
                <IonLabel>Check my first habit</IonLabel>
              </IonItem>
            </div>
        </div>
    )
}

export default Examples;
