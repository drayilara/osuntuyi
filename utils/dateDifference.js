export default function calculateDateDifferenceInSeconds(givenDateInSeconds) {
  // Convert given date in seconds to milliseconds
  var givenDateMilliseconds = givenDateInSeconds * 1000;

  // Create date objects for the given date and current date
  var givenDate = new Date(givenDateMilliseconds);
  var currentDate = new Date();

  // Calculate the time difference in milliseconds
  var timeDifferenceMilliseconds = currentDate - givenDate;

  // Convert time difference to days
  var daysDifference = Math.floor(
    timeDifferenceMilliseconds / (1000 * 60 * 60 * 24)
  );

    if (daysDifference === 0) {
      return "Less than 24hrs"
  }

   if (daysDifference === 1) {
      return "1 day"
  }

   if (daysDifference > 1) {
      return daysDifference + " days"
  }
}
