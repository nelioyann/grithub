import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonProgressBar, IonTitle, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import { Heading4 } from '../theme/globalStyles';
import './Tab2.css';
import { useHabits} from '../Contexts/habitsProvider';
import { getDateString, incrementToday } from '../components/Dates/DatesFunctions';

const Tab2: React.FC = () => {
  const { habits, loadingHabits } = useHabits();
  let todayDateString = getDateString(incrementToday(0));
  const totalHabits = habits.length
  const completedHabits = habits.filter(habit => habit.dates.includes(todayDateString)).length

  return (
    <IonPage >
      <IonHeader className="ion-padding-vertical" mode="md">
          <IonToolbar color="light">
            <IonTitle>
              <Heading4>
                History
              </Heading4>
            </IonTitle>
            <IonButtons slot="end">
              <IonButton fill="clear" color="dark" routerLink="/settings">
                        <IonIcon icon={settingsOutline} />
                    </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      <IonContent fullscreen >
        <div className="page-wrapper ion-padding-horizontal">

          <div className="page-wrapper-content ">
            <Heading4 style={{margin: "5em auto 1em", textAlign: "center" }}>
              Today completion
            </Heading4>
            {!loadingHabits && 
            <div style={{textAlign: "center"}}>
            <IonProgressBar className="ion-margin-vertical" style={{padding: "0.5em", borderRadius: "5em"}} color="primary" value={completedHabits / totalHabits }></IonProgressBar>
              {completedHabits}/{totalHabits} completed habits today
            </div>
            }
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
