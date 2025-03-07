import React from 'react'

function InputField({name,label,handleChange,value}) {
  return (
    <div className='input_group_double' style={{marginTop:"10px"}}>
            <p className='input_text'>{label}</p>
            <input className='half_input' style={{width:"100%"}} name={name} onChange={handleChange}   value={value} required/>    
    </div>
  )
}

export default InputField