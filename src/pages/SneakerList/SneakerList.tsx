import { useEffect, useMemo, useState } from "react";
import Search from "../../components/common/Search";
import SneakerCard from "../../components/SneakerList/SneakerCard";
import supabase from "../../supabaseClient";
import Select from "../../components/form/Select";
import _ from "lodash";
import { Sneaker } from "../../interface/Sneaker";
import AddSneaker from "../../components/SneakerList/AddSneaker/AddSneaker";

const SneakerList = () => {
  const [sneakerData, setSneakerData] = useState<Sneaker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [sortCriteria, setSortCriteria] = useState("model_asc")
  const [brandFilter, setBrandFilter] = useState("")

  const sortBy = [
    {value:"model_asc", label:"Model (A-Z)"},
    {value:"model_desc", label:"Model (Z-A)"},
    {value:"date_earliest", label:"Purchased Earliest"},
    {value:"date_latest",label:"Purchased Latest"},
    {value:"price_highest", label:"Price Highest"},
    {value:"price_lowest", label:"Price Lowest"}
  ]

  if (sneakerData === null) {
    return null
  }

  useEffect ( () => {
      const fetchData = async () => {
        try{
          const {data,error} = await supabase.from('sneakerlist').select('*')
        
          if(error) {throw error};

          setSneakerData(data || [])
        }
        catch (err) {
          console.error("Error fetching data : ", err)
        }
        finally{
          setIsLoaded(true)
        }
      }
      fetchData()
    }, [] 
  )

  const updateSneakerList = (newSneaker: Sneaker) => {
    // If it's an update, replace the existing sneaker
    if (newSneaker.id) {
      setSneakerData(sneakerData.map(sneaker => 
        sneaker.id === newSneaker.id ? newSneaker : sneaker
      ));
    } 
    // If it's a new sneaker, add it to the array
    else {
      setSneakerData(prevData => [...prevData, newSneaker]);
    }
  };

  // Get unique brands for the filter dropdown
  const uniqueBrands = useMemo(() => {
    const brands = Array.from(new Set(sneakerData.map(s => s.brand)));
    return [
      { value: "", label: "All Brands" },
      ...brands.map(brand => ({ value: brand, label: brand }))
    ];
  }, [sneakerData]);

  // Filter data based on search input and brand filter
  const filteredData = useMemo(() => {
    return sneakerData.filter(
      (data) => 
        (data.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
        data.model.toLowerCase().includes(searchInput.toLowerCase())) &&
        (brandFilter === "" || data.brand === brandFilter)
    );
  }, [sneakerData, searchInput, brandFilter]);

  const sortedData = (() => {
    switch(sortCriteria) {
      case "model_asc":
        return _.orderBy(filteredData,[(i) => i.model.toLowerCase()], ['asc'])
      case "model_desc":
        return _.orderBy(filteredData,[(i) => i.model.toLowerCase()], ['desc'])
      case "date_earliest":
        return _.orderBy(filteredData, ['purchased_date'], ['asc'])
      case "date_latest":
        return _.orderBy(filteredData, ['purchased_date'], ['desc'])
      case "price_highest":
        return _.orderBy(filteredData, ['price'], ['desc'])
      case "price_lowest":
        return _.orderBy(filteredData, ['price'], ['asc'])
      default:
       return filteredData
    }
  })()

  return (
    <>
    <div className="pb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="flex-auto xsm:py-2 lg:max-w-[50%]">
        <Search 
          input={setSearchInput}
          placeholder="Search by Brand or Model" 
        />
      </div>

      <div className="flex-none">
        <AddSneaker updateSneakerList={updateSneakerList}/>
      </div>
      
      <div className="flex py-2 flex-col sm:flex-row gap-2 sm:gap-4">
        <Select
          options={sortBy}
          onChange={setSortCriteria}
          className="dark:bg-dark-900 text"
        />
        <Select 
          options={uniqueBrands}
          onChange={setBrandFilter} 
          className="dark:bg-dark-900" />
      </div>
    </div>

    <div className="grid gap-6 xl:grid-cols-3 md:grid-cols-2">
      {sortedData.length > 0 ? 
        sortedData.map(
          data => 
            <SneakerCard key={data.id} sneaker={data}/>
          ) : isLoaded ?
          (
            <div className="col-span-full text text-center py-8 text-2xl font-bold">
              No sneakers found
            </div>
          ) :
          null
      }
    </div>
    </>
  );
};

export default SneakerList