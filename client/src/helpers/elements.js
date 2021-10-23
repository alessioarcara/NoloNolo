import {v4 as uuid4} from 'uuid';
import MotorBoatIcon from "../components/UI/icons/BoatIcons/MotorBoatIcon";
import SailBoatIcon from "../components/UI/icons/BoatIcons/SailBoatIcon";
import CatamaranIcon from "../components/UI/icons/BoatIcons/CatamaranIcon";
import InflatableBoatIcon from "../components/UI/icons/BoatIcons/InflatableBoatIcon";

export const boats = [
    {
        id: uuid4(),
        name: 'Barche a motore',
        avatar: <MotorBoatIcon/>
    },
    {
        id: uuid4(),
        name: 'Barche a vela',
        avatar: <SailBoatIcon/>
    },
    {
        id: uuid4(),
        name: 'Catamarani',
        avatar: <CatamaranIcon/>
    },
    {
        id: uuid4(),
        name: 'Gommoni',
        avatar: <InflatableBoatIcon/>
    }
]
