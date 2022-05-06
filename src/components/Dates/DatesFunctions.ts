export function getDateString(
  dateValue: Date,
  filter: "full" | "day" | "month"| "weekDay" | "year" = "full",
  forHuman: boolean = false
) {
  let weekdays = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  let dd = String(dateValue.getDate()).padStart(2, "0"),
    mm = String(dateValue.getMonth() + 1).padStart(2, "0"),
    wd = weekdays[dateValue.getDay()],
    yyyy = String(dateValue.getFullYear());
  if (filter === "day") return dd;
  if (filter === "month") return mm;
  if (filter === "weekDay") return wd;
  if(filter === "year") return yyyy;
  if(forHuman) return dd + "/" + mm;
  return mm + dd + yyyy;
}

export function incrementToday(value: number) {
  return new Date(new Date().setDate(new Date().getDate() + value));
}

export function todayDate(filter: "full" | "day" | "month" = "full") {
  let today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = Intl.DateTimeFormat("en-US", { month: "long" }).format(today); //January is 0!
  var yyyy = String(today.getFullYear());
  if (filter === "month") return mm;

  return(`${mm} ${dd} ${yyyy}`);
}

