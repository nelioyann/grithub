import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonProgressBar, IonTitle, IonToolbar } from '@ionic/react';
import { addCircleOutline, settingsOutline } from 'ionicons/icons';
import { Heading4, LargeParagraph, MediumButton } from '../theme/globalStyles';
import './Tab2.css';
import { useHabits } from '../Contexts/habitsProvider';
import { getDateString, incrementToday } from '../components/Dates/DatesFunctions';
import WeeklyProgression from '../components/WeeklyProgression/WeeklyProgression';
import MonthlyGraphs from '../components/MonthlyProgression/MonthlyGraphs';
import {WeeklyChart} from '../components/Charts/WeeklyChart';
import Content from '../components/Content/Content';

const Tab2: React.FC = () => {
  const { habits, loadingHabits } = useHabits();
  // let todayDateString = getDateString(incrementToday(0));
  // const totalHabits = habits.length
  // const completedHabits = habits.filter(habit => habit.dates.includes(todayDateString)).length

  return (
    <IonPage >
      <IonHeader className="ion-padding-vertical ion-no-border" mode="ios">
        <IonToolbar color="light">
        <IonButtons slot="">
            <IonBackButton color="dark" text="" defaultHref="/tabs/habits" />
          </IonButtons>
          <IonTitle>
            <Heading4 style={{ color: "var(--ion-color-dark)", textAlign: "center", margin: "auto" }}>
              Statistics
            </Heading4>
          </IonTitle>
          {/* <IonButtons slot="end">
              <IonButton fill="clear" color="dark" routerLink="/settings">
                        <IonIcon icon={settingsOutline} />
                    </IonButton>
            </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <Content>
        <div className="page-wrapper ion-padding-horizontal">

          <div className="page-wrapper-content ">

            {!loadingHabits &&
               
               habits.length !== 0 ? (<>
                {/* <div style={{ textAlign: "center" }}>
                  <WeeklyProgression />
                </div> */}
                <WeeklyChart habits={habits}/>
                <MonthlyGraphs />

              </>)
              :
              (
                <div className="ion-padding" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                  <LargeParagraph style={{ textAlign: 'center' }}>No active habits</LargeParagraph>
                  <IonButton mode="ios" routerLink="/new" fill="solid">

                    <IonIcon color="dark" icon={addCircleOutline}></IonIcon>
                    <MediumButton>
                      Add a new one
                    </MediumButton>
                  </IonButton>
                </div>
              )

            }
          </div>
        </div>
      </Content>
    </IonPage>
  );
};

export default Tab2;
