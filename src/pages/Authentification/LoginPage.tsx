import { IonHeader, useIonRouter, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonPage, IonIcon, IonRouterLink, IonCard } from '@ionic/react';
import { helpOutline, logoGoogle, logoGooglePlaystore, mailOutline, walk } from 'ionicons/icons';
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
            {/* <Header name="" icon={helpOutline} /> */}
            <IonContent fullscreen>
                <div className="page-wrapper ion-padding-horizontal" style={{ alignItems: 'center' }}>


                    <div className="page-wrapper-content ">
                        <div ref={gritHubLogo} className="logo_wrapper logo_snake_animate" style={{ display: 'grid', placeItems: "center" }}>
                            <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M72.5 112.5H35V38H114V56H58V94H86.5V112.5H114V75H91.5" stroke="#FF8700" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>


                            <Heading4 style={{ textAlign: 'center' }}>Grithub</Heading4>
                            <MediumParagraph>Build habits that stick</MediumParagraph>
                        </div>
                        <IonButton className="ion-margin-top" expand="block" onClick={googleSignIn}>
                            <IonIcon className="ion-padding-horizontal" icon={logoGoogle} />
                            <LargeButton style={{ color: 'var(--ion-color-medium)', textTransform: "initial" }}>

                                Sign in with Google
                            </LargeButton>
                        </IonButton>
                        <IonButton className="ion-margin-top" expand="block" fill="outline" onClick={anonSignIn}>
                            <IonIcon className="ion-padding-horizontal" icon={walk} />
                            <LargeButton style={{ textTransform: "initial" }}>

                                Try without an account
                            </LargeButton>
                        </IonButton>
                        <Heading4 style={{ textAlign: 'center', margin: "1em auto" }}>OR </Heading4>
                        <Heading5>Log in with email </Heading5>

                        <IonCard color="light" className="">

                            <IonItem color="medium">
                                {/* <IonIcon icon={mailOutline}/> */}
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
                            <IonItem color="medium">
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
                                <IonButton className="ion-margin-top" expand="block" onClick={doSignIn}>Login</IonButton>
                            </div>
                            <MediumParagraph style={{ margin: "0.5em auto", textAlign: "center", color: "var(--ion-color-primary)" }} >

                                {"Don't have an account ? "}
                                <IonRouterLink
                                    routerLink="/create-account"
                                    style={{ textDecoration: "underline", color: "var(--ion-color-tertiary)" }}
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
