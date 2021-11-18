import { React, useEffect, useState, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useHabits, IHabit } from "../../Contexts/habitsProvider";
import { useDarkMode } from "../../Contexts/DarkModeContext";
import { useUsername } from "../../Contexts/NameContext";

import { useIonRouter } from "@ionic/react";
import {
  getDateString,
  incrementToday,
  todayDate,
} from "../Dates/DatesFunctions";

const Alan = () => {
  const { habits, loadingHabits } = useHabits();
  const { handleDarkMode, darkMode } = useDarkMode();
  const {name} = useUsername()
  console.log("Alan component", habits, loadingHabits);
  // let [count, setCount] = useState(0);
  //   const [alanInstance, setAlanInstance] = useState()
  const alanInstance = useRef(null);

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
    if (target === darkMode) alanInstance.current.playText("It looks like that is already the case");
    handleDarkMode(target);
  };

  useEffect(() => {
    if (loadingHabits) return;
    if (!alanInstance.current) {
      alanInstance.current = alanBtn({
        key: "25a5adef91d2241ab59513153e5683ec2e956eca572e1d8b807a3e2338fdd0dc/stage",
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
        },
      });
    }
  }, [habits, name]);
  return <div></div>;
};

export default Alan;
