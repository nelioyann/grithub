import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';
import Tabs from './components/Tabs/Tabs';
import Onboarding from './pages/Onboarding/Onboarding';
import Name from './pages/Name/Name';
import Settings from './pages/Settings/Settings';
import New from './pages/New/New';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* <IonTabs> */}
      <IonRouterOutlet>
        <Route path="/tabs"  >
          <Tabs />
        </Route>
        <Route path="/onboarding" exact={true} >
          <Onboarding />
        </Route>
        <Route path="/name" exact={true} >
          <Name />
        </Route>
        <Route path="/settings" exact={true} >
          <Settings />
        </Route>
        <Route path="/new" exact={true} >
          <New />
        </Route>
        <Redirect exact from="/" to="/onboarding" />
      </IonRouterOutlet>

      {/* </IonTabs> */}
    </IonReactRouter>
  </IonApp>
);

export default App;
