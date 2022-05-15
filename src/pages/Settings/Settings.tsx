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
  IonCard,
} from "@ionic/react";
import { bug, home, moon, person, settingsOutline } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Headers/Header";
import { useAuth } from "../../Contexts/authProvider";
import { useDarkMode } from "../../Contexts/DarkModeContext";
import {
  ColumnContainer,
  Heading2,
  Heading4,
  Heading5,
  Heading6,
  MediumParagraph,
  SmallParagraph,
} from "../../theme/globalStyles";
import { NameContext } from "../../Contexts/NameContext";
import { firebaseStore } from "../../initFirebase";
import UserAvatar from "../../components/Avatar/Avatar";
import Content from "../../components/Content/Content";

const Settings: React.FC = () => {
  const router = useIonRouter();
  const { user, logout, setLoading } = useAuth();

  const { handleDarkMode, darkMode } = useDarkMode()
  // console.log(darkMode)
  // Query for the toggle that is used to change between themes
  const darkToggle = useRef<HTMLIonToggleElement>(null);
  const { name } = useContext(NameContext);



  const doLogout = async () => {
    const result = await logout();
    console.log(result)
    // history.replace("/onboarding")
    // console.log(router.routeInfo)
    router.push('/onboarding', "forward")
  };

  return (
    <IonPage>
      {/* <IonHeader mode="ios" className="ion-padding-vertical ion-no-border">
        <IonToolbar color="light">
          <IonButtons slot="">
            <IonBackButton color="dark" text="" defaultHref="/tabs/habits" />
          </IonButtons>
          <IonTitle slot="">
            <Heading4
              style={{ color: "var(--ion-color-dark)", margin: "auto", textAlign: "center" }}
            >
              Settings
            </Heading4>
          </IonTitle>

        </IonToolbar>
      </IonHeader> */}
        <Header name="Settings" icon={home} iconTarget="/tabs/habits" />
      <Content>
        <div className="page-wrapper ion-padding-horizontal">
          <div className="page-wrapper-content">
            <div style={{ display: "flex", justifyContent: "center" }}>

            </div>
            <div className="ion-margin-top">

              {/* <div style={{ width: "max-content" }} onClick={() => router.push("/name")}> */}

              <UserAvatar isAButton={true} username={name} size={70} email={user?.email || ""} />
              {/* </div> */}
              <Heading6 style={{ color: "var(--ion-color-primary)", fontWeight: "bolder", textTransform: "uppercase" }}>
                Profile
              </Heading6>
              <IonItem
                color="light"
                detail={true}
                button={true}
                routerLink="/name"
                lines="none"
              >
                <IonIcon slot="start" icon={person}></IonIcon>
                <MediumParagraph>Change your username</MediumParagraph>
              </IonItem>

              <IonItem
                color="light"
                detail={true}
                button={true}
                onClick={doLogout}
                lines="none"
              >
                <IonIcon slot="start" icon={bug}></IonIcon>
                <MediumParagraph>Logout</MediumParagraph>
              </IonItem>
            </div>
            <div>
              <Heading6 style={{ color: "var(--ion-color-primary)", fontWeight: "bolder", textTransform: "uppercase" }}>
                Appearance
              </Heading6>
              <IonItem color="light" lines="none">
                <IonIcon slot="start" icon={moon}></IonIcon>
                <div>
                  <MediumParagraph>Dark theme</MediumParagraph>
                  {/* <IonN>Turn on Dark Mode for a great viewing experience and battery saving.</IonN> */}
                </div>
                <IonToggle
                  ref={darkToggle}
                  mode="ios"
                  checked={darkMode}
                  id="themeToggle"
                  slot="end"
                  onIonChange={(e) => handleDarkMode(e.detail.checked)}
                />
              </IonItem>
            </div>
            <div style={{ marginBottom: "4em" }}>
              <Heading6 style={{ color: "var(--ion-color-primary)", fontWeight: "bolder", textTransform: "uppercase" }}>
                About
              </Heading6>
              <IonItem
                color="light"
                detail={true}
                button={true}
                lines="none"
                href="https://yannicknana.fr/#contact"
              >
                {/* <IonIcon slot="start" icon={bug}></IonIcon> */}
                <MediumParagraph>Report a problem</MediumParagraph>
              </IonItem>
              {/* <IonItem
                color="light"
                detail={true}
                button={true}
                lines="none"
                href="https://grithub.fr/terms"
              >
                <IonIcon slot="start" icon={person}></IonIcon>
                <MediumParagraph>Terms of Use</MediumParagraph>
              </IonItem> */}
              {/* <IonItem
                color="light"
                routerLink="/attributions"
                detail={true}
                button={true}
                lines="none"
              >
                <MediumParagraph >Attributions</MediumParagraph>
              </IonItem> */}
              <IonItem color="light" lines="none" button={true}>
                <MediumParagraph>Version: v0.1.39 </MediumParagraph>
              </IonItem>
            </div>
          </div>
        </div>
      </Content>
    </IonPage>
  );
};

export default Settings;
