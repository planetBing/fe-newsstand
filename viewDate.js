function parseDate() {
  const date = new Date();
  const dayOfWeek = new Intl.DateTimeFormat("ko", {
    dateStyle: "full",
  })
    .format(date)
    .split(" ")[3];
  const yearMonthDay = new Intl.DateTimeFormat("ko-KR").format(date);
  const todayDate = `${yearMonthDay} ${dayOfWeek}`;
  return todayDate;
}

export function viewDate() {
  const dateEl = document.querySelector(".date");
  const dateStr = parseDate();
  dateEl.innerText = dateStr;
}
