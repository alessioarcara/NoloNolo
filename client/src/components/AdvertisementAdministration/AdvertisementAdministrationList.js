import AnnouncementCard from "./AnnouncementCard/AnnouncementCard";
import AnnouncementListLayout from "../UI/Layout/AnnouncementListLayout/AnnouncementListLayout";
import {useMemo} from "react";

const AdvertisementAdministrationList = ({advertisements, rentals}) => {

    /* Aggregate advertisement with rentals */
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
                    advertisementId={announcement._id}
                    images={announcement.hasAdvertisement.images}
                    model={announcement.model}
                    rentals={announcement.rentals}
                    reviews={announcement.reviews}
                />
            )}
        </AnnouncementListLayout>
    )
}

export default AdvertisementAdministrationList
