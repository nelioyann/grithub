import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRouterLink, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { helpOutline, logoGoogle, walk } from 'ionicons/icons';
import React, { useContext, useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router';
import Header from '../../components/Headers/Header';
import { toast } from '../../components/Toasts/Toast';
import { provider, useAuth } from '../../Contexts/authProvider';
import { NameContext } from '../../Contexts/NameContext';
import { firebaseAuth, firebaseStore } from '../../initFirebase';
import { Heading4, Heading5, LargeButton, MediumParagraph } from '../../theme/globalStyles';

const CreateAccountPage = () => {
  const history = useHistory()
  const [email, emailSet] = useState("");
  const [password, passwordSet] = useState("");
  const { name, nameSet } = useContext(NameContext);
  const { setLoading } = useAuth()
  const router = useIonRouter();


  const doSignUp = async () => {
    try {

      const cred = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      if (cred) {
        firebaseStore.collection("users").doc(cred.user!.uid)
          .set({
            username: name
          })
        // console.log(cred)
        router.push("/tabs/habits", "forward", "replace")



      }
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
      // history.replace("/tabs/habits")


    } catch (error: any) {
      toast(error.message)

    }
  }

  const gritHubLogo = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // console.log("loaded", gritHubLogo)
    gritHubLogo.current?.classList.add("logo_snake_animate")
  }, [])
  return (
    <IonPage>
      {/* <Header name="" icon={helpOutline} /> */}
      <IonContent className="ion-padding">
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

                Sign up with Google
              </LargeButton>
            </IonButton>
            {/* <IonButton className="ion-margin-top" expand="block" fill="outline" onClick={anonSignIn}>
              <IonIcon className="ion-padding-horizontal" icon={walk} />
              <LargeButton style={{ textTransform: "initial" }}>

                Continue as a guest
              </LargeButton>
            </IonButton> */}
            <Heading4 style={{ textAlign: 'center', margin: "1em" }}>OR </Heading4>
            {/* <Heading5>Log in with email </Heading5> */}

            <Heading5>Create an account </Heading5>
            <IonCard>

            <IonItem color="medium">
              <IonLabel position="stacked" >Email Address</IonLabel>
              <IonInput
                type="email"
                required={true}
                placeholder="Enter your email address"
                value={email}
                onInput={(e: any) => emailSet(e.target.value)}
                
                />
            </IonItem>
            <IonItem color="medium">
              <IonLabel position="stacked" >Password</IonLabel>
              <IonInput
                type="password"
                required={true}
                placeholder="Enter your password"
                value={password}
                onInput={(e: any) => passwordSet(e.target.value)}
                
                />
            </IonItem>
            <IonItem color="medium">
              <IonLabel position="stacked" >Username</IonLabel>
              <IonInput
                type="text"
                value={name}
                required={true}
                placeholder="Enter your username"
                onInput={(e: any) => nameSet(e.target.value)}
                
                />
            </IonItem>
            <div
              style={{ justifyContent: "center", display: "flex", paddingTop: 8 }}
              >
              <IonButton onClick={doSignUp}>Create Account</IonButton>

            </div>
            <MediumParagraph style={{ margin: "0.5em auto", textAlign: "center", color: "var(--ion-color-primary)" }}>{"Already have an account? "}

              <IonRouterLink
                routerLink="/login"
                style={{ textDecoration: "underline", color: "var(--ion-color-tertiary)" }}
                >
                {"Log in"}
              </IonRouterLink>
            </MediumParagraph>
                </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default CreateAccountPage
