import { useIonRouter, IonPage, IonContent, IonInput, IonItem, IonLabel, IonButton, IonBackButton, IonButtons, IonHeader, IonToolbar, IonTitle } from '@ionic/react'
import React, { useContext, useState } from 'react'
import { Heading4, LargeButton, ColumnContainer, MediumParagraph } from '../../theme/globalStyles'
import { NameContext } from '../../Contexts/NameContext';
import Avatar from "boring-avatars";
import { firebaseStore } from '../../initFirebase';
import { useAuth } from '../../Contexts/authProvider';
import UserAvatar from '../../components/Avatar/Avatar';
import Content from '../../components/Content/Content';



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
            .doc(user!.uid).set({ username: nameInput }, { merge: true })
        console.log(result)

        router.push("/tabs/habits", "forward", "push");
    }
    return (
        <IonPage >
            <IonHeader mode="ios" className="ion-padding-vertical ion-no-border">
                <IonToolbar color="light" >
                    <IonButtons slot="">
                        <IonBackButton color="dark" text="" defaultHref="/settings" />
                    </IonButtons>
                    <IonTitle slot="">
                        <Heading4 style={{ color: "var(--ion-color-primary)", margin: "auto", textAlign: "center" }}>Username</Heading4>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <Content>

                <div className="page-wrapper ion-padding-horizontal" style={{ alignItems: 'center' }}>

                    <div className="page-wrapper-content">
                        <ColumnContainer style={{ margin: "4em 0" }} >

                            <UserAvatar username={name} size={100} />
                            <Heading4 style={{ marginTop: "auto" }}>
                                How should we refer to you ?
                            </Heading4>

                            <IonItem className="ion-margin-vertical">
                                <IonLabel position="floating">Preferred name</IonLabel>
                                <IonInput onIonChange={(e) => handleChange(e)} value={nameInput}></IonInput>
                            </IonItem>
                            <IonButton onClick={(e) => handleSave(e)} style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill="solid" color="primary">
                                {/* routerLink="/tabs/habits" */}
                                <LargeButton >

                                    Save
                                </LargeButton>

                            </IonButton>


                        </ColumnContainer>
                    </div>
                </div>
            </Content>
        </IonPage>
    )
}

export default Name
