const duplicateEmail = "User already exists.";
const userNotFound = "User does not exist.";
const boatNotFound = "Boat is still active?"
const rentalNotFound = "Rental does not exist."
const invalidPassword = "Password is incorrect!";
const samePassword = "Old password and new password are the same!";
const notImage = "Not an image! Please upload only images.";
const noFileAttached = "No file provided!";
const invalidRange = "End date must be greater than start date.";
const alreadyRented = "Already rented for these dates.";
const selectedRentDatesTooClose = "You can only rent from tomorrow!";
const someoneIsAlreadyBookingBoat = "Someone is already booking your dates! Retry again.";
const isAlreadyStarted = "Can't change started rentals!";
const isAlreadyPublished = "Already published review for this rental.";
const rentalNotYours = "You can write a review only on your rentals!";
const rentalNotClosed = "You cannot write a review on what you have not returned";

module.exports = {
    duplicateEmail,
    userNotFound,
    boatNotFound,
    invalidPassword,
    samePassword,
    notImage,
    noFileAttached,
    rentalNotFound,
    invalidRange,
    alreadyRented,
    selectedRentDatesTooClose,
    someoneIsAlreadyBookingBoat,
    isAlreadyStarted,
    isAlreadyPublished,
    rentalNotYours,
    rentalNotClosed
};
