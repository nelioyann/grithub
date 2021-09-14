import { IonPage, IonContent, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonToggle, IonList, IonListHeader, IonNote, useIonRouter } from '@ionic/react'
import { bug, moon, person, settingsOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import Header from '../../components/Headers/Header'
import { useAuth } from '../../Contexts/authProvider'
import { DarkModeContext } from '../../Contexts/DarkModeContext'
import { Heading2, Heading4, Heading5, MediumParagraph, SmallParagraph } from '../../theme/globalStyles'
import Avatar from "boring-avatars";
import {NameContext} from '../../Contexts/NameContext'

const Settings: React.FC = () => {
    const router = useIonRouter()
    const history = useHistory()
    const { darkMode, darkModeSet } = useContext(DarkModeContext);
    const { logout } = useAuth()

    // console.log(darkMode)
    // Query for the toggle that is used to change between themes
    const darkToggle = useRef<HTMLIonToggleElement>(null);
    const { name, nameSet } = useContext(NameContext);

    useEffect(() => {
        //Listen for changes to the prefers-color-scheme media query
        // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        // darkModeSet(prefersDark.matches)
        handleDarkMode(darkMode)
    }, [darkMode])


    function handleDarkMode(checked: boolean): void {
        // Listen for the toggle check/uncheck to toggle the dark class on the <body>
        document.body.classList.toggle('dark', checked);
        darkModeSet(checked)

    }

    const doLogout = async () => {
        const result = await logout();
        console.log(result)
        // history.replace("/onboarding")
        console.log(router.routeInfo)
        router.push('/onboarding', "forward", "push")


    }

    return (
        <IonPage >
            <IonHeader mode="ios" className="ion-padding-vertical ion-no-border">
                <IonToolbar color="light" >
                    <IonButtons slot="">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>
                    <IonTitle slot="">
                        <Heading4 style={{ color: "var(--ion-color-primary)", textAlign: "center" }}>Settings</Heading4>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                {/* <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" /> */}
                <div className="page-wrapper ion-padding-horizontal">

                    <div className="page-wrapper-content" >

                    <div style={{ borderRadius: "50%", margin: "1em auto", width: "max-content" }}>

                        <Avatar
                            size={100}
                            name={name != "" ? name : "Fellow Grithuber"}
                            variant="beam"
                            colors={["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"]}
                            />
                            </div>
                        <div className="ion-margin-top">
                            <IonNote style={{ color: "var(--ion-color-secondary)" }}>
                                Appearance
                            </IonNote>
                            <IonItem color="light" lines="none">
                                {/* <IonIcon slot="start" icon={moon}></IonIcon> */}
                                <div>
                                    <IonLabel>

                                        Dark Mode
                                    </IonLabel>
                                    {/* <IonN>Turn on Dark Mode for a great viewing experience and battery saving.</IonN> */}

                                </div>
                                <IonToggle ref={darkToggle} checked={darkMode} id="themeToggle" slot="end" onIonChange={e => handleDarkMode(e.detail.checked)} />
                            </IonItem>
                        </div>
                        <div >
                            <IonNote style={{ color: "var(--ion-color-secondary)" }}>
                                Profile
                            </IonNote>
                            <IonItem color="light" detail={true} button={true} routerLink="/name" lines="none">
                                {/* <IonIcon slot="start" icon={person}></IonIcon> */}
                                <IonLabel>
                                    Change username
                                </IonLabel>
                            </IonItem>
                            <IonItem color="light" detail={true} button={true} lines="none">
                                {/* <IonIcon slot="start" icon={bug}></IonIcon> */}
                                <IonLabel>
                                    Report a problem
                                </IonLabel>
                            </IonItem>
                            <IonItem color="light" detail={true} button={true} onClick={doLogout} lines="none">
                                {/* <IonIcon slot="start" icon={bug}></IonIcon> */}
                                <IonLabel>
                                    Logout
                                </IonLabel>
                            </IonItem>
                        </div>
                        <div>
                            <IonNote style={{ color: "var(--ion-color-secondary)" }}>About</IonNote>
                            <IonItem color="light" detail={true} button={true} lines="none">
                                {/* <IonIcon slot="start" icon={person}></IonIcon> */}
                                <IonLabel>
                                    Terms of Use
                                </IonLabel>
                            </IonItem>
                            <IonItem color="light" routerLink="/attributions" detail={true} button={true} lines="none">
                                <IonLabel>
                                    Attributions
                                </IonLabel>
                            </IonItem>
                            <IonItem color="light" lines="none" button={true}>
                                <IonLabel>
                                    Version: beta 1
                                </IonLabel>
                            </IonItem>
                        </div>

                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Settings


