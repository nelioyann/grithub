import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { helpOutline } from 'ionicons/icons';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import Header from '../../components/Headers/Header';
import { toast } from '../../components/Toasts/Toast';
import { NameContext } from '../../Contexts/NameContext';
import { firebaseAuth, firebaseStore } from '../../initFirebase';
import { Heading5, MediumParagraph } from '../../theme/globalStyles';

const CreateAccountPage = () => {
  const history = useHistory()
  const [email, emailSet] = useState("");
  const [password, passwordSet] = useState("");
  const { name, nameSet } = useContext(NameContext);


  const doSignIn = async () => {
    try {

      const cred = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      if (cred) {
        firebaseStore.collection("users").doc(cred.user!.uid)
          .set({
            username: name
          })
        console.log(cred)
        history.replace("/tabs")

      }
    } catch (error) {
      toast(error.message)

    }
  }
  return (
    <IonPage>
      <Header name="" icon={helpOutline} />
      <IonContent className="ion-padding">
        <div className="page-wrapper ion-padding-horizontal">


          <div className="page-wrapper-content ">
            <Heading5>Create an account </Heading5>


            <IonItem>
              <IonLabel >Email Address</IonLabel>
              <IonInput
                type="email"
                required={true}

                value={email}
                onInput={(e: any) => emailSet(e.target.value)}

              />
            </IonItem>
            <IonItem>
              <IonLabel >Password</IonLabel>
              <IonInput
                type="password"
                required={true}

                value={password}
                onInput={(e: any) => passwordSet(e.target.value)}

              />
            </IonItem>
            <IonItem>
              <IonLabel >Username</IonLabel>
              <IonInput
                type="text"
                value={name}
                required={true}

                onInput={(e: any) => nameSet(e.target.value)}

              />
            </IonItem>
            <div
              style={{ justifyContent: "center", display: "flex", paddingTop: 8 }}
            >
              <IonButton onClick={doSignIn}>Create Account</IonButton>
              
            </div>
            <MediumParagraph style={{ margin: "0.5em auto", textAlign: "center", color: "var(--ion-color-primary)" }}>{"Already have an account? "}

              <IonRouterLink
                routerLink="/login"
                style={{ textDecoration: "underline", color:"var(--ion-color-tertiary)" }}
              >
                {"Log in"}
              </IonRouterLink>
            </MediumParagraph>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default CreateAccountPage
