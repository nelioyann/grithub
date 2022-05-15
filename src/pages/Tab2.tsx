import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { add, settings, settingsOutline } from 'ionicons/icons';
import { Heading4, LargeParagraph, MediumButton } from '../theme/globalStyles';
import './Tab2.css';
import { useHabits } from '../Contexts/habitsProvider';
import MonthlyGraphs from '../components/MonthlyProgression/MonthlyGraphs';
import { WeeklyChart } from '../components/Charts/WeeklyChart';
import Content from '../components/Content/Content';
import Lottie from 'react-lottie';

import statsAnimation from "./stats.json"
import { Button } from '../components/Buttons/Button';
import Header from '../components/Headers/Header';
const animationOptions = {
  loop: true,
  autoplay: true,
  animationData: statsAnimation,

}
const Tab2: React.FC = () => {
  const { habits, loadingHabits } = useHabits();

  return (
    <IonPage >
      <Header name='Statistics' icon={settingsOutline} iconTarget="/settings"/>
      {/* <IonHeader className="ion-padding-vertical ion-no-border" mode="ios">
        <IonToolbar color="light">
          <IonButtons slot="primary" collapse={true}>
            <IonButton fill="clear" color="dark" routerLink={"/settings"}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>
            <Heading4 style={{ color: "var(--ion-color-dark)", textAlign: "center", margin: "auto" }}>
              Statistics
            </Heading4>
          </IonTitle>
          
        </IonToolbar>
      </IonHeader> */}
      <Content>
        <div className="page-wrapper ion-padding-horizontal" style={{ alignItems: "center" }}>
          <div className="page-wrapper-content ">
            {!loadingHabits &&
              habits.length !== 0 ? (<>
                <WeeklyChart habits={habits} />
                <MonthlyGraphs />

              </>)
              :
              (
                <div className="ion-padding" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                  <Lottie isClickToPauseDisabled={true} options={animationOptions} height={250} width={300} />
                  <Heading4 as="p">Display your progression</Heading4>
                  <LargeParagraph style={{ textAlign: 'center' }}>
                    Your progress will be displayed here, once you have added some habits.
                  </LargeParagraph>
                  <IonButton mode="ios" routerLink="/new" fill="solid">
                    <IonIcon icon={add}></IonIcon>
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
