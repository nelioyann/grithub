import { IonPage, IonContent, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonToggle, IonList, IonListHeader } from '@ionic/react'
import { bug, moon, person, settingsOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import Header from '../../components/Headers/Header'
import { useAuth } from '../../Contexts/authProvider'
import { DarkModeContext } from '../../Contexts/DarkModeContext'
import { Heading2, Heading4, Heading5, SmallParagraph } from '../../theme/globalStyles'

const Settings: React.FC = () => {

    const history = useHistory()
    const {darkMode, darkModeSet} = useContext(DarkModeContext);
    const {logout} = useAuth()
    
    console.log(darkMode)
    // Query for the toggle that is used to change between themes
    const darkToggle = useRef<HTMLIonToggleElement>(null);

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

    const doLogout = () => {
        logout();
        history.replace("/login")


    }
    // 
    return (
        <IonPage >
            <IonHeader>
                <IonToolbar color="light" >
                    <IonButtons slot="start">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>
                    <IonTitle>
                        <Heading4 style={{ color: "var(--ion-color-primary)", textAlign: "left" }}>Settings</Heading4>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                {/* <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" /> */}
                <div className="page-wrapper ion-padding-horizontal">

                    <div className="page-wrapper-content ">
                        <Heading2>
                            Settings
                        </Heading2>
                        <IonList>
                            <IonListHeader>
                                Appearance
                            </IonListHeader>
                            <IonItem lines="full">
                                <IonIcon slot="start" icon={moon}></IonIcon>
                                <IonLabel>
                                    Dark Mode
                                </IonLabel>
                                <IonToggle ref={darkToggle} checked={darkMode} id="themeToggle" slot="end" onIonChange={e => handleDarkMode(e.detail.checked)} />
                            </IonItem>
                        </IonList>
                        <IonList>
                            <IonListHeader>
                                Profile
                            </IonListHeader>
                            <IonItem detail={true} button={true} routerLink="/name" lines="full">
                                <IonIcon slot="start" icon={person}></IonIcon>
                                <IonLabel>
                                    Change name
                                </IonLabel>
                            </IonItem>
                            <IonItem detail={true} button={true} routerLink="/name" lines="full">
                                <IonIcon slot="start" icon={bug}></IonIcon>
                                <IonLabel>
                                    Report a problem
                                </IonLabel>
                            </IonItem>
                            <IonItem detail={true} button={true} onClick={doLogout} lines="full">
                                <IonIcon slot="start" icon={bug}></IonIcon>
                                <IonLabel>
                                    Logout
                                </IonLabel>
                            </IonItem>
                        </IonList>

                        <SmallParagraph style={{textAlign:"center"}}>Version: beta 1</SmallParagraph>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Settings


