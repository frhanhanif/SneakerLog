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
  const [sortCriteria, setSortCriteria] = useState("date_latest")
  const [brandFilter, setBrandFilter] = useState("")

  const sortBy = [
    {value:"date_latest",label:"Newest"},
    {value:"date_earliest", label:"Oldest"},
    {value:"model_asc", label:"Model (A-Z)"},
    {value:"model_desc", label:"Model (Z-A)"},
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
      setSneakerData(prevData => [...prevData, newSneaker]);
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
      <div className="flex-auto lg:max-w-[50%]">
        <Search 
          input={setSearchInput}
          placeholder="Search by Brand or Model" 
        />
      </div>

      <div className="flex-none pt-2 sm:pt-0">
        <AddSneaker updateSneakerList={updateSneakerList}/>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Select
          options={sortBy}
          onChange={setSortCriteria}
          className="dark:bg-dark-900 text-xs sm:text-sm"
        />
        <Select 
          options={uniqueBrands}
          onChange={setBrandFilter} 
          className="dark:bg-dark-900 text-xs sm:text-sm" />
      </div>
    </div>

    <div className="grid text gap-2 xl:grid-cols-3 md:grid-cols-2">
    <div className="font-bold col-span-full">
    {brandFilter ? brandFilter : "All Sneaker"} ({sortedData.length})
  </div>
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