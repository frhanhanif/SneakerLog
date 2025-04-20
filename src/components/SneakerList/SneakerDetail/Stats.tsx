import { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Sneaker } from '../../../interface/Sneaker';
import supabase from '../../../supabaseClient';


const Stats = ({sneaker, updateSneakerList}:{sneaker:Sneaker, updateSneakerList:(sneaker:Sneaker) => void}) => {
  const current = sneaker.current_distance;
  const target = sneaker.distance_goal;
  const usagePercentage = Math.min((current / target) * 100 , 100);
  const remainingKm = Math.max(target - current , 0);

  const [showInput, setShowInput] = useState(false);
  const [distance, setDistance] = useState(0);
    
  const handleToggleInput = async () => {
    if (showInput) {
      const updatedDistance = Number(current) + Number(distance);
      await supabase
        .from('sneakerlist')
        .update({current_distance:updatedDistance})
        .eq('id',sneaker.id)
      
      updateSneakerList({...sneaker, current_distance:updatedDistance})
    }
    setShowInput((prev) => !prev)
  }

  const incrementDistance = () => {
    setDistance(prev => parseFloat((prev + 0.5).toFixed(1)));
  };

  const decrementDistance = () => {
    setDistance(prev => prev >= 0.5 ? parseFloat((prev - 0.5).toFixed(1)) : 0);
  };

  const sneakerAge = () => {
    const sneakerDate = new Date(sneaker.purchased_date).getTime()
    const today = new Date().getTime()
    const totalDays = Math.floor( (today - sneakerDate) / (1000 * 60 * 60 * 24));
    return totalDays
  }

  return (
    <ComponentCard title="Stats">
      <div className="flex items-center justify-between">
        {/* Left Section: Stats */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">CURRENT</p>
            <p className="text-yellow-600 dark:text-yellow-400 text-xl font-bold">
              {current} KM
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">GOAL</p>
            <p className="text-green-600 dark:text-green-400 text-xl font-bold">
              {target} KM
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">REMAINING</p> 
            <p className="text-blue-600 dark:text-blue-400 text-xl font-bold">
              {remainingKm.toFixed(2)} KM
            </p>
          </div>

          {/* Add Distance Input + Button */}
          <div className="pt-2 space-y-4">
            {showInput && (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={distance}
                  onChange={(e) => setDistance(parseFloat(e.target.value))}
                  className="px-3 py-2 mr-2 w-24 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-gray-800 text-white"
                  />
              <button
                onClick={decrementDistance}
                className="py-1 px-3 bg-red-600 active:bg-red-700 hover:bg-red-700 text-white font-bold rounded-lg text-lg"
              >
                -
              </button>
          <button
            onClick={incrementDistance}
            className="px-3 py-1 bg-blue-600 active:bg-blue-700 hover:bg-blue-700 text-white font-bold text-lg rounded-lg"
          >
            +
          </button>
          
                </div>
            )}

            <button
              onClick={() => {
                handleToggleInput();
                setDistance(0);
              }}
              className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md w-fit"
            >
              {showInput? "+ Add" : "+ Update Current KM"}
            </button>
          </div>
        </div>

        {/* Right Section: Circular Progress */}
        <div className="w-36 h-36 sm:mr-12">
          <CircularProgressbar
            value={usagePercentage}
            text={`${usagePercentage.toFixed(2)}%`}
            styles={buildStyles({
              textColor: "var(--progress-text)",
              pathColor: "var(--progress-path)",
              trailColor: "var(--progress-trail)",
              textSize: "16px",
            })}
          />
        </div>
      </div>

      <hr className="border-gray-600 dark:border-gray-700"/>

      <div className="space-y-2">
        <div>
          <p className="text text-sm">AGE</p>
          <p className="text-purple-600 dark:text-purple-400 text-xl font-bold">{sneakerAge()} DAYS</p>
        </div>
        {/* <div>
            <p className="text text-sm">TOTAL COUNT ACTIVITY</p>
            <p className="text-yellow-600 dark:text-yellow-400 text-xl font-bold">10</p>
        </div>
        <div>
            <p className="text text-sm">AVERAGE DISTANCE PER ACTIVITY</p>
            <p className="text-green-600 dark:text-green-400 text-xl font-bold">1KM</p>
        </div> */}

      </div>
    </ComponentCard>
  )
}

export default Stats