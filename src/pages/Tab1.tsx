import { IonButton, IonButtons, IonCard, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addCircle, addOutline, arrowForwardCircle, settingsOutline } from 'ionicons/icons';
import Header from '../components/Headers/Header';
import { NameContext } from '../Contexts/NameContext';
import { Heading4, Heading5 } from '../theme/globalStyles';
import './Tab1.css';
import React, { useContext } from 'react'
import TaskItem from '../components/Tasks/TaskItem';
import ViewTask from '../components/Tasks/ViewTask';


const Tab1: React.FC = () => {

  const { name, nameSet } = useContext(NameContext);

  const dummies = [{ name: "Programming", id: 1, dates: [20210723] }, { name: "Reading", id: 2, dates: [20210723] }]
  let dummydate = Date.now();
  console.log(dummydate)
  return (
    <IonPage >
      {/* <Header name="Habits" icon={settingsOutline} iconTarget="/settings" /> */}
      <IonContent fullscreen >
        <IonHeader className="ion-padding-vertical">
          <IonToolbar color="light">
            <IonTitle>
              <Heading4>
                Welcome back, {name != "" ? name : "Fellow Grithuber"}
              </Heading4>
            </IonTitle>
            <IonButtons slot="end">
              <IonButton>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="2.85714" fill="white" />
                  <rect width="32" height="32" rx="16" fill="white" />
                  <rect x="7.42857" y="18.8571" width="2.85714" height="2.85714" rx="1.42857" fill="black" />
                  <rect x="17.1429" y="18.8571" width="2.85714" height="2.85714" rx="1.42857" fill="black" />
                  <path d="M10.8571 25.1429H17.1429" stroke="black" stroke-width="1.71429" stroke-linecap="round" />
                </svg>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div className="page-wrapper ion-padding-horizontal" >

          <div className="page-wrapper-content" style={{ position: 'relative' }}>
            
            {/* <Heading5 style={{ marginTop: "3em", textAlign: "center" }}>
              You haven't set any habit yet
            </Heading5> */}
            {dummies ? (dummies.map(dummy => {
              return (<IonCard mode="ios" routerLink="/habit" className="ion-padding" key={dummy.id} button={true}>
                <IonCardTitle>{dummy.name}</IonCardTitle>
                <IonCardSubtitle>Streak: 000</IonCardSubtitle>
              </IonCard>)
            })) :
              (
                <Heading5 style={{ marginTop: "3em", textAlign: "center" }}>
                  You haven't set any habit yet
                </Heading5>
              )
            }
            <TaskItem/>
            {/* <ViewTask/> */}
            {/* <IonFab vertical="bottom" horizontal="end" slot="fixed"> */}
            <div style={{ position: "absolute", bottom: "2.5rem", right: "0.8em" }}>

              <IonFabButton routerLink="/new">
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </div>
            {/* </IonFab> */}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
