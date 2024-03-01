import React from 'react'
import PayCard from './PayCard'
import PayProducts from './PayProducts'

const Left = ({handleConfirm,addLoading}) => {
  return (
    <div className='left-container'>
        <PayCard addLoading={addLoading} handleConfirm={handleConfirm}/>
        <PayProducts />
    </div>
  )
}

export default Left
