const formatDateAndTime = (dateTimeStr) => {
  const dateObj = new Date(dateTimeStr);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { formattedDate, formattedTime };
};

export default formatDateAndTime;
