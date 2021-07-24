import { IonPage, IonContent, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonToggle, IonList } from '@ionic/react'
import { moon, settingsOutline } from 'ionicons/icons'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Headers/Header'
import { Heading2, Heading4, Heading5 } from '../../theme/globalStyles'

const Settings = () => {

    const [darkMode, darkModeSet] = useState(false);
    // Query for the toggle that is used to change between themes
    const darkToggle = useRef<HTMLIonToggleElement>(null);

    useEffect(() => {
        // Listen for changes to the prefers-color-scheme media query
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeSet(prefersDark.matches)
        handleDarkMode(prefersDark.matches)
    }, [darkMode])


    function handleDarkMode(checked: boolean): void {
        // Listen for the toggle check/uncheck to toggle the dark class on the <body>
        document.body.classList.toggle('dark', checked);

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

                            <IonItem lines="full">
                                <IonIcon slot="start" icon={moon}></IonIcon>
                                <IonLabel>
                                    Toggle Dark Theme
                                </IonLabel>
                                <IonToggle ref={darkToggle} checked={darkMode} id="themeToggle" slot="end" onIonChange={e => handleDarkMode(e.detail.checked)} />
                            </IonItem>
                        </IonList>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Settings


