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
import { calendarOutline, settingsOutline, statsChartOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';

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
import { DarkModeContextProvider } from './Contexts/DarkModeContext';
import NameContextProvider from './Contexts/NameContext';
import LoginPage from './pages/Authentification/LoginPage';
import CreateAccountPage from './pages/Authentification/CreateAccountPage';
import { AuthContextProvider, useAuth, } from './Contexts/authProvider';
import { HabitsContextProvider, useHabits } from './Contexts/habitsProvider';
import { firebaseAuth } from './initFirebase';
import { useEffect } from 'react';
import ViewTask from './components/Tasks/ViewTask';
import Attributions from './pages/Attributions/Attributions';
import Loader from './pages/Loader/Loader';

const App: React.FC = () => {
  const { loading } = useAuth();
  const { habits, loadingHabits } = useHabits();
  let isAuth = firebaseAuth.currentUser !== null;

  // console.log(loading)

  if (loading) {
    return (
      <IonApp>
        {/* <IonLoading isOpen={loading === loadingHabits === true} message="Loading..." /> */}
        {loadingHabits && <Loader/>}
      </IonApp>
    )
  }




  return (
    <IonApp>
      <IonReactRouter>
        {/* <IonTabs> */}
        <DarkModeContextProvider>
          <NameContextProvider>
            <HabitsContextProvider>

              <IonRouterOutlet id="main">
                <Route exact={true} path="/">
                  <Redirect to="/onboarding" />
                </Route>
                {/* Important to keep these inlines for privating routes */}
                <Route path="/tabs" component={Tabs} />
                <Route exact={true} path="/new" component={New} />
                <Route path="/onboarding" exact={true}>
                  {isAuth ? <Redirect to="/tabs/habits" /> : <Onboarding />}
                </Route>
                <Route path="/login" exact={true}>
                  {isAuth ? <Redirect to="/tabs/habits" /> : <LoginPage />}
                </Route>
                {/* <Route exact={true} path="/tabs/settings" component={Settings} /> */}
                <PrivateRoute exact={true} path="/attributions" component={Attributions} />

                <Route path="/habit/:id" exact={true} component={ViewTask} />
                <Route path="/name" exact={true} component={Name} />



                <Route path="/create-account" exact={true}>
                  <CreateAccountPage />
                </Route>
              </IonRouterOutlet>
            </HabitsContextProvider>
          </NameContextProvider>
        </DarkModeContextProvider>

        {/* </IonTabs> */}
      </IonReactRouter>
    </IonApp>)
};

export default App;


// const PrivateRout: React.FC<{
//   component: React.FC,
//   path: string,
//   exact: boolean
// }> = (props) => {
//   const isAuth = firebaseAuth.currentUser !== null;
//   return (
//     isAuth ? (<Route path={props.path} exact={props.exact} component={props.component} />) :
//       (<Redirect to="/login" />)

//   )

// }

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  // const {user, loading} = useAuth();
  const isAuth = firebaseAuth.currentUser !== null;
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

      <PrivateRoute exact path="/tabs/habits" component={Tab1} />
        <Route exact path="/tabs/stats">
          <Tab2 />
        </Route>
        <Route exact path="/tabs/settings">
          <Settings />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/habits" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar className="bottom-tab-bar" style={{ backgroundColor: "var(--ion-color-light)", "--background": "var(--ion-color-light)", "--color-selected": "var(--ion-color-primary-shade)", "--color": "var(--ion-color-medium-shade)", height: "70px" }} slot="bottom" >
        <IonTabButton layout="icon-start" tab="tab1" href="/tabs/habits">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Today</IonLabel>
        </IonTabButton>
        <IonTabButton layout="icon-start" tab="tab2" href="/tabs/stats">
          <IonIcon icon={statsChartOutline} />
          <IonLabel>Stats</IonLabel>
        </IonTabButton>
        <IonTabButton layout="icon-start" tab="tab3" href="/tabs/settings">
          <IonIcon icon={settingsOutline} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>

      </IonTabBar>
    </IonTabs>
  )
}