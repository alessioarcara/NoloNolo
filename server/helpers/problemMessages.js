const duplicateEmail = "User già presente.";
const userNotFound = "Utente non presente.";
const boatNotFound = "La barca è tua oppure è ancora attiva?";
const rentalNotFound = "La barca è tua oppure è ancora attiva?";
const invalidPassword = "Password non corretta!";
const samePassword = "La vecchia password e la nuova sono identiche.";
const notImage = "Non è un'immagine! Perfavore inserisci solo immagini.";
const noFileAttached = "Nessun file fornito!";
const itsYourBoat = "Non puoi noleggiare la tua barca."
const invalidRange = "La data di fine deve essere maggiore della data di inizio.";
const alreadyRented = "Prenotazione già presente per le date selezionate.";
const selectedRentDatesTooClose = "Puoi affittare solo da domani!";
const someoneIsAlreadyBookingBoat = "Qualcuno stà gia prenotando le tue date. Riprova!";
const isAlreadyStarted = "Non è possibile modificare i noleggi iniziati.";
const isAlreadyPublished = "Recensione già pubblicata per questo noleggio.";
const rentalNotYours = "Puoi scrivere una recensione solo sui tuoi noleggi!";
const rentalNotClosed = "Non puoi recensire ciò che non hai restituito.";
const rentalNotFinished = "Non puoi chiudere il noleggio non ancora terminato!";
const boatWithRentals = "Non è possibile modificare o eliminare barche con noleggi attivi o precedenti!";
const userWithRentals = "Non puoi eliminare l'account se hai già noleggiato qualcosa in passato oppure hai alcune prenotazioni in corso.";
const userWithBoats = "Non puoi cancellare l'account se non hai rimosso tutte le tue barche.";

module.exports = {
    duplicateEmail,
    userNotFound,
    boatNotFound,
    invalidPassword,
    samePassword,
    notImage,
    noFileAttached,
    itsYourBoat,
    rentalNotFound,
    invalidRange,
    alreadyRented,
    selectedRentDatesTooClose,
    someoneIsAlreadyBookingBoat,
    isAlreadyStarted,
    isAlreadyPublished,
    rentalNotYours,
    rentalNotClosed,
    rentalNotFinished,
    boatWithRentals,
    userWithRentals,
    userWithBoats
};
