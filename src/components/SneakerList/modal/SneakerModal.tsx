import { useEffect, useState } from "react"
import supabase from "../../../supabaseClient"
import Input from "../../form/input/InputField"
import Label from "../../form/Label"
import Select from "../../form/Select"
import Button from "../../ui/button/Button"
import { Modal } from "../../ui/modal"
import CurrencyInput from 'react-currency-input-field';
import { Category } from "../AddSneaker/Category"
import { Sneaker } from "../../../interface/Sneaker"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SneakerModalProps {
  isOpen: boolean, 
  onClose: ()=>void, 
  sneaker?: Sneaker, 
  updateSneakerList: (newSneaker:Sneaker)=> void
}

const SneakerModal = ({isOpen,onClose,sneaker,updateSneakerList}: SneakerModalProps) => {
  const category = Category
  const status = [
    { value: "ACTIVE", label: "Active"},
    { value: "SOLD", label: "Sold"},
    { value: "INACTIVE", label: "Inactive"}
  ]
  const [editMode, setEditMode] = useState(false)
  const [brand, setBrand] = useState<{value:string,label:string}[]>([])
  
  const initialForm = {
    brand:'',
    model:'',
    category:'',
    purchased_date:null,
    price:0,
    distance_goal:1,
    status:'ACTIVE'
  }

  const [formData, setFormData] = useState(initialForm)

  useEffect(() => {
    if (sneaker) {
      setFormData({ ...initialForm, ...sneaker});  
      setEditMode(true)
    } else {
      setFormData(initialForm);
      setEditMode(false)
    }
  },[sneaker])

  useEffect(() => {
    const fetchBrand = async () => {
      try{
        const {data,error} = await supabase.from('brand').select('brand')
      
        if(error) {throw error};

        console.log(data)
        setBrand(data.map((item)=>({value:item.brand,label:item.brand})))
      }
      catch (err) {
        console.error("Error fetching data : ", err)
      }
    }
    fetchBrand()
  },[])
  
  //Select change for brand dropdown
  const handleBrandChange = (selectedOption: any) => {
    setFormData(prevState => ({
      ...prevState, brand: selectedOption
    }))
  };

  const handleCategoryChange = (selectedOption: any) => {
    setFormData(prevState => ({
      ...prevState, category: selectedOption
    }))
  };

  const handleStatusChange = (selectedOption: any) => {
    setFormData(prevState => ({
      ...prevState, status: selectedOption
    }))
  };

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState, [name]:value
    }))
  }

  const handleDateChange = (date:any) => {
    setFormData((prev) => ({ ...prev, purchased_date: date }))
  }

  const handleCurrencyChange = (value: any, name: any) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value || 0 // Use 0 or '' when fully cleared
    }));
  };

  //Save to supabase
  const handleSave = async (e:any) => {
    e.preventDefault()

    if (editMode) {
      try {
        //insert to table SneakerList
        const {error} = await supabase
          .from('sneakerlist')
          .update( {...formData} )
          .eq('id', sneaker!.id)
        
        if (error) {
          console.log('Error insert data',error)
        } else {
          updateSneakerList({...sneaker, ...formData})
        }
      }
      catch (e) {
        console.error('Error insert or update to Supabase:', e);
      }
    } else {

      try {
        //insert to table SneakerList
        const {data,error} = await supabase
          .from('sneakerlist')
          .insert([
            {
              ...formData,
              purchased_date: formData.purchased_date ? formData.purchased_date : null
            }
          ])
          .select()
        
          if (error) {
            console.log('Error insert data',error)
          } else if(data && data.length>0){
            updateSneakerList(data[0])
          }
      }
      catch (e) {
        console.error('Error insert or update to Supabase:', e);
      }
      setFormData(initialForm);
    }
    onClose()
  }

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} 
      className="max-w-[600px] m-4"
      >
      <div 
        className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8"
        >

        <div className="pr-14">
            <h4 className="m-2 pb-6 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {editMode? "Edit Sneaker" : "Add New Sneaker"}
            </h4>
        </div>
        <form className="flex flex-col">
          <div className="custom-scrollbar max-h-[500px] overflow-y-auto px-2 pb-3">
            <div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                      <Label>Brand</Label>                
                      <Select
                        options={brand}
                        placeholder={"Select Brand"}
                        onChange={handleBrandChange}
                        defaultValue={formData.brand}
                        hint="*Required"
                      />     
                  </div>
                  <div>
                    <Label>Model</Label>                
                    <Input 
                      type="text" 
                      placeholder="Sneaker Model"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      hint="*Required"
                    />
                  </div>
                  <div>
                    <Label>Category</Label>                
                    <Select 
                      options={category}
                      placeholder="Select Category"
                      onChange={handleCategoryChange}
                      defaultValue={formData.category}  
                    />
                  </div>
                  <div>
                    <Label>Purchased Date</Label>
                    <DatePicker
                      selected={formData.purchased_date}
                      onChange={handleDateChange}
                      dateFormat="d MMMM YYYY"
                      placeholderText="Select a date"
                      className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400
                        dark:bg-gray-900 text dark:placeholder:text-white/30 border-gray-300 focus:border-brand-300
                        focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
                    
                    />   
                  </div>
                  <div>
                    <Label>Price</Label>
                    <CurrencyInput
                      className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400
                        dark:bg-gray-900 text dark:placeholder:text-white/30 border-gray-300 focus:border-brand-300
                        focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
                      allowDecimals={false}
                      allowNegativeValue={false}
                      groupSeparator=","
                      decimalSeparator="."
                      prefix="Rp "
                      maxLength={10}
                      placeholder="Rp 1,600,000"
                      name="price"
                      value={formData.price || ''}
                      onValueChange={(value) => handleCurrencyChange(value, 'price')}
                    />             
                  </div>
                  <div>
                      <Label>Distance Goal (KM)</Label>
                      <Select 
                        options={category}
                        placeholder="Select Category"
                        onChange={handleCategoryChange}
                        defaultValue={formData.category}  
                    />
                  </div>
                  <div>
                      <Label>Status</Label>
                      <Select 
                        options={status}
                        onChange={handleStatusChange}
                        defaultValue={formData.status}  
                    />
                  </div>
                </div>
            </div>
          </div>
        </form>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onClose}>
              Close
          </Button>
          <Button 
            size="sm" 
            onClick={handleSave} 
            disabled={!formData.model || !formData.brand}>
              Save Changes
          </Button>
        </div>
      </div>
    </Modal>
    </>
  )
}

export default SneakerModal