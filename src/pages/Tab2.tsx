import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Headers/Header';
import { Heading4 } from '../theme/globalStyles';
import './Tab2.css';

const Tab2: React.FC = () => {
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
            <Heading4 style={{marginTop: "5em", textAlign: "center" }}>
              Coming soon...
            </Heading4>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
