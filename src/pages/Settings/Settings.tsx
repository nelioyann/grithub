import {
  IonPage,
  IonContent,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonItem,
  IonLabel,
  IonToggle,
  IonList,
  IonListHeader,
  IonNote,
  useIonRouter,
  IonButton,
} from "@ionic/react";
import { bug, moon, person, settingsOutline } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Headers/Header";
import { useAuth } from "../../Contexts/authProvider";
import { DarkModeContext } from "../../Contexts/DarkModeContext";
import {
  ColumnContainer,
  Heading2,
  Heading4,
  Heading5,
  MediumParagraph,
  SmallParagraph,
} from "../../theme/globalStyles";
import { NameContext } from "../../Contexts/NameContext";
import { firebaseStore } from "../../initFirebase";
import UserAvatar from "../../components/Avatar/Avatar";

const Settings: React.FC = () => {
  const router = useIonRouter();
  const { user, logout, setLoading } = useAuth();

  const { darkMode } = useContext(DarkModeContext);

  // console.log(darkMode)
  // Query for the toggle that is used to change between themes
  const darkToggle = useRef<HTMLIonToggleElement>(null);
  const { name } = useContext(NameContext);

  async function handleDarkMode(checked: boolean) {
    // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    if (checked === undefined) return;
    document.body.classList.toggle("dark", checked);
    let result = await firebaseStore
      .collection("users")
      .doc(user!.uid)
      .set({ darkMode: checked }, { merge: true });
    console.log(result);
    // darkModeSet(checked)
  }

  const doLogout = async () => {
    const result = await logout();
    // console.log(result)
    // history.replace("/onboarding")
    // console.log(router.routeInfo)
    // router.push('/onboarding', "forward", "replace")
  };

  return (
    <IonPage>
      <IonHeader mode="md" className="ion-padding-vertical ion-no-border">
        <IonToolbar color="light">
          <IonTitle >
            <Heading4
              style={{ color: "var(--ion-color-primary)" }}
            >
              Settings
            </Heading4>
          </IonTitle>
          {/* <IonButtons slot="end">
            <IonButton routerLink="/new" color="primary" mode="ios" fill="outline">
              <IonIcon icon={createOutline}></IonIcon>
            </IonButton>
     
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" /> */}
        <div className="page-wrapper ion-padding-horizontal">
          <div className="page-wrapper-content">
            <div style={{display: "flex", justifyContent: "center"}}>

            <UserAvatar username={name} size={70} email={user?.email || ""} />
            </div>
            <div className="ion-margin-top">
              <IonNote style={{ color: "var(--ion-color-primary)", fontWeight: "bolder", textTransform: "uppercase"}}>
                Profile
              </IonNote>
              <IonItem
                color="light"
                detail={true}
                button={true}
                routerLink="/name"
                lines="none"
              >
                {/* <IonIcon slot="start" icon={person}></IonIcon> */}
                <IonLabel>Change username</IonLabel>
              </IonItem>
              <IonItem
                color="light"
                detail={true}
                button={true}
                lines="none"
                href="https://yannicknana.fr/#contact"
              >
                {/* <IonIcon slot="start" icon={bug}></IonIcon> */}
                <IonLabel>Report a problem</IonLabel>
              </IonItem>
              <IonItem
                color="light"
                detail={true}
                button={true}
                onClick={doLogout}
                lines="none"
              >
                {/* <IonIcon slot="start" icon={bug}></IonIcon> */}
                <IonLabel>Logout</IonLabel>
              </IonItem>
            </div>
            <div>
              <IonNote style={{ color: "var(--ion-color-primary)", fontWeight: "bolder", textTransform: "uppercase"}}>
                Appearance
              </IonNote>
              <IonItem color="light" lines="none">
                {/* <IonIcon slot="start" icon={moon}></IonIcon> */}
                <div>
                  <IonLabel>Dark Mode</IonLabel>
                  {/* <IonN>Turn on Dark Mode for a great viewing experience and battery saving.</IonN> */}
                </div>
                <IonToggle
                  ref={darkToggle}
                  checked={darkMode}
                  id="themeToggle"
                  slot="end"
                  onIonChange={(e) => handleDarkMode(e.detail.checked)}
                />
              </IonItem>
            </div>
            <div style={{marginBottom: "4em"}}>
              <IonNote style={{ color: "var(--ion-color-primary)", fontWeight: "bolder", textTransform: "uppercase"}}>
                About
              </IonNote>
              <IonItem
                color="light"
                detail={true}
                button={true}
                lines="none"
                href="https://grithub.fr/"
              >
                {/* <IonIcon slot="start" icon={person}></IonIcon> */}
                <IonLabel>Terms of Use</IonLabel>
              </IonItem>
              <IonItem
                color="light"
                routerLink="/attributions"
                detail={true}
                button={true}
                lines="none"
              >
                <IonLabel>Attributions</IonLabel>
              </IonItem>
              <IonItem color="light" lines="none" button={true}>
                <IonLabel>Version: v0.1.6 </IonLabel>
              </IonItem>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
