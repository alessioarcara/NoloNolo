import Boat from "./Boat";

const BoatList = ({boats}) => {
    return (
        <>
            {boats && boats.map(boat => (
                <Boat
                    key={boat._id}
                    id={boat._id}
                    images={boat.hasAdvertisement.images}
                    model={boat.model}
                    description={boat.hasAdvertisement.description}
                    maxCapacity={boat.maximumCapacity}
                    dailyFee={boat.hasAdvertisement.dailyFee}
                    reviews={boat.reviews}
                    advIsFavorite={boat.advIsFavorite}
                />
            ))}
        </>
    );
}

export default BoatList;
