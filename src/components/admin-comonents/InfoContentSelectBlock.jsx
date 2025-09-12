import React from 'react'

function InfoContentSelectBlock({title, value, extraClass,isEditing, setUpdatedRooms,inputType, inputMode}) {

    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = (e)=>{
        setInputValue(e.target.value);
        setUpdatedRooms((prev)=>({...prev, [title]: e.target.value}));

    }
     useEffect(()=>{
          setInputValue(value);
        },[value])
        
    console.log("Info content Select block");
  return (
    <div className={`info-content-block ${extraClass}`}>

     <input type='checkbox' checked={value} onChange={handleInputChange} disabled={!isEditing} />
     <label htmlFor="checkbox">{title}</label>

    </div>
  )
}

export default InfoContentSelectBlock