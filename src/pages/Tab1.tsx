import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonModal,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonModal,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import {
  add,
  addCircle,
  addCircleOutline,
  addOutline,
  arrowForwardCircle,
  bed,
  calendar,
  checkboxOutline,
  checkmarkCircle,
  checkmarkCircleOutline,
  createOutline,
  flag,
  pencil,
  settingsOutline,
  statsChartOutline,
  todayOutline,
  trash,
} from "ionicons/icons";
import Header from "../components/Headers/Header";
import { NameContext, useUsername } from "../Contexts/NameContext";
import { Heading4, Heading5, MediumParagraph, MediumButton, Heading6, LargeButton, SmallParagraph, LargeParagraph, ColumnContainer } from "../theme/globalStyles";
import "./Tab1.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import TaskItem from "../components/Tasks/TaskItem";
import ViewTask from "../components/Tasks/ViewTask";
import { useHabits, IHabit } from "../Contexts/habitsProvider";
import {
  getDateString,
  incrementToday,
  todayDate,
} from "../components/Dates/DatesFunctions";
import { toast } from "../components/Toasts/Toast";
import { useAuth } from "../Contexts/authProvider";


import { firebaseStore, arrayUnion, arrayRemove } from "../initFirebase";
import WeeklyProgression from "../components/WeeklyProgression/WeeklyProgression";
import MonthlyGraphs from "../components/MonthlyProgression/MonthlyGraphs";
import SegmentedTasks from "../components/Tasks/SegmentedTasks";
import Alan from "../components/AI/Alan";
import Content from "../components/Content/Content";
import Lottie from "react-lottie";
import newAnimation from "../pages/Onboarding/lottieFiles/newhabits.json";
import styled from "styled-components";
import Avatar from "boring-avatars";


const AvatarWrapper = styled.span`


  svg {
  border-radius: 0.2rem;
  }
`

