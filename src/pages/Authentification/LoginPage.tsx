import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from '../../components/Toasts/Toast';
import {firebaseAuth} from "../../initFirebase"

const LoginPage: React.FC = () => {
    const history = useHistory()
    const [email, emailSet] = useState("");
    const [password, passwordSet] = useState("");
    const doSignIn = async () => {
        try{

            const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
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
                    <IonTitle>Login User</IonTitle>
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
                <div
                    style={{ justifyContent: "center", display: "flex", paddingTop: 8 }}
                >
                    <IonButton onClick={doSignIn}>Login</IonButton>
                    <IonButton
                        routerLink="/create-account"
                        fill="outline"
                    >
                        Create Account
                    </IonButton>
                </div>
            </IonContent>
        </>
    )
}

export default LoginPage
