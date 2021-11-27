import AnnouncementCard from "./AnnouncementCard/AnnouncementCard";
import AnnouncementListLayout from "../UI/Layout/AnnouncementListLayout/AnnouncementListLayout";
import {useMemo} from "react";
import ElementsNotFound from "../UI/ElementsNotFound/ElementsNotFound";

const AdvertisementAdministrationList = ({advertisements, rentals, handleCloseRentalOrDeleteAdvertisement}) => {

    /* Aggregate advertisement with rentals (item._id === item.boat._id) */
    const result = useMemo(() => [...advertisements, ...rentals].reduce(
        (acc, item, i) => {
            if (i < advertisements.length) {
                acc[item._id] = {...item, rentals: []}
            } else {
                acc[item.boat._id].rentals.push(item)
            }
            return acc
        }, {}), [advertisements, rentals])

    return (
        <>
            {Object.values(result).length > 0
                ?   <AnnouncementListLayout>
                        {Object.values(result).map(announcement =>
                            <AnnouncementCard
                                key={announcement._id}
                                boatId={announcement._id}
                                images={announcement.hasAdvertisement.images}
                                model={announcement.model}
                                rentals={announcement.rentals}
                                reviews={announcement.reviews}
                                preferredBy={announcement.hasAdvertisement.preferredBy.length}
                                handleCloseRentalOrDeleteAdvertisement={handleCloseRentalOrDeleteAdvertisement}
                            />
                        )}
                    </AnnouncementListLayout>
                :   <ElementsNotFound
                        warningText="Non hai aggiunto nuovi annunci. Aggiungi la tua &#128741; nella sezione barche e inizia una nuova esperienza"
                        warningTextButton="Aggiungi"
                        path="/become-shipowner"
                    />
            }
        </>
    )
}

export default AdvertisementAdministrationList
