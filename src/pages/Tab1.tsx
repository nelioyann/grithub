import {
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
  IonItem,
  IonLabel,
  IonLoading,
  IonModal,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import {
  add,
  addCircle,
  addOutline,
  arrowForwardCircle,
  bed,
  calendar,
  checkmarkCircle,
  checkmarkCircleOutline,
  createOutline,
  flag,
  settingsOutline,
} from "ionicons/icons";
import Header from "../components/Headers/Header";
import { NameContext } from "../Contexts/NameContext";
import { Heading4, Heading5, MediumParagraph, MediumButton, Heading6 } from "../theme/globalStyles";
import "./Tab1.css";
import React, { useContext, useEffect, useState } from "react";
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

const Tab1: React.FC = () => {
  const { name, nameSet } = useContext(NameContext);
  const { habits, loadingHabits } = useHabits();
  let todayDateString = getDateString(incrementToday(0));

  const [showModal, setShowModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<IHabit>();
  // State of the current habit
  const [habitChecked, setHabitChecked] = useState<boolean | undefined>(
    selectedHabit?.dates.includes(todayDateString)
  );
  const [inView, setInView] = useState<boolean>(false);

  const handleTaskSelection = (habit: IHabit) => {
    // console.log(habit.name, "selected")
    setSelectedHabit(habit);
    setShowModal(true);
    console.log("New item selected", habitChecked, selectedHabit);
  };

  const handleTaskCompletion = (id: string | undefined) => {
    console.log("Handle COmpletion fired");
    setHabitChecked(selectedHabit?.dates.includes(todayDateString));
  };
  const router = useIonRouter();
  const goToGraph = (path: string) => {
    setShowModal(false);
    router.push(path, "forward");
  };

  // Modal cleanup
  useEffect(() => {
    console.log("Modal cleanup");
    return () => setShowModal(false);
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
    setShowModal(false);
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
    console.log("view did enter");
    setInView(true);
    // elTask?.current?.classList.add("animated");
  });
  return (
    <IonPage>
      {/* <Header name="Habits" icon={settingsOutline} iconTarget="/settings" /> */}
        <IonHeader className="ion-padding-vertical" mode="md">
          <IonToolbar color="light">
            <IonTitle>
              <Heading4 style={{ color: "var(--ion-color-primary)"}}>{todayDate()}</Heading4>
            </IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/new" color="dark" fill="clear">
                {/* <IonIcon icon={add}></IonIcon> */}
                <IonIcon icon={createOutline}></IonIcon>
              </IonButton>
              <IonButton fill="clear" color="dark" routerLink="/settings">
                <IonIcon icon={settingsOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      <IonContent fullscreen>
        <div
          className="page-wrapper ion-padding-horizontal"
          style={{ alignItems: "center" }}
        >
          <div
            className="page-wrapper-content"
            style={{ position: "relative" }}
          >
            {!loading && <Heading6>Hey @{name}</Heading6>}
            {loading === false && !user?.email && (
              <IonCard style={{marginLeft: "0", marginRight: "0"}} className="ion-padding ion-margin-vertical" color="tertiary">
                <Heading5
                  style={{ color: "var(--ion-color-tertiary-contrast)" }}
                >
                  Join Grithub
                </Heading5>
                <MediumParagraph style={{ color: "var(--ion-color-tertiary-contrast)" }}>
                  Create your Grithub account to enjoy personalized content and realtime syncing across all of your devices.
                </MediumParagraph>
                <IonButton routerLink="/settings" mode="ios" color="light">
                  <MediumButton>Go to settings</MediumButton>
                </IonButton>
              </IonCard>
            )}
            {/* <Heading5 style={{ marginTop: "3em", textAlign: "center" }}>
              You haven't set any habit yet
            </Heading5> */}
            {/* { !loadingHabits && habits.length !== 0 && () } */}
            {habits && habits.length !== 0 && loadingHabits === false ? (
              <div style={{marginTop: "3em"}}>
                <Heading5>
                  Take a moment to tick off what you achieved today
                </Heading5>
                {habits.map((habit, index) => {
                  return (
                    <TaskItem
                      inView={inView}
                      taskIndex={index}
                      onClickHandler={() => handleTaskSelection(habit)}
                      key={habit.id}
                      id={habit.id}
                    />
                  );
                })}
              </div>
            ) : (
              <IonLoading
                isOpen={loadingHabits}
                message="Retrieving data"
              ></IonLoading>
            )}

            {habits && habits.length === 0 && loadingHabits === false && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "1em 0"
                }}
              >
                <svg
                  className="info__image"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  width="60"
                  height="61"
                  viewBox="0 0 60 61"
                >
                  <g id="group-131svg">
                    <path
                      d="M20.537,55.503 C20.537,55.503 24.719,55.503 24.719,55.503 C25.525,55.503 26.179,55.796 26.179,56.158 C26.179,56.520 25.525,56.814 24.719,56.814 C24.719,56.814 24.524,56.814 24.524,56.814 C23.718,56.814 23.064,57.108 23.064,57.470 C23.064,57.832 23.718,58.125 24.524,58.125 C24.524,58.125 33.515,58.125 33.515,58.125 C34.322,58.125 34.975,58.419 34.975,58.781 C34.975,59.143 34.322,59.436 33.515,59.436 C33.515,59.436 22.710,59.436 22.710,59.436 C22.710,59.436 10.835,59.436 10.835,59.436 C10.029,59.436 9.375,59.143 9.375,58.781 C9.375,58.419 10.029,58.125 10.835,58.125 C10.835,58.125 13.331,58.125 13.331,58.125 C14.137,58.125 14.790,57.832 14.790,57.470 C14.790,57.108 14.137,56.814 13.331,56.814 C13.331,56.814 1.455,56.814 1.455,56.814 C0.649,56.814 -0.005,56.520 -0.005,56.158 C-0.005,55.796 0.649,55.503 1.455,55.503 C1.455,55.503 4.262,55.503 4.262,55.503 C4.262,55.503 20.537,55.503 20.537,55.503 Z"
                      id="path-1"
                      className="cls-3"
                      fillRule="evenodd"
                    />
                    <path
                      d="M46.423,60.004 C47.343,60.004 48.090,59.669 48.090,59.255 C48.090,58.842 47.343,58.506 46.423,58.506 C46.423,58.506 41.314,58.506 41.314,58.506 C40.393,58.506 39.647,58.842 39.647,59.255 C39.647,59.669 40.393,60.004 41.314,60.004 C41.314,60.004 46.423,60.004 46.423,60.004 Z"
                      id="path-2"
                      className="cls-3"
                      fillRule="evenodd"
                    />
                    <path
                      d="M50.378,50.578 C50.378,50.578 52.298,50.578 52.298,50.578 C52.668,50.578 52.969,50.744 52.969,50.950 C52.969,51.155 52.668,51.321 52.298,51.321 C52.298,51.321 52.209,51.321 52.209,51.321 C51.838,51.321 51.538,51.488 51.538,51.693 C51.538,51.899 51.838,52.065 52.209,52.065 C52.209,52.065 56.337,52.065 56.337,52.065 C56.707,52.065 57.008,52.232 57.008,52.437 C57.008,52.642 56.707,52.809 56.337,52.809 C56.337,52.809 51.376,52.809 51.376,52.809 C51.376,52.809 41.235,52.809 41.235,52.809 C40.865,52.809 40.564,52.642 40.564,52.437 C40.564,52.232 40.865,52.065 41.235,52.065 C41.235,52.065 42.381,52.065 42.381,52.065 C42.751,52.065 43.051,51.899 43.051,51.693 C43.051,51.488 42.751,51.321 42.381,51.321 C42.381,51.321 36.928,51.321 36.928,51.321 C36.558,51.321 36.257,51.155 36.257,50.950 C36.257,50.744 36.558,50.578 36.928,50.578 C36.928,50.578 38.217,50.578 38.217,50.578 C38.217,50.578 50.378,50.578 50.378,50.578 Z"
                      id="path-3"
                      className="cls-3"
                      fillRule="evenodd"
                    />
                    <path
                      d="M35.813,53.211 C36.504,53.211 37.063,53.074 37.063,52.904 C37.063,52.733 36.504,52.596 35.813,52.596 C35.813,52.596 31.980,52.596 31.980,52.596 C31.289,52.596 30.729,52.733 30.729,52.904 C30.729,53.074 31.289,53.211 31.980,53.211 C31.980,53.211 35.813,53.211 35.813,53.211 Z"
                      id="path-4"
                      className="cls-3"
                      fillRule="evenodd"
                    />
                    <path
                      d="M48.696,53.067 C48.316,53.067 47.954,52.850 47.786,52.482 C47.786,52.482 45.183,46.781 45.183,46.781 C44.954,46.279 45.175,45.685 45.678,45.456 C46.178,45.227 46.773,45.448 47.002,45.951 C47.002,45.951 49.605,51.651 49.605,51.651 C49.834,52.154 49.613,52.747 49.110,52.977 C48.976,53.038 48.835,53.067 48.696,53.067 Z"
                      id="path-5"
                      className="cls-7"
                      fillRule="evenodd"
                    />
                    <path
                      d="M17.178,53.067 C17.039,53.067 16.897,53.038 16.763,52.977 C16.261,52.747 16.039,52.154 16.269,51.651 C16.269,51.651 18.871,45.951 18.871,45.951 C19.100,45.448 19.694,45.226 20.195,45.456 C20.698,45.685 20.919,46.279 20.690,46.781 C20.690,46.781 18.088,52.482 18.088,52.482 C17.920,52.850 17.557,53.067 17.178,53.067 Z"
                      id="path-6"
                      className="cls-7"
                      fillRule="evenodd"
                    />
                    <path
                      d="M59.027,25.272 C59.027,39.227 47.714,50.540 33.759,50.540 C19.804,50.540 8.491,39.227 8.491,25.272 C8.491,11.316 19.804,0.004 33.759,0.004 C47.714,0.004 59.027,11.316 59.027,25.272 Z"
                      id="path-7"
                      className="cls-3"
                      fillRule="evenodd"
                    />
                    <path
                      d="M52.762,25.272 C52.762,35.767 44.254,44.275 33.759,44.275 C23.264,44.275 14.756,35.767 14.756,25.272 C14.756,14.776 23.264,6.268 33.759,6.268 C44.254,6.268 52.762,14.776 52.762,25.272 Z"
                      id="path-8"
                      className="cls-10"
                      fillRule="evenodd"
                    />
                    <path
                      d="M45.665,25.272 C45.665,31.847 40.334,37.177 33.759,37.177 C27.184,37.177 21.853,31.847 21.853,25.272 C21.853,18.696 27.184,13.366 33.759,13.366 C40.334,13.366 45.665,18.696 45.665,25.272 Z"
                      id="path-9"
                      className="cls-3"
                      fillRule="evenodd"
                    />
                    <path
                      d="M39.016,25.272 C39.016,28.175 36.663,30.529 33.759,30.529 C30.855,30.529 28.501,28.175 28.501,25.272 C28.501,22.368 30.855,20.014 33.759,20.014 C36.663,20.014 39.016,22.368 39.016,25.272 Z"
                      id="path-10"
                      className="cls-10"
                      fillRule="evenodd"
                    />
                    <path
                      d="M41.434,1.194 C46.888,5.829 50.352,12.734 50.352,20.452 C50.352,34.407 39.040,45.720 25.084,45.720 C22.408,45.720 19.830,45.301 17.409,44.530 C21.817,48.275 27.522,50.540 33.759,50.540 C47.714,50.540 59.027,39.227 59.027,25.272 C59.027,13.993 51.636,4.444 41.434,1.194 Z"
                      id="path-11"
                      className="cls-13"
                      fillRule="evenodd"
                    />
                  </g>
                </svg>
                <Heading5>You have no active goals</Heading5>
                <IonButton mode="ios" routerLink="/new" fill="solid">
                  <MediumButton>

                  Add a new one
                  </MediumButton>
                </IonButton>
              </div>
            )}

            <IonModal
              isOpen={showModal}
              cssClass="task-modal"
              onDidDismiss={() => setShowModal(false)}
              swipeToClose={true}
              mode="ios"
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
                  <Heading5 style={{textAlign: "center", margin: "2em 0"}}>{selectedHabit?.name}</Heading5>

                  <IonItem
                    button={true}
                    color="light"
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
                    color="light"

                    onClick={() => goToGraph(`/habit/${selectedHabit?.id}`)}
                  >
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel className="ion-padding">View history</IonLabel>
                  </IonItem>
                </div>
              </div>
            </IonModal>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
