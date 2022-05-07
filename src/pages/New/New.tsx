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
import React, { useRef, useState } from "react";
import {
  ColumnContainer,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  LargeButton,
  LargeParagraph,
  MediumButton,
  MediumParagraph,
  RowContainer,
} from "../../theme/globalStyles";
import { useHistory } from "react-router";
import { firebaseStore } from "../../initFirebase";
import { useAuth } from "../../Contexts/authProvider";
import { toast } from "../../components/Toasts/Toast";
import Picker from "emoji-picker-react";
import "./New.css";
import { close, closeCircle, helpOutline, thumbsDownOutline, thumbsUpOutline } from "ionicons/icons";
import { useHabits } from "../../Contexts/habitsProvider";
import Lottie from "react-lottie";
import puzzleAnimation from "./puzzle.json";
import { Button } from "../../components/Buttons/Button";
import Content from "../../components/Content/Content";

const animationOptions = { loop: true, animationData: puzzleAnimation, autoplay: true }


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
      <Heading5
        className="ion-padding-horizontal"
        style={{ textAlign: "center" }}
      >
        Emoji Picker
      </Heading5>

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
  const router = useIonRouter();
  const { user, setLoading } = useAuth();
  const { habits, setLoadingHabits } = useHabits();

  const [chosenEmoji, setChosenEmoji] = useState("");
  const pageRef = useRef<HTMLElement>()

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
  const handleHelpDismiss = () => {
    dismissHelp();
  };
  const [presentHelp, dismissHelp] = useIonModal(HelpCard, {
    handleChange: handleChange,
    setChosenEmoji: setChosenEmoji,
    handleHelpDismiss: handleHelpDismiss,
  });

  const handleSubmit = async (habit: string) => {
    console.log("new");
    if (habit === "") {
      toast("Invalid entry");
      return;
    }
    try {
      setLoadingHabits(true)
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
    } catch (error: any) {
      toast(error.message);
    }
    // console.log("can I false here")
    setLoadingHabits(false)

    // console.log(user!.uid)
  };
  return (
    <IonPage ref={pageRef}>
      <IonHeader mode="ios" className="ion-padding-vertical ion-no-border">
        <IonToolbar color="light">
          <IonButtons slot="">
            <IonBackButton color="dark" text="" defaultHref="/" />
          </IonButtons>
          <IonTitle slot="">
            <Heading4
              style={{ color: "var(--ion-color-dark)", textAlign: "center", margin: "auto" }}
            >
              New habit
            </Heading4>
          </IonTitle>
          {/* <IonButtons slot="end">
            <IonButton onClick={() => presentHelp({
              mode: "ios",
              swipeToClose: true,
              presentingElement: pageRef.current
            })} color="dark" fill="clear">
              <IonIcon icon={helpOutline}></IonIcon>
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <Content>
        {/* <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" /> */}
        <div
          className="page-wrapper ion-padding-horizontal"
          style={{ alignItems: "center" }}
        >
          <div className="page-wrapper-content ">
            {habits?.length < 4 ?
              (<ColumnContainer style={{ marginTop: "4em" }}>



                <div className="ion-margin-vertical">
                  <Heading4>Name your habit </Heading4>

                  <div>
                    <IonItem style={{ width: "100%", borderRadius: "1em" }}>
                      <IonLabel position="floating">{chosenEmoji} Everyday, I will...</IonLabel>
                      <IonInput

                        onIonChange={(e: any) => handleChange(e.detail.value)}
                        value={newHabit}
                        placeholder="Make my bed"

                      ></IonInput>
                    </IonItem>
                  </div>
                </div>

                <div className="ion-margin-vertical">
                  {/* <Heading4>Pick an emoji </Heading4> */}
                  <IonButton
                    mode="ios"
                    onClick={() =>
                      presentPicker({
                        swipeToClose: true,
                        mode: "ios",
                        cssClass: "emoji-modal",
                        presentingElement: pageRef.current

                      })
                    }
                    style={{
                      "--border-radius": "16px",
                      "--padding-bottom": "16px",
                      "--padding-top": "16px",
                    }}
                    className="ion-margin-top"
                    size="large"
                    expand="block"
                    fill={"outline"}
                    color="primary"
                  >
                    <MediumButton>

                      Add an symbol {chosenEmoji}
                    </MediumButton>
                  </IonButton>
                </div>
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
              </ColumnContainer>)
              :
              (<ColumnContainer style={{ textAlign: "center" }}>
                <Lottie isClickToPauseDisabled={true} options={animationOptions} height={200} width={300} />
                <Heading5>
                  You can only have 4 habits
                </Heading5>
                <LargeParagraph>
                  You can delete some habits to add more
                </LargeParagraph>
                <Button label="Show me my habits" routerLink="/tabs/habits" />
              </ColumnContainer>)
            }
          </div>
        </div>
      </Content >
    </IonPage >
  );
};

export default New;

const HelpCard: React.FC<{
  handleChange: (habit: string) => void;
  setChosenEmoji: (emoji: string) => void;
  handleHelpDismiss: () => void;
}> = ({ handleChange, setChosenEmoji, handleHelpDismiss }) => {
  return (
    <div
      className="page-wrapper ion-padding"
      style={{ alignItems: "center" }}
    >
      <div className="page-wrapper-content" style={{ textAlign: "center" }}>
        <Heading5>A well defined habit should be</Heading5>
        <IonCard style={{ margin: "0.5em 0", padding: "4px 8px" }}>
          <Heading6>📝 Specific</Heading6>
        </IonCard>
        <IonCard style={{ margin: "0.5em 0", padding: "4px 8px" }}>
          <Heading6>📏 Measurable</Heading6>
        </IonCard>
        <IonCard style={{ margin: "0.5em 0", padding: "4px 8px" }}>
          <Heading6>🎯 Achievable</Heading6>
        </IonCard>

        <IonCard style={{ margin: "0.5em 0", padding: "4px" }}>
          <Heading6>👌 Relevant</Heading6>

        </IonCard>
        <IonCard style={{ margin: "0.5em 0", padding: "4px" }}>
          <Heading6>⏳ Time Bound</Heading6>

        </IonCard>
        <IonButton
          fill="outline"
          color="dark"
          onClick={() => handleHelpDismiss()}
          style={{ margin: "auto", width: "100%" }}
        >
          <IonIcon style={{ fontSize: "2rem" }} icon={closeCircle}></IonIcon>
          Close
        </IonButton>
      </div>
    </div>
  );
};
