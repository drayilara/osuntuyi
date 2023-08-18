export default function formatDate(timestampSeconds) {
  // Replace this timestamp with the one you have from the database

  // Convert the timestamp to milliseconds (required by JavaScript)
  var timestampMilliseconds = timestampSeconds * 1000;

  // Create a new Date object using the timestamp in milliseconds
  var date = new Date(timestampMilliseconds);

  // Format the date
  var options = { year: "numeric", month: "long", day: "numeric" };
  var formattedDate = date.toLocaleDateString("en-US", options);

  // Add the appropriate suffix to the day
  var day = date.getDate();
  var suffix = getDaySuffix(day);
  return formattedDate.replace(day.toString(), day + suffix);
}

// Function to get the day suffix (e.g., "st", "nd", "rd", "th")
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  var lastDigit = day % 10;
  if (lastDigit === 1) {
    return "st";
  } else if (lastDigit === 2) {
    return "nd";
  } else if (lastDigit === 3) {
    return "rd";
  } else {
    return "th";
  }
}
