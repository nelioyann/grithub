import {
  IonPage,
  IonContent,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonChip,
  useIonModal,
  IonCard,
  IonNote,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import {
  ColumnContainer,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  LargeButton,
  LargeParagraph,
  MediumParagraph,
  RowContainer,
} from "../../theme/globalStyles";
import { useHistory } from "react-router";
import { firebaseStore } from "../../initFirebase";
import { useAuth } from "../../Contexts/authProvider";
import { toast } from "../../components/Toasts/Toast";
import Picker from "emoji-picker-react";
import "./New.css";

const EmojiPicker: React.FC<{
  onSelected: () => void;
}> = ({ onSelected }) => {
  return (
    // <div className="ion-padding-horizontal" style={{ width: '100%' }}>

    <div style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "5px",
            width: "80px",
            backgroundColor: "var(--ion-color-dark)",
            margin: "1rem 0",
            borderRadius: "5px",
          }}
        ></div>
      </div>
      <Heading5 className="ion-padding-horizontal" style={{textAlign: "center"}}>Emoji Picker</Heading5>

      <Picker
        onEmojiClick={onSelected}
        disableSkinTonePicker={true}
        disableSearchBar={false}
        preload={true}
        native={true}
        pickerStyle={{ width: "100%", height: "100%" }}
      />
    </div>
    // </div>
  );
};

const New: React.FC = () => {
  const [newHabit, newhabitSet] = useState<string>("");
//   const history = useHistory();
  const router = useIonRouter()
  const { user, setLoading } = useAuth();
  const [chosenEmoji, setChosenEmoji] = useState("🙂");

  const handleEmojiSelection = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject.emoji);
    console.log(emojiObject?.emoji);
    dismissPicker();
  };
  const handleEmojiDismiss = () => {
    dismissPicker();
  };

  const [presentPicker, dismissPicker] = useIonModal(EmojiPicker, {
    onSelected: handleEmojiSelection,
  });
  const handleChange = (habit: string) => {
    newhabitSet(habit);
  };

  const handleSubmit = async (habit: string) => {
    console.log("new");
    if (habit === "") {
      toast("Invalid entry");
      return;
    }
    try {
      // setLoading(true)
      let emojiedHabit = chosenEmoji + " " + habit;
      let result = await firebaseStore
        .collection("users")
        .doc(user!.uid)
        .collection("habits")
        .add({
          name: emojiedHabit,
          dates: [],
        });
      console.log(result);
      // setLoading(false)
      toast("Added");
      router.push("/tabs/habits", "back", "push");
    } catch (error) {
      toast(error.message);
    }
    // console.log(user!.uid)
  };
  return (
    <IonPage>
      {/* <Header name="Habits" icon={settingsOutline} iconTarget="/onboarding" /> */}
      <IonHeader mode="ios" className="ion-padding-vertical ion-no-border">
        <IonToolbar color="light">
          <IonButtons slot="">
            <IonBackButton color="dark" text="" defaultHref="/" />
          </IonButtons>
          <IonTitle slot="">
            <Heading4
              style={{ color: "var(--ion-color-dark)", textAlign: "center" }}
            >
              New goal
            </Heading4>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" /> */}
        <div className="page-wrapper ion-padding-horizontal">
          <div className="page-wrapper-content ">
            <ColumnContainer style={{ marginTop: "4em" }}>
              {/* <Heading3 style={{ color: "var(--ion-color-primary)", textAlign: "center" }}>
                                I want to {newHabit.toLowerCase()} everyday.
                            </Heading3> */}

              <IonCard
                className="ion-padding "
                style={{ margin: "1em 0" }}
                color="medium"
              >
                <Heading6>💡 Be specific</Heading6>

                <MediumParagraph>
                  <IonChip
                    color="dark"
                    outline={true}
                    onClick={() => {
                      handleChange("Exercise for 20 minutes");
                      setChosenEmoji("🤸‍♂");
                    }}
                  >
                    <IonLabel>"Exercise for 20 minutes"</IonLabel>
                  </IonChip>
                  is better than "Exercise"
                </MediumParagraph>
              </IonCard>
              <Heading4>Give your habit a name and pick an emoji</Heading4>

              <RowContainer>
                <IonCard
                  onClick={() =>
                    presentPicker({
                      swipeToClose: true,
                      mode: "ios",
                      cssClass: "emoji-modal",
                    })
                  }
                  button={true}
                  color="medium"
                  style={{
                    width: "max-content",
                    fontSize: "1.5rem",
                    padding: "0.5em",
                    margin: "0 1em 0 0",
                  }}
                >
                  {chosenEmoji}
                </IonCard>
                <IonItem style={{ width: "100%" }}>
                  <IonLabel position="floating">Everyday, I will...</IonLabel>
                  <IonInput
                    color="primary"
                    onIonChange={(e: any) => handleChange(e.detail.value)}
                    value={newHabit}
                  ></IonInput>
                </IonItem>
              </RowContainer>
              {/* <div className="ion-margin-vertical">
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
                            </div> */}

              <IonButton
                onClick={() => handleSubmit(newHabit)}
                style={{
                  "--border-radius": "16px",
                  "--padding-bottom": "16px",
                  "--padding-top": "16px",
                }}
                className="ion-margin-top"
                size="large"
                expand="block"
                fill="solid"
                color="primary"
              >
                <LargeButton style={{ color: "var(--ion-color-light)" }}>
                  Create habit
                </LargeButton>
              </IonButton>
            </ColumnContainer>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default New;
