import { IonPage, IonContent, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonToggle, IonList, IonListHeader, IonNote } from '@ionic/react'
import { bug, moon, person, settingsOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import Header from '../../components/Headers/Header'
import { useAuth } from '../../Contexts/authProvider'
import { DarkModeContext } from '../../Contexts/DarkModeContext'
import { Heading2, Heading4, Heading5, MediumParagraph, SmallParagraph } from '../../theme/globalStyles'

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
            <IonHeader mode="ios">
                <IonToolbar color="light" >
                    <IonButtons slot="">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>
                    <IonTitle slot="end">
                        <Heading4 style={{ color: "var(--ion-color-primary)", textAlign: "center" }}>Settings</Heading4>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                {/* <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" /> */}
                <div className="page-wrapper ion-padding-horizontal">

                    <div className="page-wrapper-content" >
                        <div >
                            <IonNote >
                                Appearance
                            </IonNote>
                            <IonItem  color="light" lines="none">
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
                            <IonNote >
                                Profile
                            </IonNote>
                            <IonItem color="light" detail={true} button={true} routerLink="/name" lines="none">
                                {/* <IonIcon slot="start" icon={person}></IonIcon> */}
                                <IonLabel>
                                    Change name
                                </IonLabel>
                            </IonItem>
                            <IonItem color="light" detail={true} button={true} routerLink="/name" lines="none">
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

                        <SmallParagraph style={{textAlign:"center"}}>Version: beta 1</SmallParagraph>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Settings


