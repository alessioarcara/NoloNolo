import AnnouncementCard from "./AnnouncementCard/AnnouncementCard";
import AnnouncementListLayout from "../UI/Layout/AnnouncementListLayout/AnnouncementListLayout";
import {useMemo} from "react";

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
        <AnnouncementListLayout>
            {Object.values(result).map(announcement =>
                <AnnouncementCard
                    key={announcement._id}
                    boatId={announcement._id}
                    images={announcement.hasAdvertisement.images}
                    model={announcement.model}
                    rentals={announcement.rentals}
                    reviews={announcement.reviews}
                    handleCloseRentalOrDeleteAdvertisement={handleCloseRentalOrDeleteAdvertisement}
                />
            )}
        </AnnouncementListLayout>
    )
}

export default AdvertisementAdministrationList
