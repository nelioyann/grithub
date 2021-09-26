import { useIonRouter, IonPage, IonContent, IonInput, IonItem, IonLabel, IonButton, IonBackButton, IonButtons, IonHeader, IonToolbar } from '@ionic/react'
import React, { useContext, useState } from 'react'
import { Heading4, LargeButton, ColumnContainer, MediumParagraph } from '../../theme/globalStyles'
import { NameContext } from '../../Contexts/NameContext';
import Avatar from "boring-avatars";
import { firebaseStore } from '../../initFirebase';
import { useAuth } from '../../Contexts/authProvider';



const Name: React.FC = () => {
    const router = useIonRouter();
    const { name, nameSet } = useContext(NameContext);
    // console.log(name)
    const { user } = useAuth();

    const [nameInput, nameInputSet] = useState<string>("")
    const handleChange = (e: any) => {
        nameInputSet(e.detail.value)
    }

    const handleSave = async (e: any) => {
        console.log("handleObjective", nameInput)
        nameSet(nameInput);

        let result = await firebaseStore.collection("users")
                .doc(user!.uid).set({username: nameInput}, { merge: true })
            console.log(result)
            
        router.push("/tabs/habits", "forward", "push");
    }
    return (
        <IonPage >
            <IonHeader mode="ios" className="ion-padding-vertical ion-no-border">
                <IonToolbar color="light" >
                    <IonButtons slot="">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >

                <div className="page-wrapper ion-padding-horizontal" style={{ alignItems: 'center' }}>

                    <div className="page-wrapper-content">
                        <ColumnContainer style={{ marginTop: "2em" }} >

                            <Heading4 style={{ marginTop: "auto" }}>
                                How should we refer to you ?
                            </Heading4>
                            <div style={{ borderRadius: "50%", margin: "1em auto", width: "max-content", overflow: "hidden" }}>

                                <Avatar
                                    size={100}
                                    name={nameInput !== "" ? nameInput : name}
                                    variant="beam"
                                    colors={["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"]}
                                />
                            </div>
                            <MediumParagraph>

                            {name}
                            </MediumParagraph>
                            {/* <div style={{ filter: "invert(0.5)" }}>

                                <Lottie isClickToPauseDisabled={true} options={characterOptions} height={230} width={300} />
                            </div> */}

                            <IonItem color="light">
                                <IonLabel position="floating">Preferred name</IonLabel>
                                <IonInput onIonChange={(e) => handleChange(e)} value={nameInput}></IonInput>
                            </IonItem>
                            <IonButton onClick={(e) => handleSave(e)} style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill="solid" color="dark">
                                {/* routerLink="/tabs/habits" */}
                                <LargeButton style={{ color: "var(--ion-color-light)" }}>

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
