export function getDateString(
  dateValue: Date,
  filter: "full" | "day" | "month"| "weekDay" = "full",
  forHuman: boolean = false
) {
  let weekdays = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  let dd = String(dateValue.getDate()).padStart(2, "0"),
    mm = String(dateValue.getMonth() + 1).padStart(2, "0"),
    wd = weekdays[dateValue.getDay()]
  if (filter === "day") return dd;
  if (filter === "month") return mm;
  if (filter === "weekDay") return wd;
  if(forHuman) return dd + "/" + mm;
  return mm + dd;
}

export function incrementToday(value: number) {
  return new Date(new Date().setDate(new Date().getDate() + value));
}

export function todayDate(filter: "full" | "day" | "month" = "full") {
  let today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = Intl.DateTimeFormat("en-US", { month: "long" }).format(today); //January is 0!
  var yyyy = today.getFullYear();
  if (filter === "month") return mm;

  return(`${mm} ${dd}`);
}

