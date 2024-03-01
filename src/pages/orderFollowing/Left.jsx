import React from 'react'
import PayCard from './PayCard'
import PayProducts from './PayProducts'

const Left = ({orderData}) => {
  return (
    <div className='left-container'>
        <PayCard orderData={orderData}/>
        <PayProducts orderData={orderData}/>
    </div>
  )
}

export default Left
