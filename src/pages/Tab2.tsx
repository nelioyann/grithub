import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonProgressBar, IonTitle, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import { Heading4 } from '../theme/globalStyles';
import './Tab2.css';
import { useHabits} from '../Contexts/habitsProvider';
import { getDateString, incrementToday } from '../components/Dates/DatesFunctions';
import WeeklyProgression from '../components/WeeklyProgression/WeeklyProgression';
import MonthlyGraphs from '../components/MonthlyProgression/MonthlyGraphs';

const Tab2: React.FC = () => {
  const { habits, loadingHabits } = useHabits();
  // let todayDateString = getDateString(incrementToday(0));
  // const totalHabits = habits.length
  // const completedHabits = habits.filter(habit => habit.dates.includes(todayDateString)).length

  return (
    <IonPage >
      <IonHeader className="ion-padding-vertical" mode="md">
          <IonToolbar color="light">
            <IonTitle>
              <Heading4 style={{ color: "var(--ion-color-primary)"}}>
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
      <IonContent fullscreen >
        <div className="page-wrapper ion-padding-horizontal">

          <div className="page-wrapper-content ">
            
            {!loadingHabits && 
            <div style={{textAlign: "center"}}>
              <WeeklyProgression />
            </div>
            }
            <MonthlyGraphs habits={habits} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
