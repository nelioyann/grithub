import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  IonSlides,
  IonSlide,
  IonBadge,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { square, squareOutline, trash } from "ionicons/icons";
import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useAuth } from "../../Contexts/authProvider";
import { IHabit, useHabits } from "../../Contexts/habitsProvider";
import { firebaseStore } from "../../initFirebase";
import {
  Heading4,
  Heading5,
  Heading6,
  RowContainer,
  SmallParagraph,
} from "../../theme/globalStyles";
import Content from "../Content/Content";
import { getDateString, todayDate } from "../Dates/DatesFunctions";
import Header from "../Headers/Header";
import MonthlyGraph from "../MonthlyProgression/MonthlyGraph";
import { toast } from "../Toasts/Toast";
import "./ViewTask.css";

type RouteParams = {
  id: string;
};

const ViewTask: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const router = useIonRouter();

  const { habits } = useHabits();
  const { user } = useAuth();
  const [habit] = habits.filter((habit: IHabit) => habit.id === id);
  let today = new Date();


  const startDate = habit?.dates && habit?.dates.length > 0 ? habit.dates[0] : getDateString(today);

  // if (!habit) history.replace("/tabs/habits")


  // const yearlySquares = Array.from(Array(31 * 12).keys())
  const yearlySquares = Array.from({ length: 12 * 31 }, (_, i) => i + 1);
  const monthlySquares = Array.from({ length: 31 }, (_, i) => i + 1);

  //   console.log("Monthly", monthlySquares);

  let startDateReachedMonth = false;
  let todayReachedMonth = false;

  let startDateReachedYear = false;
  let todayReachedYear = false;

  // a ref variable to handle the current slider
  const slider = useRef<HTMLIonSlidesElement>(null);
  // Segment State
  const [graphViewSegment, setgraphViewSegment] = useState("0");
  // a function to handle the segment changes
  const handleSegmentChange = (e: any) => {
    setgraphViewSegment(e.detail.value);
    slider.current!.slideTo(e.detail.value);
  };
  // a function to handle the slider changes
  const handleSlideChange = async (event: any) => {
    let index: number = 0;
    await event.target.getActiveIndex().then((value: any) => (index = value));
    setgraphViewSegment("" + index);
  };
  return (
    <IonPage>
      {/* <IonHeader mode="ios" className="ion-padding-vertical ion-no-border">
        <IonToolbar color="light">
          <IonButtons slot="">
            <IonBackButton color="dark" text="" defaultHref="/tabs/habits" />
          </IonButtons>
          <IonTitle>
            <Heading6>{habit?.name}</Heading6>
          </IonTitle>
          
        </IonToolbar>
      </IonHeader> */}
      <Header name={habit?.name} withBackButton backButtonLink="tabs/habits"/>
      <Content>
        <div className="page-wrapper ion-padding-horizontal">
          <div className="page-wrapper-content ">

          

              <IonSegment
              mode="ios"
                value={graphViewSegment}
                onIonChange={(e) => handleSegmentChange(e)}
              >
                <IonSegmentButton value="0">
                  <IonLabel>This Month</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="1">
                  <IonLabel>This Year</IonLabel>
                </IonSegmentButton>
              </IonSegment>
           

            <IonSlides
              onIonSlideDidChange={(e) => handleSlideChange(e)}
              ref={slider}
              options={ {spaceBetween: 12}}
              className="ion-margin-vertical"
            >
              <IonSlide>
              <Heading5>{todayDate("month")}</Heading5>

              <MonthlyGraph habit={habit} />
                
              </IonSlide>
              <IonSlide>
                {/* <IonCard> */}
                <Heading5>This year</Heading5>
                <div className="yearGraph">
                  <ul className="months">
                    <li>Jan</li>
                    <li>Feb</li>
                    <li>Mar</li>
                    <li>Apr</li>
                    <li>May</li>
                    <li>Jun</li>
                    <li>Jul</li>
                    <li>Aug</li>
                    <li>Sep</li>
                    <li>Oct</li>
                    <li>Nov</li>
                    <li>Dec</li>
                  </ul>
                  <ul className="days">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                    <li>15</li>
                    <li>16</li>
                    <li>17</li>
                    <li>18</li>
                    <li>19</li>
                    <li>20</li>
                    <li>21</li>
                    <li>22</li>
                    <li>23</li>
                    <li>24</li>
                    <li>25</li>
                    <li>26</li>
                    <li>27</li>
                    <li>28</li>
                    <li>29</li>
                    <li>30</li>
                    <li>31</li>
                  </ul>
                  <ul className="squares">
                    {habit &&
                      habit?.dates &&
                      yearlySquares.map((index, calendarSquare) => {
                        let month = Math.ceil(index / 31)
                          .toString()
                          .padStart(2, "0");
                        let day =
                          index % 31 === 0
                            ? "31"
                            : (index % 31).toString().padStart(2, "0");
                            let year = today.getFullYear().toString();
                        let date = month + day + year;
                        if (parseInt(date) >= parseInt(startDate)) startDateReachedYear = true;
                        if (parseInt(date) >= parseInt(getDateString(today))) todayReachedYear = true;
                        return (
                          <li
                            className={habit.dates.includes(date) && startDateReachedYear ? "completed" : "uncompleted"}
                            key={"calendarSquare" + index}
                            data-level={startDateReachedYear && !todayReachedYear ? "tracked" : "untracked"}
                            data-day={day}
                            data-month={month}
                          >
                            <SmallParagraph style={{ margin: 0, color: "inherit", padding: "0", fontWeight: "lighter" }}>
                              {index % 31 === 0
                                ? "31"
                                : (index % 31).toString()}
                            </SmallParagraph>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                {/* </IonCard> */}
              </IonSlide>
              
            </IonSlides>
          </div>
        </div>
      </Content>
    </IonPage>
  );
};

export default ViewTask;
