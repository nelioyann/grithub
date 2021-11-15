import { React, useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useHabits, IHabit } from "../../Contexts/habitsProvider";
import { useIonRouter } from "@ionic/react";
import {
    getDateString,
    incrementToday,
    todayDate,
  } from "../Dates/DatesFunctions";

const Alan = () => {
  let { habits, loadingHabits } = useHabits();
  console.log("Alan component", habits);
  let [count, setCount] = useState(0);
  const [alanInstance, setAlanInstance] = useState()
    

//   useEffect(() => {
//     setCount(habits.length);
//     console.log("From use efefetx", habits);
//   }, [habits]);
let todayDateString = getDateString(incrementToday(0));
console.log(todayDateString)
  const router = useIonRouter();

  const tabs = {
    1: "/tabs/habits",
    2: "/tabs/stats",
    3: "/tabs/settings",
  };

  const countTotalHabits = (filter) => {
    let count = 90;
    if(filter === "total") count = habits.length;
    if(filter === "completed") count = habits.filter(habit => habit.dates.includes(todayDateString)).length;
    if(filter === "uncompleted") count = habits.filter(habit => !habit.dates.includes(todayDateString)).length;
    // console.log(count)
    alanInstance.callProjectApi("countTotalHabits", { count });
  };

  const enumerateHabits = (filter = "total") => {
    let habitNames;
    if (filter == "total") habitNames = habits.reduce((habitNames, habit) => [...habitNames, habit.name], [])
    console.log(habitNames) 
  }

  useEffect(() => {
    if(habits === []) return
    setAlanInstance(alanBtn({
        key: "25a5adef91d2241ab59513153e5683ec2e956eca572e1d8b807a3e2338fdd0dc/stage",
        onCommand: (commandData) => {
            if (commandData.command === "go:back") {
                router.goBack();
            }
            if (commandData.command === "navigation") {
                router.push(tabs[commandData.tabNumber], "forward", "replace");
            }
            if (commandData.command === "count:completed") {
                countTotalHabits("completed");
            }
            if (commandData.command === "count:total") {
                countTotalHabits("total");
            }
        },
    }))
}, [habits]);
  return <div>Alan</div>;
};

export default Alan;
