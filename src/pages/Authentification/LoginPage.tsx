import { IonHeader, useIonRouter, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonPage, IonIcon, IonRouterLink, IonCard, useIonModal } from '@ionic/react';
import { helpOutline, logoGoogle, logoGooglePlaystore, mail, mailOutline, walk } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'react-lottie';
import { useHistory } from 'react-router';
import Content from '../../components/Content/Content';
import Header from '../../components/Headers/Header';
import { toast } from '../../components/Toasts/Toast';
import { provider, useAuth } from '../../Contexts/authProvider';
import { firebaseAuth } from "../../initFirebase"
import { ColumnContainer, Heading3, Heading4, Heading5, Heading6, LargeButton, LargeParagraph, MediumButton, MediumParagraph, RowContainer, SmallParagraph } from '../../theme/globalStyles';
import "./Auth.css";
import dataAnimation from "./sync_data.json";

const dataOptions = { loop: true, animationData: dataAnimation, autoplay: true }

const LoginPage: React.FC = () => {
    const history = useHistory()
    const [email, emailSet] = useState("");
    const [password, passwordSet] = useState("");
    const router = useIonRouter();
    const { setLoading } = useAuth();
    // const [showEmailLogin, setShowEmailLogin] = useState(false);


    const pageRef = useRef<HTMLElement>()

    const doSignIn = async () => {
        try {
            const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
            dismissEmailLogin()
            router.push("/tabs/habits", "forward", "replace")
        } catch (error: any) {
            toast(error.message)
        }
    }
    const googleSignIn = async () => {
        try {
            // const auth = new firebaseAuth.getAuth()
            const result = await firebaseAuth.signInWithRedirect(provider);
            // console.log(result)
        } catch (error: any) {
            toast(error.message)

        }
    }

    const anonSignIn = async () => {
        try {
            setLoading(true);
            const result = await firebaseAuth.signInAnonymously();
        } catch (error: any) {
            toast(error.message)
        }
    }

    // const {user} = useAuth();
    // if (user) {
    //     history.replace("/tabs")
    // }
    // const gritHubLogo = useRef<HTMLDivElement>(null)
    // useEffect(() => {
    //     // console.log("loaded", gritHubLogo)
    //     gritHubLogo.current?.classList.add("logo_snake_animate")
    // }, [])

    const handleEmailLoginDismiss = () => {
        dismissEmailLogin();
    };
    const [presentEmailLogin, dismissEmailLogin] = useIonModal(EmailLoginModal, {
        handleEmailLoginDismiss: handleEmailLoginDismiss,
        email: email,
        emailSet: emailSet,
        password: password,
        passwordSet: passwordSet,
        doSignIn: doSignIn
    })
    return (
        <IonPage ref={pageRef}>
            <Header name="Authentification" />
            <Content>
                <div className="page-wrapper ion-padding-horizontal" style={{ alignItems: 'center' }}>


                    <div className="page-wrapper-content ">
                        <Lottie isClickToPauseDisabled={true} options={dataOptions} height={200} width={300} />
                        <Heading6 style={{textAlign: "center"}}>
                            Sign in and synchronize your data
                        </Heading6>
                        <SmallParagraph style={{textAlign: "center"}}>
                            So your data won't be lost when your device changes.
                        </SmallParagraph>
                        <div>
                            <IonButton color="primary" mode='ios' fill="outline" style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px", "--color": "#fff", }} className="ion-margin-top" size="large" expand="block" onClick={googleSignIn}>
                                <IonIcon className="ion-padding-horizontal" icon={logoGoogle} />
                                <MediumButton>
                                    Continue with Google
                                </MediumButton>
                            </IonButton>
                            <IonButton onClick={() => presentEmailLogin({
                                mode: "ios",
                                swipeToClose: true,
                                presentingElement: pageRef.current
                            })} color="primary" mode='ios' fill="outline" style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px", "--color": "#fff", }} className="ion-margin-top" size="large" expand="block" >
                                <IonIcon className="ion-padding-horizontal" icon={mail} />
                                <MediumButton >
                                    Continue with email
                                </MediumButton>
                            </IonButton>
                            <IonButton mode="ios" fill="solid" style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" onClick={anonSignIn} >
                                <IonIcon className="ion-padding-horizontal" icon={walk} />
                                <MediumButton>
                                    Continue without an account
                                </MediumButton>
                            </IonButton>
                        </div>
                        <SmallParagraph style={{ margin: "16px", textAlign: "center" }}>
                            {"By creating an account you agree to our "}
                            <IonRouterLink href="https://grithub.fr/privacy">
                                Privacy Policy
                            </IonRouterLink> {"and "}
                            <IonRouterLink href="https://grithub.fr/terms">
                                Terms of use
                            </IonRouterLink>
                        </SmallParagraph>
                        {/* <Heading4 style={{ textAlign: 'center', margin: "1em auto" }}>OR </Heading4> */}


                    </div>
                </div>
            </Content>
        </IonPage>
    )
}

export default LoginPage

const EmailLoginModal: React.FC<{
    email: string,
    password: string,
    emailSet: (email: string) => void,
    passwordSet: (password: string) => void,
    doSignIn: () => void,
}> = ({ email, emailSet, password, passwordSet, doSignIn }) => {
    return (
        <div
            className="page-wrapper ion-padding"
            style={{ alignItems: "center", width: "100%" }}
        >
            <div className="page-wrapper-content" style={{ textAlign: "center" }}>
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
                        <IonButton className="ion-margin-top" size="large" expand="block" onClick={doSignIn}>
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
    )
}