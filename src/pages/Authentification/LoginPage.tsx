import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonPage, IonIcon, IonRouterLink, IonCard } from '@ionic/react';
import { helpOutline, mailOutline } from 'ionicons/icons';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import Header from '../../components/Headers/Header';
import { toast } from '../../components/Toasts/Toast';
import { provider, useAuth } from '../../Contexts/authProvider';
import { firebaseAuth } from "../../initFirebase"
import { Heading5, MediumParagraph, RowContainer } from '../../theme/globalStyles';

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
    const googleSignIn = async () => {
        try {
            // const auth = new firebaseAuth.getAuth()
            const result = await firebaseAuth.signInWithRedirect(provider);
            console.log(result)


        } catch (error) {
            toast(error.message)

        }
    }

    // const {user} = useAuth();
    // if (user) {
    //     history.replace("/tabs")
    // }

    return (
        <IonPage>
            <Header name="" icon={helpOutline} />
            <IonContent fullscreen>
                <div className="page-wrapper ion-padding-horizontal">


                    <div className="page-wrapper-content ">
                        <Heading5>Log in with email </Heading5>
                        <IonCard>

                            <IonItem>
                                {/* <IonIcon icon={mailOutline}/> */}
                                <IonLabel position="fixed">
                                    Email 
                                </IonLabel>
                                <IonInput
                                    type="email"
                                    required={true}
                                    value={email}
                                    onInput={(e: any) => emailSet(e.target.value)}

                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="fixed">Password</IonLabel>
                                <IonInput
                                    type="password"
                                    required={true}

                                    value={password}
                                    onInput={(e: any) => passwordSet(e.target.value)}

                                />
                            </IonItem>
                            <div style={{ justifyContent: "center", display: "flex", paddingTop: 8 }}>
                                <IonButton className="ion-margin-top" expand="block" onClick={doSignIn}>Login</IonButton>
                                <IonButton className="ion-margin-top" expand="block" onClick={googleSignIn}>Sign in with Google</IonButton>
                            </div>
                            <MediumParagraph style={{ margin: "0.5em auto", textAlign: "center", color: "var(--ion-color-medium)" }} >

                                {"Don't have an account ? "}
                                <IonRouterLink
                                    routerLink="/create-account"
                                    style={{ textDecoration: "underline" }}
                                >
                                    {" Sign Up"}
                                </IonRouterLink>
                            </MediumParagraph>
                        </IonCard>

                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage
