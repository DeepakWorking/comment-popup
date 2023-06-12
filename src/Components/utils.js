const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getFormattedDate = (dateObj) => {
  const date = new Date(dateObj);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day} ${month} ${year}`;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return `${formattedDate}, ${formattedTime}`;
};

export const getNameInitials = (name) => {
  const nameArr = name.split(" ");
  let firstLetter = nameArr[0].charAt(0);
  let lastLetter = nameArr[1].charAt(0);
  return `${firstLetter?.toUpperCase()}${lastLetter?.toUpperCase()}`;
};
