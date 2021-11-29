import AdvertisementAdministrationCard from "./AdvertisementAdministrationCard/AdvertisementAdministrationCard";
import AnnouncementListLayout from "../UI/Layout/AnnouncementListLayout/AnnouncementListLayout";
import ElementsNotFound from "../UI/ElementsNotFound/ElementsNotFound";

const AdvertisementAdministrationList = ({advertisements, onMutateAdvertisement}) => {
    return (
        advertisements.length > 0 ?
            <AnnouncementListLayout>
                {advertisements.map(announcement =>
                    <AdvertisementAdministrationCard
                        key={announcement._id}
                        boatId={announcement._id}
                        createdAt={announcement.hasAdvertisement.createdAt}
                        images={announcement.hasAdvertisement.images}
                        model={announcement.model}
                        rentals={announcement.rentals}
                        reviews={announcement.reviews}
                        preferredBy={announcement.hasAdvertisement.preferredBy.length}
                        onMutateAdvertisement={onMutateAdvertisement}
                    />
                )}
            </AnnouncementListLayout> :
            <ElementsNotFound
                warningText="Non hai aggiunto nuovi annunci. Aggiungi la tua &#128741; nella sezione barche e inizia una nuova esperienza"
                warningTextButton="Aggiungi"
                path="/become-shipowner"
            />
    )
}

export default AdvertisementAdministrationList
