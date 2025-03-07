import React from 'react'
import './form.scss'
function DoubleInputGroup({label1,label2,name1,name2,handleChange,select,doubleSelect,placeholder1,placeholder2,children,children2,readOnly,value1,value2,type1="text",type2="text"}) {
  return (
    <div className='input_group_otc_double'>
        <div className='input_group_double'>
            <p className='input_text'>{label1}</p>
            {
                select ?  <select 
                className='half_input' 
                name={name1}
                onChange={handleChange}
                
                >
                    {children}
        
                </select> :

                <input type={type1} className='half_input' name={name1} onChange={handleChange} placeholder={placeholder1} readOnly={readOnly} value={value1} required/>
            }
        </div>
        {
                doubleSelect ?

                <select 
                className='half_input' 
                name={name2}
                onChange={handleChange}
                
                >
                    {children2}
        
                </select> :

                <div className='input_group_double'>
                    <p className='input_text'>{label2}</p>
                    <input type={type2} className='half_input'  name={name2} onChange={handleChange} placeholder={placeholder2} value={value2} required/>
                </div>
        }
    </div>
  )

}
export default DoubleInputGroup