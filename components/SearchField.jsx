import { useEffect, useState } from "react"
import { Container } from "./Container"
import Select from "./Select"
import ComboBox from "./ComboBox"
import { getColData, getColumns } from "@/lib/dbManager"

export default function SearchField({columnIndex, value}) {

  const columns = getColumns()
  const [selected, setSelected] = useState(columns[columnIndex])
  const [comboBox, setComboBox] = useState([{id:0, search:''}])

  const [selectedComboBox, setSelectedComboBox] = useState(value)
  
  function updateSelect(value) {
    console.log(value)
    setSelected(value)
  }

  // Updates ComboBox Data based on selected option
  useEffect(() => {
    if(selected) {
      getColData(selected.name)
        .then((res) => res.json())
        .then(data => {
          if (data) {
            setComboBox(data.data)
          }
        })
    }
  }, [selected]) 


    return (

        <div className="flex shadow-md rounded-md flex-col justify-center p-4 sm:flex-row md:flex-col lg:flex-row">
          {selected && <Select className="mb-2 sm:mr-2 sm:mb-0" columns={columns} selected={selected} updateSelect={updateSelect} />}
          {/* TODO: Add error validation <- missing field do nothing */}
          {comboBox && <ComboBox className="flex-1 mb-2 sm:ml-2 sm:mb-0" comboBox={comboBox} column={selected} selected={selectedComboBox} setSelected={setSelectedComboBox}/>}  
        </div>
    )
}