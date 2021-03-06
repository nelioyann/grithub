import { useIonRouter, IonPage, IonContent, IonInput, IonItem, IonLabel, IonButton, IonBackButton, IonButtons, IonHeader, IonToolbar, IonTitle } from '@ionic/react'
import React, { useContext, useState } from 'react'
import { Heading4, LargeButton, ColumnContainer, MediumParagraph, Heading5, Heading6 } from '../../theme/globalStyles'
import { NameContext } from '../../Contexts/NameContext';
import Avatar from "boring-avatars";
import { firebaseStore } from '../../initFirebase';
import { useAuth } from '../../Contexts/authProvider';
import UserAvatar from '../../components/Avatar/Avatar';
import Content from '../../components/Content/Content';
import Header from '../../components/Headers/Header';



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

            <Header name="Username" withBackButton backButtonLink="tabs/settings"/>
            <Content>

                <div className="page-wrapper ion-padding-horizontal" style={{ alignItems: 'center' }}>

                    <div className="page-wrapper-content">
                        <ColumnContainer style={{ margin: "4em 0" }} >

                            <UserAvatar username={nameInput ?? name} email="Your avatar is generated from your username" size={100} />
                            <Heading6 style={{ marginTop: "auto" }}>
                                How should we refer to you ?
                            </Heading6>

                            <IonItem color='medium' className="ion-margin-vertical">
                                <IonLabel position="stacked">Preferred name</IonLabel>
                                <IonInput onIonChange={(e) => handleChange(e)} value={nameInput}></IonInput>
                            </IonItem>
                            <IonButton mode="ios" onClick={(e) => handleSave(e)} style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill="solid" color="primary">
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
