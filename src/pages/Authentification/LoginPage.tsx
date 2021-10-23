import { IonHeader, useIonRouter, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonPage, IonIcon, IonRouterLink, IonCard } from '@ionic/react';
import { helpOutline, logoGoogle, logoGooglePlaystore, mail, mailOutline, walk } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import Header from '../../components/Headers/Header';
import { toast } from '../../components/Toasts/Toast';
import { provider, useAuth } from '../../Contexts/authProvider';
import { firebaseAuth } from "../../initFirebase"
import { Heading3, Heading4, Heading5, LargeButton, MediumButton, MediumParagraph, RowContainer } from '../../theme/globalStyles';
import "./Auth.css"
const LoginPage: React.FC = () => {
    const history = useHistory()
    const [email, emailSet] = useState("");
    const [password, passwordSet] = useState("");
    const router = useIonRouter();
    const { setLoading } = useAuth()


    const doSignIn = async () => {
        try {
            
            const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
            // console.log(result)
            router.push("/tabs/habits", "forward", "replace")

        } catch (error: any) {
            toast(error.message)

        }
    }
    const googleSignIn = async () => {
        try {
            // const auth = new firebaseAuth.getAuth()
            const result = await firebaseAuth.signInWithRedirect(provider);
            console.log(result)


        } catch (error: any) {
            toast(error.message)

        }
    }

    const anonSignIn = async () => {
        try {
            setLoading(true);
            const result = await firebaseAuth.signInAnonymously();
            // console.log(result)
            router.push("/tabs/habits", "forward", "replace")



        } catch (error: any) {
            toast(error.message)

        }
    }

    // const {user} = useAuth();
    // if (user) {
    //     history.replace("/tabs")
    // }
    const gritHubLogo = useRef<HTMLDivElement>(null)
    useEffect(() => {
        // console.log("loaded", gritHubLogo)
        gritHubLogo.current?.classList.add("logo_snake_animate")
    }, [])

    return (
        <IonPage>
            <Header name="Log in"  />
            <IonContent fullscreen>
                <div className="page-wrapper ion-padding-horizontal" style={{ alignItems: 'center' }}>


                    <div className="page-wrapper-content ">

                        <IonButton fill="outline" style={{"--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px", "--border-color": "#4c8bf5", "--color": "#fff", }} className="ion-margin-top" size="large" expand="block" onClick={googleSignIn}>
                            <IonIcon className="ion-padding-horizontal" icon={logoGoogle} style={{  "color": "#4c8bf5" }}/>
                            <MediumButton style={{ textTransform: "initial", "color": "#4c8bf5" }}>
                                Sign in with Google
                            </MediumButton>
                        </IonButton>
                        <IonButton color="primary" fill="solid" style={{"--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px", "--color": "#fff", }} className="ion-margin-top" size="large" expand="block" >
                            <IonIcon className="ion-padding-horizontal" icon={mail}  style={{  "color": "#fff" }}/>
                            <MediumButton style={{ textTransform: "initial", "color": "#fff" }}>
                            Log in with email
                            </MediumButton>
                        </IonButton>
                        <IonButton style={{"--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" onClick={anonSignIn} fill="outline">
                            <IonIcon className="ion-padding-horizontal" icon={walk} />
                            <MediumButton style={{ textTransform: "initial" }}>

                                Skip login
                            </MediumButton>
                        </IonButton>
                        <Heading4 style={{ textAlign: 'center', margin: "1em auto" }}>OR </Heading4>
                        <Heading5>Log in with email </Heading5>

                        <IonCard >

                            <IonItem color="">
                                <IonLabel position="stacked">
                                    Email
                                </IonLabel>
                                <IonInput
                                    type="email"
                                    required={true}
                                    placeholder="Email"
                                    value={email}
                                    onInput={(e: any) => emailSet(e.target.value)}

                                />
                            </IonItem>
                            <IonItem color="">
                                <IonLabel position="stacked">Password</IonLabel>
                                <IonInput
                                    type="password"
                                    required={true}
                                    placeholder="Password"
                                    value={password}
                                    onInput={(e: any) => passwordSet(e.target.value)}

                                />
                            </IonItem>
                            <div style={{ justifyContent: "center", display: "flex", paddingTop: 8 }}>
                                <IonButton className="ion-margin-top" size="large"  expand="block" onClick={doSignIn}>
                                    <LargeButton>
                                    Login
                                    </LargeButton>
                                </IonButton>
                            </div>
                            <MediumParagraph style={{ margin: "0.5em auto", textAlign: "center" }} >

                                {"Don't have an account ? "}
                                <IonRouterLink
                                    routerLink="/create-account"
                                    style={{ textDecoration: "underline", color: "var(--ion-color-primary)" }}
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
