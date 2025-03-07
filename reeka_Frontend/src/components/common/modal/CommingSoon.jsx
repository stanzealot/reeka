import React from 'react'
import './modal.css'

function CommingSoon({setIsModalOpen}) {
  return (
    <div className='overlay' onClick={setIsModalOpen?.bind(this,false)}>
        {/* <img src='/images/modal/cross.png' alt='' style={{marginLeft:"50px",marginTop:"50px"}}/> */}
       
    </div>
  )
}

export default CommingSoon