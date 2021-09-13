import { IonButton, IonButtons, IonCard, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addCircle, addOutline, arrowForwardCircle, flag, settingsOutline } from 'ionicons/icons';
import Header from '../components/Headers/Header';
import { NameContext } from '../Contexts/NameContext';
import { Heading4, Heading5 } from '../theme/globalStyles';
import './Tab1.css';
import React, { useContext } from 'react'
import TaskItem from '../components/Tasks/TaskItem';
import ViewTask from '../components/Tasks/ViewTask';
import { useHabits } from '../Contexts/habitsProvider';
import { getDateString } from '../components/Dates/DatesFunctions';
import Avatar from "boring-avatars";


const Tab1: React.FC = () => {

  const { name, nameSet } = useContext(NameContext);
  const { habits } = useHabits();
  // console.log("habits",habits)

  return (
    <IonPage >
      {/* <Header name="Habits" icon={settingsOutline} iconTarget="/settings" /> */}
      <IonContent fullscreen >
        <IonHeader className="ion-padding-vertical" mode="md">
          <IonToolbar color="light">
            <IonTitle>
              <Heading4>
                Welcome back
              </Heading4>
            </IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/settings">
              <Avatar
                  size={32}
                  name={name != "" ? name : "Fellow Grithuber"}
                  variant="beam"
                  colors={["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"]}
                />
                
                
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div className="page-wrapper ion-padding-horizontal" >

          <div className="page-wrapper-content" style={{ position: 'relative' }}>

            {/* <Heading5 style={{ marginTop: "3em", textAlign: "center" }}>
              You haven't set any habit yet
            </Heading5> */}
            {habits.length != 0 ? (<Heading5>
              Take a moment to tick off what you achieved today
              </Heading5>) :
              (<Heading5>You have no active habits</Heading5>)}
            {habits && (habits.map(habit => {
              return (
                <TaskItem key={habit.id} name={habit.name} id={habit.id} dates={habit.dates} />
                // <IonCard mode="ios" className="ion-padding-horizontal" routerLink="/habit" color="light"  style={{ border: "2px solid"}} key={habit.id} button={true}>

                //   <Heading5>{habit.name}</Heading5>
                // </IonCard>
              )
            })) 
            }

            {/* <IonCard mode="ios"  routerLink="/new" color="light"  > */}
            <IonButton expand="block" routerLink="/new" fill="solid" style={{  marginLeft: "0", marginRight: "0" }}>
              <div className="ion-padding ">

              Add a new habit
              </div>
              <IonIcon  icon={flag} />
            </IonButton>

            {/* </IonCard> */}
            {/* <ViewTask/> */}
            {/* <IonFab vertical="bottom" horizontal="end" slot="fixed"> */}

            {/* </IonFab> */}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
