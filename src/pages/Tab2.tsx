import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Headers/Header';
import { Heading4 } from '../theme/globalStyles';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage >
      <Header name="Community" icon={settingsOutline} iconTarget="/settings" />
      <IonContent fullscreen >
        <Header name="Community" icon={settingsOutline} collapsible={true} iconTarget="/settings" />
        <div className="page-wrapper ion-padding-horizontal">

          <div className="page-wrapper-content ">
            <Heading4 style={{marginTop: "5em", textAlign: "center" }}>
              Coming soon
            </Heading4>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
