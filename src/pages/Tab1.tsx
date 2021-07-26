import { IonCard, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addCircle, addOutline, arrowForwardCircle, settingsOutline } from 'ionicons/icons';
import Header from '../components/Headers/Header';
import { NameContext } from '../Contexts/NameContext';
import { Heading2, Heading5 } from '../theme/globalStyles';
import './Tab1.css';
import React, { useContext } from 'react'


const Tab1: React.FC = () => {

  const { name, nameSet } = useContext(NameContext);

  const dummies = [{name: "Programming", id: 1, dates: [20210723]}, {name: "Reading", id: 2, dates: [20210723]}]
  let dummydate = Date.now();
  console.log(dummydate)
  return (
    <IonPage >
      <Header name="Habits" icon={settingsOutline} iconTarget="/settings" />
      <IonContent fullscreen >
        <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" />
        <div className="page-wrapper ion-padding-horizontal" >

          <div className="page-wrapper-content" style={{ position: 'relative' }}>
            <Heading2>
              Welcome back, {name != "" ? name : "Fellow Grithuber"}
            </Heading2>
            {/* <Heading5 style={{ marginTop: "3em", textAlign: "center" }}>
              You haven't set any habit yet
            </Heading5> */}
            {dummies ? (dummies.map(dummy =>{
              return(<IonCard className="ion-padding" key={dummy.id} button={true}>
                <IonCardTitle>{dummy.name}</IonCardTitle>
                <IonCardSubtitle>Streak: 000</IonCardSubtitle>
              </IonCard>)
            })): 
            (
              <Heading5 style={{ marginTop: "3em", textAlign: "center" }}>
              You haven't set any habit yet
            </Heading5>
            )
            }

            {/* <IonFab vertical="bottom" horizontal="end" slot="fixed"> */}
            <div style={{ position: "absolute", bottom: "0.5em", right: "0.8em" }}>

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
