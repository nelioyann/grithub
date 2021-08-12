import { IonPage, IonContent, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonChip } from '@ionic/react'
import React, { useState } from 'react'
import { ColumnContainer, Heading2, Heading3, Heading4, Heading5, LargeButton } from '../../theme/globalStyles'

const New: React.FC= () => {
    const [newHabit, newhabitSet] = useState<string>("")

    const handleChange = (habit: string) => {
        newhabitSet(habit)
    }
    return (
        <IonPage >
            {/* <Header name="Habits" icon={settingsOutline} iconTarget="/onboarding" /> */}
            <IonHeader>
                <IonToolbar color="light" >
                    <IonButtons slot="start">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>
                    <IonTitle>
                        <Heading4 style={{ color: "var(--ion-color-dark)", textAlign: "left" }}>New habit</Heading4>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                {/* <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" /> */}
                <div className="page-wrapper ion-padding-horizontal">

                    <div className="page-wrapper-content ">

                        <Heading5>Suggestions</Heading5>
                        <IonChip outline={true} onClick={() => handleChange("Read 5 pages")}>
                            <IonLabel color="primary">Read 5 pages</IonLabel>
                        </IonChip>
                        <IonChip outline={true} onClick={() => handleChange("Run for 20 minutes")}>
                            <IonLabel color="primary">Run for 20 minutes</IonLabel>
                        </IonChip>
                        <IonChip outline={true} onClick={() => handleChange("Wake up before 6AM")}>
                            <IonLabel color="primary">Wake up before 6AM</IonLabel>
                        </IonChip>
                        <ColumnContainer style={{ marginTop: "4em" }}>
                            {/* <Heading3 style={{ color: "var(--ion-color-primary)", textAlign: "center" }}>
                                I want to {newHabit.toLowerCase()} everyday.
                            </Heading3> */}
                            
                            <IonItem color="light" style={{ border: "2px solid var(--ion-color-primary)", borderRadius: "1em" }}>
                                <IonLabel position="floating">Habit name</IonLabel>
                                <IonInput onIonChange={(e: any) => handleChange(e.detail.value)} value={newHabit}></IonInput>
                            </IonItem>
                            <IonButton routerLink="/tabs/habits" style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill="solid" color="primary">
                                <LargeButton>

                                    Create habit
                                </LargeButton>

                            </IonButton>
                        </ColumnContainer>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default New