const Tab1: React.FC = () => {



  const { name, nameSet } = useUsername();
  const { habits, loadingHabits } = useHabits();
  let todayDateString = getDateString(incrementToday(0));
  const pageRef = useRef<HTMLElement>()

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: newAnimation,

  }
  const [presentWarning] = useIonAlert();


  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<IHabit>();
  const [editedHabitName, setEditedHabitName] = useState("");
  // State of the current habit
  const [habitChecked, setHabitChecked] = useState<boolean | undefined>(
    selectedHabit?.dates?.includes(todayDateString)
  );
  const [inView, setInView] = useState<boolean>(false);

  const handleTaskSelection = (habit: IHabit) => {
    setSelectedHabit(habit);
    setShowOptionsModal(true);
  };
  const handleTaskEdition = (id: string | undefined) => {
    setShowOptionsModal(false);
    setEditedHabitName(selectedHabit?.name || "")
    setShowEditModal(true)
    console.log("New item selected", id);
  };

  const handleEditChange = async (e: any) => {
    e.preventDefault();
    let id = selectedHabit?.id;
    try {
      let ref = await firebaseStore
        .collection("users")
        .doc(user!.uid)
        .collection("habits")
        .doc(id).set({ name: editedHabitName }, { merge: true })
    } catch (err) {
      console.log(err)
    }
    setShowEditModal(false)
    toast("Habit edited successfully")
  }

  const handleRemove = async (id: string | undefined) => {
    setShowOptionsModal(false);
    try {
      console.log("delete it");
      let ref = await firebaseStore
        .collection("users")
        .doc(user!.uid)
        .collection("habits")
        .doc(id)
        .delete();
      // console.log(ref);
      // router.push("/tabs/habits", "back", "pop");
    } catch (err) {
      console.log("err.message");
    }
  };
  const handleTaskCompletion = (id: string | undefined) => {
    // console.log("Handle COmpletion fired");
    if (!selectedHabit?.dates.includes(todayDateString)) toast("Congratulations!") // Why thee not worketh as thee should, why ?
    setHabitChecked(selectedHabit?.dates.includes(todayDateString));
  };
  const router = useIonRouter();
  const goToGraph = (path: string) => {
    setShowOptionsModal(false);
    router.push(path, "forward");
  };

  // Modal cleanup
  useEffect(() => {
    // console.log("Modal cleanup");
    return () => setShowOptionsModal(false);
  }, []);

  // console.log("habits",habits)
  const { user, loading } = useAuth();

  // console.log()

  useEffect(() => {
    // console.log("trying to update")
    // console.log("Will Mark as finished", habitChecked, selectedHabit)
    if (!selectedHabit) {
      // toast("An error occured, no update")
      // console.log("Current habit and check", selectedHabit, habitChecked)
      return;
    }
    const updateArray = async () => {
      try {
        let ref = await firebaseStore
          .collection("users")
          .doc(user!.uid)
          .collection("habits")
          .doc(selectedHabit?.id);
        if (habitChecked) {
          // If the habit is checked then uncheck it (remove it)
          ref.update({
            dates: arrayRemove(todayDateString),
          });
        } else {
          ref.update({
            dates: arrayUnion(todayDateString),
          });
        }
      } catch (error) {
        toast("error");
      }
    };
    updateArray();
    setShowOptionsModal(false);
    setSelectedHabit(undefined);
    setHabitChecked(undefined);
  }, [habitChecked]);

  useIonViewWillLeave(() => {
    // console.log("view will leave")
    setInView(false);
  });
  //   useIonViewDidLeave(()=>{
  //     console.log("view did leave")
  // })
  // useIonViewWillEnter(()=>{
  //     console.log("view will enter")
  //     // elTask?.current?.classList.add("animated");
  // })
  useIonViewDidEnter(() => {
    // console.log("view did enter");
    setInView(true);
    // elTask?.current?.classList.add("animated");
  });
  return (
    <IonPage ref={pageRef}>
      <Header name={`Hi, ${name}`} icon={add} iconTarget="/new" />
      <Content>
        <div
          className="page-wrapper ion-padding-horizontal"
          style={{ alignItems: "center" }}
        >
          <div
            className="page-wrapper-content"
            style={{ position: "relative" }}
          >
            {loadingHabits === false &&
              <div style={{ display: "grid", margin: "1em 0" }}>

                <IonCard className="ion-margin-vertical" color="light" style={{ textAlign: "center", padding: "1em", display: "flex", flexDirection: "row", alignItems: "center", borderLeft: "2px solid var(--ion-color-primary)", gap: "1em", boxShadow: "0px 0px 0px 1px rgba(var(--ion-color-dark-rgb), 0.21)" }}>
                  <AvatarWrapper>
                  <Avatar
                    size={40}
                    name={name !== "" ? name : "Nameless Griter"}
                    variant="beam"
                    colors={["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"]}
                    />
                    </AvatarWrapper>
                  {/* <IonIcon icon={todayOutline} style={{ fontSize: "2em", color: "var(--ion-color-dark-tint)" }} /> */}
                  <MediumParagraph>
                    Today, {todayDate()}
                  </MediumParagraph>
                </IonCard>
              </div>
            }


            {!loadingHabits && (
              habits.length === 0 ? (
                <ColumnContainer style={{ gap: "1em", alignItems: "center" }}>
                  <Lottie isClickToPauseDisabled={true} options={animationOptions} height={200} width={300} />
                  <Heading6>
                    Start by adding a new habit.
                  </Heading6>
                  <MediumParagraph>
                    <b>Grithub </b>
                    helps you keep track of your habits. Start by adding a new one
                  </MediumParagraph>


                  <IonButton mode="ios" routerLink="/new" style={{ "--background-hover-opacity": "0" }} fill="solid" color="primary">
                    <IonIcon icon={addOutline} />
                    <MediumButton>
                      Add a habit
                    </MediumButton>

                  </IonButton>
                </ColumnContainer>
              )
                :
                (
                  <SegmentedTasks inView={inView} onClickHandler={handleTaskSelection} />
                )
            )
            }


            <IonModal
              isOpen={showEditModal}
              cssClass="edit-modal"
              onDidDismiss={() => setShowEditModal(false)}
              swipeToClose={true}
              mode="ios"
            // presentingElement={pageRef.current}
            >
              <Heading5 style={{ textAlign: "center", margin: "2em 0" }}>Choose a new habit name</Heading5>

              <form onSubmit={(e) => handleEditChange(e)} className="ion-padding-horizontal" style={{ width: "100%" }}>
                <IonItem className="ion-margin-vertical">
                  <IonLabel position="floating">Habit Name</IonLabel>
                  <IonInput onIonChange={(e) => setEditedHabitName(e.detail.value || "")} value={editedHabitName}></IonInput>
                </IonItem>
                <IonButton type="submit" style={{ "--border-radius": "16px", "--padding-bottom": "16px", "--padding-top": "16px" }} className="ion-margin-top" size="large" expand="block" fill="solid" color="primary">
                  <LargeButton style={{ color: "var(--ion-color-light)" }}>
                    Save
                  </LargeButton>

                </IonButton>
              </form>

            </IonModal>
            <IonModal
              isOpen={showOptionsModal}
              cssClass="task-modal"
              onDidDismiss={() => setShowOptionsModal(false)}
              swipeToClose={true}
              mode="ios"
            // presentingElement={pageRef.current}

            >
              <div className="ion-padding-horizontal" style={{ width: "100%" }}>
                <div>
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
                  <Heading5 style={{ textAlign: "center", margin: "2em 0" }}>{selectedHabit?.name}</Heading5>

                  <IonItem
                    button={true}
                    style={{ "--background": "transparent" }}

                    onClick={() => handleTaskCompletion(selectedHabit?.id)}
                  >
                    <IonIcon icon={checkmarkCircleOutline}></IonIcon>
                    <IonLabel className="ion-padding">
                      {selectedHabit?.dates.includes(todayDateString)
                        ? "Uncheck"
                        : "Mark as completed"}
                    </IonLabel>
                  </IonItem>

                  <IonItem
                    button={true}
                    style={{ "--background": "transparent" }}
                    onClick={() => goToGraph(`/habit/${selectedHabit?.id}`)}
                  >
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel className="ion-padding">View Yearly Graph</IonLabel>
                  </IonItem>
                  <IonItem
                    button={true}
                    disabled={false}
                    style={{ "--background": "transparent" }}
                    onClick={() => handleTaskEdition(selectedHabit?.id)}
                  >
                    <IonIcon icon={pencil}></IonIcon>
                    <IonLabel className="ion-padding">Edit title</IonLabel>
                  </IonItem>
                  <IonItem
                    button={true}
                    style={{ "--background": "transparent" }}
                    onClick={() => {
                      setShowOptionsModal(false);
                      presentWarning({
                        cssClass: "warning-alert",
                        header: "Delete",
                        mode: "ios",
                        message: "Are you sure you want to permanently delete this habit ?",
                        buttons: [
                          "Cancel",
                          {
                            text: "Yes", handler: () => {
                              handleRemove(selectedHabit?.id);
                            }
                          }
                        ]
                      })
                    }}
                  >
                    <IonIcon color="danger" icon={trash}></IonIcon>
                    <IonLabel color="danger" className="ion-padding">Delete Habit</IonLabel>
                  </IonItem>
                </div>
              </div>
            </IonModal>
          </div>
        </div>
      </Content>
    </IonPage>
  );
};

export default Tab1;
