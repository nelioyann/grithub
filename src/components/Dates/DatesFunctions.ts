export function getDateString(
  dateValue: Date,
  filter: "full" | "day" | "month" = "full"
) {
  let dd = String(dateValue.getDate()).padStart(2, "0"),
    mm = String(dateValue.getMonth() + 1).padStart(2, "0");
  if (filter === "day") return dd;
  if (filter === "month") return mm;
  return mm + dd;
}

export function incrementToday(value: number) {
  return new Date(new Date().setDate(new Date().getDate() + value));
}

export function todayDate() {
  let today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = Intl.DateTimeFormat("en-US", { month: "long" }).format(today); //January is 0!
  var yyyy = today.getFullYear();

  return(`${mm} ${dd}, ${yyyy}`);
}

