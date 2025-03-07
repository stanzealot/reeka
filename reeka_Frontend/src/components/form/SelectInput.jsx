import React from 'react'

function SelectInput({label,handleChange,name,value,children,others}) {
  return (
    <div className='input_group_double' style={{width:"100%"}}>
    <p className='input_text'>{label}</p>
     <select 
        className='half_input' 
        name={name}
        onChange={handleChange}
        value={value}
        {...others}
        >
            {children}

    </select> 

    
    
    </div>
  )
}

export default SelectInput