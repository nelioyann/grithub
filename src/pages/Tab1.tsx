import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import Header from '../components/Headers/Header';
import { Heading2, Heading5 } from '../theme/globalStyles';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage >
      <Header name="Habits" icon={settingsOutline} iconTarget="/onboarding" />
      <IonContent fullscreen >
        <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" />
        <div className="page-wrapper ion-padding-horizontal">

          <div className="page-wrapper-content ">
            <Heading2>
              Welcome back, John Dough
            </Heading2>
            <Heading5>
            Here are your ongoing habits
            </Heading5>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
