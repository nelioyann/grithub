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
            

        


            <Heading5>Create an account </Heading5>
            <IonCard>

              <IonItem color="">
                <IonLabel position="stacked" >Email Address</IonLabel>
                <IonInput
                  type="email"
                  required={true}
                  placeholder="Enter your email address"
                  value={email}
                  onInput={(e: any) => emailSet(e.target.value)}
                />
              </IonItem>
              <IonItem color="">
                <IonLabel position="stacked" >Password</IonLabel>
                <IonInput
                  type="password"
                  required={true}
                  placeholder="Enter your password"
                  value={password}
                  onInput={(e: any) => passwordSet(e.target.value)}

                />
              </IonItem>
              <IonItem color="">
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
              <MediumParagraph style={{ margin: "0.5em auto", textAlign: "center"}}>{"Already have an account? "}

                <IonRouterLink
                  routerLink="/login"
                  style={{ textDecoration: "underline", color: "var(--ion-color-primary)" }}
                >
                  {"Log in"}
                </IonRouterLink>
              </MediumParagraph>
              <MediumParagraph style={{margin: "16px", textAlign: "center"}}>
                {"By creating an account you agree to our "}
                <IonRouterLink href="https://grithub.fr/terms">
                    Privacy Policy
                </IonRouterLink> {"and "}
                <IonRouterLink href="https://grithub.fr/terms">
                    Terms of use
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
