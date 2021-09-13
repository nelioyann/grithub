import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { apps, ellipse, globeOutline, square, triangle } from 'ionicons/icons';
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
// import Tabs from './components/Tabs/Tabs';
import Onboarding from './pages/Onboarding/Onboarding';
import Name from './pages/Name/Name';
import Settings from './pages/Settings/Settings';
import New from './pages/New/New';
import DarkModeContextProvider from './Contexts/DarkModeContext';
import NameContextProvider from './Contexts/NameContext';
import LoginPage from './pages/Authentification/LoginPage';
import CreateAccountPage from './pages/Authentification/CreateAccountPage';
import { AuthContextProvider, useAuth, } from './Contexts/authProvider';
import { HabitsContextProvider, useHabits } from './Contexts/habitsProvider';
import { firebaseAuth } from './initFirebase';
import { useEffect } from 'react';
import ViewTask from './components/Tasks/ViewTask';
import Attributions from './pages/Attributions/Attributions';

const App: React.FC = () => {
  const { loading } = useAuth()
  let isAuth = firebaseAuth.currentUser !== null;

  // console.log(loading)

  if (loading) {
    return (
      <IonApp>
        <IonLoading isOpen={loading} message="Loading..." />
      </IonApp>
    )
  }




  return (<IonApp>
    <IonReactRouter>
      {/* <IonTabs> */}
      <IonRouterOutlet>
        <DarkModeContextProvider>
          <NameContextProvider>
            <HabitsContextProvider>

              <Route exact={true} path="/">

                <Redirect to="/onboarding" />
              </Route>
              {/* Important to keep these inlines for privating routes */}
              <PrivateRoute path="/tabs" component={Tabs} />

              <Route path="/new" component={New} />
              <Route path="/onboarding" exact={true}>
                
                {isAuth ? <Redirect to="/tabs/habits"/> : <Onboarding />}
              </Route>

              <Route path="/settings" component={Settings} />
              <PrivateRoute path="/attributions" component={Attributions} />

              <Route path="/habit/:id" exact={true} component={ViewTask} />
              <Route path="/name" exact={true} >
                <Name />
              </Route>

              <Route path="/login" exact={true}>
                {isAuth ? <Redirect to="/tabs/habits" /> : <LoginPage />}
              </Route>

              <Route path="/create-account" exact={true}>
                <CreateAccountPage />
              </Route>
            </HabitsContextProvider>
          </NameContextProvider>
        </DarkModeContextProvider>
      </IonRouterOutlet>

      {/* </IonTabs> */}
    </IonReactRouter>
  </IonApp>)
};

export default App;

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  // const {user, loading} = useAuth();
  const isAuth = firebaseAuth.currentUser !== null;
  // const isAuth = true
  // console.log(isAuth)
  // auth.session to get the current user's auth state
  return (
    <Route
      {...rest}
      render={(props) => isAuth ? <Component {...props} /> : <Redirect to="/login" />}

    />
  )
}

const Tabs: React.FC = () => {
  return (
    <IonTabs >
      <IonRouterOutlet>
        <Route exact path="/tabs/habits">
          <Tab1 />
        </Route>
        <Route exact path="/tabs/community">
          <Tab2 />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/habits" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar className="bottom-tab-bar" style={{ backgroundColor: "var(--ion-color-light)", "--background": "var(--ion-color-light)", "--color-selected": "var(--ion-color-primary-shade)", "--color": "var(--ion-color-medium-shade)", height: "70px", border: "none" }} slot="bottom" >
        <IonTabButton tab="tab1" href="/tabs/habits">
          <IonIcon icon={apps} />
          <IonLabel>Today</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/community">
          <IonIcon icon={globeOutline} />
          <IonLabel>Feed</IonLabel>
        </IonTabButton>

      </IonTabBar>
    </IonTabs>
  )
}