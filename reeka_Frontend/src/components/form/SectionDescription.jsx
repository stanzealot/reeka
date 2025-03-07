import React from 'react'
import styled from 'styled-components'
const SectionDescDivider = styled.div`
display: flex;
align-items:center;
gap: 6px;
margin-top:2rem;
margin-bottom:1rem;
.desc{
    color:  var(--color-primary);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
   
}
.divider{
    border:1px solid #E7EAEE;
    flex:1;
}
`
function SectionDescription({name}) {

   
  return (
    <SectionDescDivider>
        <p className='desc'>{name}</p>
        <div className='divider'></div>
    </SectionDescDivider>
  )
}

export default SectionDescription