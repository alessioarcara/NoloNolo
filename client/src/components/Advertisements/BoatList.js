import Boat from "./Boat";

const AdvertisementList = ({boats}) => {
    return (
        <>
            {boats && boats.map(boat => (
                <Boat
                    key={boat._id}
                    images={boat.hasAdvertisement.images}
                    model={boat.model}
                    description={boat.hasAdvertisement.description}
                    dailyFee={boat.hasAdvertisement.dailyFee}
                    // totalFare={+props.missingDays * +boat.hasAdvertisement.dailyFee}
                    reviews={boat.hasAdvertisement.reviews}
                />
            ))}
        </>
    );
}

export default AdvertisementList;