import { IonPage, IonContent, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonChip, useIonModal, IonCard, IonNote } from '@ionic/react'
import React, { useState } from 'react'
import { ColumnContainer, Heading2, Heading3, Heading4, Heading5, Heading6, LargeButton } from '../../theme/globalStyles'
import { useHistory } from 'react-router';
import { firebaseStore } from '../../initFirebase';
import { useAuth } from '../../Contexts/authProvider';
import { toast } from '../../components/Toasts/Toast';
import Picker from 'emoji-picker-react';

const EmojiPicker: React.FC<{
    onSelected: () => void;
}> = ({ onSelected }) => {
    return (

        <Picker onEmojiClick={onSelected} disableSkinTonePicker={true} disableSearchBar={true} pickerStyle={{ width: '100%', height: '100%' }} />
    )

}

const New: React.FC = () => {
    const [newHabit, newhabitSet] = useState<string>("")
    const history = useHistory();
    const { user, setLoading } = useAuth()
    const [chosenEmoji, setChosenEmoji] = useState("🔥");

    const handleEmojiSelection = (event: any, emojiObject: any) => {
        setChosenEmoji(emojiObject.emoji);
        console.log(emojiObject?.emoji)
        dismissPicker()
    };
    const handleEmojiDismiss = () => {
        dismissPicker()
    }

    const [presentPicker, dismissPicker] = useIonModal(EmojiPicker, {
        onSelected: handleEmojiSelection
    })
    const handleChange = (habit: string) => {
        newhabitSet(habit)
    }

    const handleSubmit = async (habit: string) => {
        console.log("new")
        if (habit === "") return;
        try {
            // setLoading(true)
            let result = await firebaseStore.collection("users")
                .doc(user!.uid).collection("habits")
                .add({
                    name: habit,
                    dates: []
                })
            console.log(result)
            // setLoading(false)
            toast("Added")
            history.replace("/tabs/habits")

        } catch (error: any) {
            toast(error.message)

        }
        // console.log(user!.uid)
    }
    return (
        <IonPage >
            {/* <Header name="Habits" icon={settingsOutline} iconTarget="/onboarding" /> */}
            <IonHeader mode="ios" className="ion-padding-vertical ion-no-border">
                <IonToolbar color="light" >
                    <IonButtons slot="">
                        <IonBackButton color="dark" text="" />
                    </IonButtons>
                    <IonTitle slot="">
                        <Heading4 style={{ color: "var(--ion-color-dark)", textAlign: "center" }}>New habit</Heading4>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                {/* <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" /> */}
                <div className="page-wrapper ion-padding-horizontal">

                    <div className="page-wrapper-content ">

                        <ColumnContainer style={{ marginTop: "4em" }}>
                            {/* <Heading3 style={{ color: "var(--ion-color-primary)", textAlign: "center" }}>
                                I want to {newHabit.toLowerCase()} everyday.
                            </Heading3> */}

                            <Heading6>Everyday, I want to</Heading6>
                            <IonItem color="medium" style={{ border: "2px solid var(--ion-color-medium)", borderRadius: "0.3em" }}>
                                <IonLabel position="floating">Habit name</IonLabel>
                                <IonInput onIonChange={(e: any) => handleChange(e.detail.value)} value={newHabit}></IonInput>
                            </IonItem>
                            <div className="ion-margin-vertical">
                                <IonNote>

                            suggestions:
                                </IonNote>
                            <IonChip color="dark" outline={true} onClick={() => handleChange("Read 5 pages")}>
                                <IonLabel >Read 5 pages</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true} onClick={() => handleChange("Run for 20 minutes")}>
                                <IonLabel  >Run for 20 minutes</IonLabel>
                            </IonChip>
                            <IonChip color="dark" outline={true} onClick={() => handleChange("Wake up before 6AM")}>
                                <IonLabel  >Wake up before 6AM</IonLabel>
                            </IonChip>
                            </div>
                            <Heading6>Choose an emoji</Heading6>
                            <IonCard onClick={() => presentPicker()} button={true} color="medium" style={{ width: "max-content", fontSize: "2rem", padding: "0.5em" }}>

                                {chosenEmoji}
                            </IonCard>
                            <IonButton onClick={() => handleSubmit(newHabit)} style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill="solid" color="primary">
                                <LargeButton style={{ color: "var(--ion-color-light)" }}>
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
