import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpotsThunk } from "../../store/spots";
import SpotCard from "./SpotCard";
import "./SpotsList.css";

const SpotsList = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spotsArr = Object.values(spotsObj);

    useEffect(() => {
        dispatch(allSpotsThunk());
    }, [dispatch])

    return (
        <div className="spotsList-wrapper">
            {spotsArr.length > 0 && spotsArr.map(spot => (
                <SpotCard key={spot.id} spot={spot}/>
            ))}
        </div>
    )
}

export default SpotsList;
