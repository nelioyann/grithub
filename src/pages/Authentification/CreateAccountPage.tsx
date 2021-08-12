import { IonButton, IonContent,  IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from '../../components/Toasts/Toast';
import { firebaseAuth } from '../../initFirebase';

const CreateAccountPage = () => {
    const history = useHistory() 
    const [email, emailSet] = useState("");
    const [password, passwordSet] = useState("");

    const doSignIn = async () => {
        try{

            const result = await firebaseAuth.createUserWithEmailAndPassword(email, password);
            console.log(result)
            history.replace("/tabs")
        } catch (error){
            toast(error.message)

        }
    }
    return (
        <>
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
            onInput={(e:any) => emailSet(e.target.value)}
           
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onInput={(e:any) => passwordSet(e.target.value)}
           
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
    </>
    )
}

export default CreateAccountPage
