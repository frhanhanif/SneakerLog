import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import "react-circular-progressbar/dist/styles.css";
import GeneralInfo from "../../components/SneakerList/SneakerDetail/GeneralInfo";
import Stats from "../../components/SneakerList/SneakerDetail/Stats";
// import Activity from "../../components/SneakerList/SneakerDetail/Activity";
// import PriceCalc from "../../components/SneakerList/SneakerDetail/PriceCalc";
import { ChevronLeftIcon, TrashBinIcon } from "../../icons";
import useGoBack from "../../hooks/useGoBack";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { Sneaker } from "../../interface/Sneaker";
import { useNavigate } from "react-router"
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";



const SneakerDetails = () => {
  const {id} = useParams<{id:string}>()
  const [sneaker, setSneaker] = useState<Sneaker>()
  const {isOpen, openModal, closeModal} = useModal()
  const navigate = useNavigate()

  useEffect (() => {
      const fetchData = async () => {
        try{
          const {data,error} = await supabase.from('sneakerlist')
          .select('*')
          .eq('id', id)
          .single()
          
          if(error) {throw error}
          setSneaker(data)
        }
        catch (err) {
          console.error("Error fetching data : ", err)
        }
      }

      fetchData()
  }, [id] )

  const updateSneakerList = (newSneaker: Sneaker) => {
    // If it's an update, replace the existing sneaker
    if (newSneaker.id) {
      setSneaker(s => 
        s!.id === newSneaker.id ? newSneaker : s
      );
    } 
  }
  
  const onDelete = async () => {
      try{
        const {error} = await supabase.from('sneakerlist')
        .delete()
        .eq('id', id)

        if(error) {throw error}
      }
      catch (err) {
        console.error("Error fetching data : ", err)
      }
      navigate('/sneaker-list');
  }
  

  return (
    <> 
    <button 
      className="flex pb-3"
      onClick={useGoBack()}>
      <ChevronLeftIcon className="text h-6 w-6"/>
    </button>

    <PageBreadcrumb pageTitle="Sneaker Detail" parent="Sneaker List" />
    <div className="space-y-5">
      {sneaker && (
        <>
          <GeneralInfo sneaker={sneaker} updateSneakerList={updateSneakerList} />
          <Stats sneaker={sneaker} updateSneakerList={updateSneakerList}/>
          {/* <Activity/>
          <PriceCalc/> */}
          <div className="flex justify-center items-center pt-2 pb-8">
            <button 
              className="border-red-600 p-2 border-2 rounded-lg bg-transparent hover:bg-red-200"
              onClick={openModal}
            >
                <TrashBinIcon className="text-red-500 h-6 w-6"/>
            </button>  
          </div> 
        </>
      )}
    </div>
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[400px] m-4">
  <div className="flex flex-col items-center gap-6 p-6 text-center">
    <TrashBinIcon className="h-10 w-10 text-red-500" />
    <h2 className="text-xl text font-semibold">
      Are you sure you want to delete this sneaker?
    </h2>
    <div className="flex justify-center items-center gap-4 w-full space-x-4">
      <button
        onClick={closeModal}
        className="px-4 py-2 text border border-gray-300 rounded-md text-gray-700 hover:bg-gray-600 transition"
      >
        Cancel
      </button>
      <button
        onClick={onDelete}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Confirm
      </button>
    </div>
  </div>
</Modal>

    </>

  )
}

export default SneakerDetails