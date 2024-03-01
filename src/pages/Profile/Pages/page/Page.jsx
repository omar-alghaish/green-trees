import React from 'react'
import './page.css'
import UseGeneral from '../../../../hooks/useGeneral';
const Page = ({item,setActivePage,activePage}) => {
  const { language } = UseGeneral();
  return (
    <div onClick={()=>{
      setActivePage(item.route)
    }} className={activePage==item.route?'page active':'page'}>
      {
        item.icon
      }
      {
        language=='ar'?
          item.name_ar
        :
        item.name_en
      }
    </div>
  )
}

export default Page
