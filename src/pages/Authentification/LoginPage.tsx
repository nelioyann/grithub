import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonPage, IonIcon, IonRouterLink } from '@ionic/react';
import { helpOutline, mailOutline } from 'ionicons/icons';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import Header from '../../components/Headers/Header';
import { toast } from '../../components/Toasts/Toast';
import { firebaseAuth } from "../../initFirebase"
import { Heading5, RowContainer } from '../../theme/globalStyles';

const LoginPage: React.FC = () => {
    const history = useHistory()
    const [email, emailSet] = useState("");
    const [password, passwordSet] = useState("");
    const doSignIn = async () => {
        try {

            const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
            console.log(result)
            history.replace("/tabs")

        } catch (error) {
            toast(error.message)

        }
    }
    return (
        <IonPage>
            <Header name="" icon={helpOutline} />
            <IonContent fullscreen>
                <div className="page-wrapper ion-padding-horizontal">


                    <div className="page-wrapper-content ">
                        <Heading5>Log in with email </Heading5>

                        <IonItem>
                            {/* <IonIcon icon={mailOutline}/> */}
                            <IonLabel position="floating">
                                Email Address
                            </IonLabel>
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

                        >
                            <IonButton className="ion-margin-top" expand="block" onClick={doSignIn}>Login</IonButton>
                        </div>
                        <div className="ion-margin-top">

                            Don't have an account ?
                            <IonRouterLink
                                routerLink="/create-account"
                            >
                                {" Sign Up"}
                            </IonRouterLink>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage
