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
            <IonTitle style={{paddingLeft:0}}>
              <Heading4>
                Welcome back
              </Heading4>
            </IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/new" expand="block" fill="solid">
                Add a new goal
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
              )
            })) 
            }
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
