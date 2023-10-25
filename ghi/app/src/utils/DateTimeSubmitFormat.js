// format separate date and time strings into a single ISO string for submission to the database
function dateTimeSubmitFormat(dateString, timeString) {
  const dateObj = new Date(dateString);
  const timeObj = new Date(`1970-01-01T${timeString}:00`);

  const dateTimeObj = new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate(),
    timeObj.getHours(),
    timeObj.getMinutes(),
    timeObj.getSeconds()
  );

  const formattedDateTime = dateTimeObj.toISOString();

  return formattedDateTime;
}

export default dateTimeSubmitFormat;
