import { Link } from "react-router";
import {CheveronRightIcon } from "../../icons";
import { formatDate } from "../common/FormatDate";
import { Sneaker } from "../../interface/Sneaker";


const ProgressBar = ({ progress }: { progress: number }) => {
    // Cap the progress at 100%
    const cappedProgress = Math.min(progress, 100);
    
    return (
      <div className="flex w-full items-center gap-3">
        <div className="relative block h-2 flex-1 rounded bg-gray-400 dark:bg-gray-600">
            <div 
                className="absolute left-0 top-0 h-full rounded bg-brand-500"
                style={{ width: `${Math.floor(cappedProgress)}%` }}
            />
        </div>
        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
            {Math.floor(cappedProgress)}%
        </p>
      </div>
    );
};

const SneakerCard = ({sneaker}:{sneaker:Sneaker}) => {

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white py-4 px-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className={`absolute top-4 right-4 text-lg font-bold 
          ${sneaker.status === 'ACTIVE' ? 'text-green-500' 
              : sneaker.status === 'SOLD' ? 'text-red-500' 
              : 'text-gray-500'}`
      }>
          {sneaker.status}
      </div>

      <div className="flex">
          <div className="w-40">
          <div className="text-xl text-gray-800 dark:text-white/90">
              {sneaker.brand}
          </div>
          <div className="text-xl font-bold text-gray-800 dark:text-white/90">
              {sneaker.model}
          </div>
          <div className="text-base text-gray-800 dark:text-gray-300">
              {sneaker.category}
          </div>
          <div className="text-base text-nowrap text-gray-800 dark:text-gray-300">
              Purchased: {formatDate(sneaker.purchased_date)}
          </div>
          <div className="text-base text-nowrap text-gray-800 dark:text-gray-300">
              Price: {sneaker.price.toLocaleString('en-US')}
          </div>
          </div>

          {/* Link to sneaker Detail */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Link to={`/card-view/sneaker-details/${sneaker.id}`} state={sneaker}>
                  <button className="flex text-gray-800 dark:text-white">
                      <CheveronRightIcon className="h-6 w-6"/>
                  </button>
              </Link>
          </div>

      </div>

      <div className="flex mt-2">
          <div className="text-sm text-nowrap mr-4 text-gray-800 dark:text-gray-300">
              {sneaker.current_distance} / {sneaker.distance_goal} KM
          </div>
          <ProgressBar progress={(sneaker.current_distance / sneaker.distance_goal) * 100} />
      </div>
    </div>
  )
}

export default SneakerCard