import { useModal } from "../../../hooks/useModal";
import { PlusIcon } from "../../../icons"
import { Sneaker } from "../../../interface/Sneaker";
import Button from "../../ui/button/Button"
import SneakerModal from "../modal/SneakerModal";

const AddSneaker = ({updateSneakerList}:{updateSneakerList:(sneaker:Sneaker)=> void}) => {
  const { isOpen, openModal, closeModal } = useModal();
  
  return (
    <>
      <Button
        size="sm"
        variant="primary"
        startIcon={<PlusIcon className="size-5" />}
        className="w-full sm:w-auto"
        onClick={openModal}
        >
          <p className="text-base sm:text-sm"> Add New Sneaker </p>
      </Button>
      <SneakerModal 
        isOpen={isOpen}
        onClose={closeModal} 
        updateSneakerList = {updateSneakerList} />
    </>
  )
}

export default AddSneaker