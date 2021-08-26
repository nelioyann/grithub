import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from '../../components/Toasts/Toast';
import {NameContext} from '../../Contexts/NameContext';
import { firebaseAuth, firebaseStore } from '../../initFirebase';

const CreateAccountPage = () => {
  const history = useHistory()
  const [email, emailSet] = useState("");
  const [password, passwordSet] = useState("");
  const { name, nameSet } = useContext(NameContext);


  const doSignIn = async () => {
    try {

      const cred = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      if(cred){
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
      <IonHeader>
        <IonToolbar >
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email Address</IonLabel>
          <IonInput
            type="email"
            value={email}
            onInput={(e: any) => emailSet(e.target.value)}

          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onInput={(e: any) => passwordSet(e.target.value)}

          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            type="text"
            value={name}
            onInput={(e: any) => nameSet(e.target.value)}

          />
        </IonItem>
        <div
          style={{ justifyContent: "center", display: "flex", paddingTop: 8 }}
        >
          <IonButton onClick={doSignIn}>Create Account</IonButton>
          <IonButton
            routerLink="/login"
            fill="outline"
          >
            Login Page
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default CreateAccountPage
