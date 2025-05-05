import { useModal } from '../../../hooks/useModal'
import { Sneaker } from '../../../interface/Sneaker'
import ComponentCard from '../../common/ComponentCard'
import { formatDate } from '../../common/FormatDate'
import SneakerModal from '../modal/SneakerModal'

const GeneralInfo  = ({sneaker, updateSneakerList}:{sneaker:Sneaker, updateSneakerList:(sneaker:Sneaker)=> void}) => {
  const {isOpen, openModal, closeModal} = useModal()

  return (
    <>
    <ComponentCard title="General Info" buttonLabel="Edit" onButtonClick={openModal}>
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden">
          <img 
              src="/images/product/shoes.jpg" 
              className="w-full h-full object-cover"
          />
        </div>          
        <div>
          <h2 className="text-lg text font-bold">{sneaker.brand}</h2>
          <h2 className="text-base text font-semibold">{sneaker.model}</h2>
          <h2 className="text-sm text">{sneaker.category}</h2>
        </div>
      </div>
        <div className="space-y-1">
            <p className="text text-sm">Rp {sneaker.price.toLocaleString('en-US')}</p>
            <p className="text text-sm">Purchased: {formatDate(sneaker.purchased_date)}</p>
        </div>
      <div>
          <hr className="border-gray-600 dark:border-gray-700" />
          <p className={`text-base font-bold pt-2 ${
            sneaker.status === "ACTIVE"
              ? "text-green-600"
              : sneaker.status === "SOLD"
              ? "text-red-600"
              : "text-gray-500"}
              `}
          >
            {sneaker.status}
          </p>            
      </div>

    </ComponentCard>
    <SneakerModal isOpen={isOpen} onClose={closeModal} sneaker={sneaker} updateSneakerList={updateSneakerList}/>
    </>

  )
}

export default GeneralInfo