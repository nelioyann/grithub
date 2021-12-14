import { React, useEffect, useState, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useHabits, IHabit } from "../../Contexts/habitsProvider";
import { useDarkMode } from "../../Contexts/DarkModeContext";
import { useUsername } from "../../Contexts/NameContext";
import Examples from "./Examples";

import { useIonRouter, useIonModal } from "@ionic/react";
import {
  getDateString,
  incrementToday,
  todayDate,
} from "../Dates/DatesFunctions";
import { getWeeklyValues } from "../Charts/WeeklyChart";
import { useAuth } from "../../Contexts/authProvider";
import { firebaseStore, arrayUnion, arrayRemove } from "../../initFirebase";


const Alan = () => {
  const { habits, loadingHabits } = useHabits();
  const { handleDarkMode, darkMode } = useDarkMode();
  const { name } = useUsername();
  const { user } = useAuth();
  console.log("Alan component", habits, loadingHabits, { name });
  // let [count, setCount] = useState(0);
  //   const [alanInstance, setAlanInstance] = useState()
  const alanInstance = useRef(null);
  const [habitsUpdatedCounter, sethabitsUpdatedCounter] = useState(0)
  const [showExamples, dismissExamples] = useIonModal(Examples);
  let todayDateString = getDateString(incrementToday(0));
  console.log(todayDateString);
  const router = useIonRouter();

  const tabs = {
    1: "/tabs/habits",
    2: "/tabs/stats",
    3: "/tabs/settings",
  };

  const countTotalHabits = (filter) => {
    let count = 90;
    if (filter === "total") count = habits.length;
    if (filter === "completed")
      count = habits.filter((habit) =>
        habit.dates.includes(todayDateString)
      ).length;
    if (filter === "uncompleted")
      count = habits.filter(
        (habit) => !habit.dates.includes(todayDateString)
      ).length;
    console.log(alanInstance);
    console.log(habits);
    alanInstance.current.callProjectApi("countHabits", { count, filter });
  };
  const greetUser = () => {
    alanInstance.current.callProjectApi("greetUser", { name });
  };



  const updateDB = async (isHabitChecked, id) => {
    try {
      if (user === null) return;
      let ref = await firebaseStore
        .collection("users")
        .doc(user.uid)
        .collection("habits")
        .doc(id);
      if (isHabitChecked) {
      console.log("Removing from array")
      
      // If the habit is checked then uncheck it (remove it)
      ref.update({
        dates: arrayRemove(todayDateString),
      });
    } else {
        console.log("Adding in array")
        ref.update({
          dates: arrayUnion(todayDateString),
        });
      }
      sethabitsUpdatedCounter(habitsUpdatedCounter+1)
    } catch (error) { 
      console.log("Alan error in updating habit completion");
    }
  }
  const toggleHabitCompletion = (habitIndex, currenthabits) => {
    console.log("Cureent Habits", currenthabits)
    let index = habitIndex - 1;
    if(!currenthabits[index]) return;
    console.log("toggle completion from ALan", currenthabits[index]);
    let {id} = currenthabits[index];
    let isHabitChecked = currenthabits[index]?.dates?.includes(todayDateString);
    updateDB(isHabitChecked, id)
  };
  useEffect(()=>{
    console.log("HABITS UPDATED")
  }, [habits])
  const summarizeHabits = () => {
    router.push("/tabs/stats", "forward", "push");
    let currentWeekValues = getWeeklyValues(habits)?.values,
      previousWeekValues = getWeeklyValues(habits, 2)?.values;
    console.log({ currentWeekValues });
    let currentWeekAverage =
      parseInt(currentWeekValues.reduce((total, value) => total + value) / 7) ||
      0;
    let previousWeekAverage =
      parseInt(
        previousWeekValues.reduce((total, value) => total + value) / 7
      ) || 0;
    let isImproving = currentWeekAverage > previousWeekAverage;
    let difference = parseInt(currentWeekAverage - previousWeekAverage);
    console.log({ currentWeekAverage, previousWeekAverage });
    alanInstance.current.callProjectApi("summarizeHabits", {
      name,
      currentWeekAverage,
      previousWeekAverage,
      isImproving,
      difference,
    });
  };

  const handleShowExamples = () => {
    showExamples({
      swipeToClose: true,
      mode: "ios",
      // cssClass: "task-modal"
    });
  };
  const handleHideExamples = () => {
    dismissExamples();
  };

  const enumerateHabits = (filter = "total") => {
    let habitNames;
    if (filter == "total")
      habitNames = habits.reduce(
        (habitNames, habit) => [...habitNames, habit.name],
        []
      );
    alanInstance.current.callProjectApi("enumerateHabits", {
      habitNames: habitNames.join(","),
    });
    console.log(habitNames);
  };
  const turnDarkMode = (target) => {
    console.log("Received from Alan", target);
    if (target === darkMode) {
      alanInstance.current.playText("It looks like that is already the case");
      return
    }
    handleDarkMode(target);
  };

  useEffect(() => {
    // if (alanInstance.current && habitsUpdatedCounter > 0) alanInstance.current.remove(); //remove Alan when user logged out
    if (habits.length === 0 || name === "" || user === null ) {alanInstance?.current?.remove(); return};
    if (true) { // !alanInstance.current
      alanInstance?.current?.remove()
      console.log("Redoing the ALAN")
      alanInstance.current = alanBtn({
        key: "25a5adef91d2241ab59513153e5683ec2e956eca572e1d8b807a3e2338fdd0dc/stage",
        right: "2em",
        bottom: "80px",
        onCommand: (commandData) => {
          if (commandData.command === "go:back") {
            router.goBack();
          }
          if (commandData.command === "navigation") {
            router.push(tabs[commandData.tabNumber], "forward", "push");
          }
          if (commandData.command === "count:completed") {
            countTotalHabits("completed");
          }
          if (commandData.command === "count:uncompleted") {
            countTotalHabits("uncompleted");
          }
          if (commandData.command === "count:total") {
            countTotalHabits("total");
          }
          if (commandData.command === "greet:user") {
            greetUser();
          }
          if (commandData.command === "toggle:darkMode") {
            turnDarkMode(commandData.target);
          }
          if (commandData.command === "enumerate:habits") {
            enumerateHabits(commandData.filter);
          }
          if (commandData.command === "summarize:habits") {
            summarizeHabits();
          }
          if (commandData.command === "show:examples") {
            handleShowExamples();
          }
          if (commandData.command === "hide:examples") {
            handleHideExamples();
          }
          if (commandData.command === "toggle:completion") {
            toggleHabitCompletion(commandData.habitIndex, habits);
          }
        },
      });
    }
  }, [habits, name, user, habitsUpdatedCounter]);
  return <div></div>;
};

export default Alan;
