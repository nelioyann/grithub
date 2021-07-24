import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addCircle, addOutline, arrowForwardCircle, settingsOutline } from 'ionicons/icons';
import Header from '../components/Headers/Header';
import { Heading2, Heading5 } from '../theme/globalStyles';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage >
      <Header name="Habits" icon={settingsOutline} iconTarget="/settings" />
      <IonContent fullscreen >
        <Header name="Habits" icon={settingsOutline} collapsible={true} iconTarget="/settings" />
        <div className="page-wrapper ion-padding-horizontal" >

          <div className="page-wrapper-content" style={{ position: 'relative' }}>
            <Heading2>
              Welcome back, John Dough
            </Heading2>
            <Heading5 style={{ marginTop: "3em", textAlign: "center" }}>
              You haven't set any habit yet
            </Heading5>

            {/* <IonFab vertical="bottom" horizontal="end" slot="fixed"> */}
            <div style={{ position: "absolute", bottom: "0", right: "1em" }}>

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
