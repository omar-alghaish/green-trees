import React, { useEffect, useState } from 'react'
import './pagestag.css'
import { FaRegUser } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { LuWallet } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
import { BsCreditCard2Front } from "react-icons/bs";
import { RiCoupon2Line } from "react-icons/ri";
import Page from './page/Page';
const PagesTag = ({setCurrentPage}) => {
  const [tags,setTags]=useState([
    {
      name_ar:'الحساب',
      name_en:'Account',
      route:'account',
      icon:<FaRegUser/>
    },
    {
      name_ar:'العنوان',
      name_en:'Location',
      route:'location',
      icon:<CiLocationOn/>
    },
    {
      name_ar:'الطلبات',
      name_en:'Orders',
      route:'orders',
      icon:<LuWallet/>
    },
    {
      name_ar:'المحفظه',
      name_en:'Wallet',
      route:'wallet',
      icon:<IoWalletOutline/>
    },
    {
      name_ar:'بطاقتى المحفوظه',
      name_en:'Card',
      route:'card',
      icon:<BsCreditCard2Front/>
    },
    {
      name_ar:'الكوبوات',
      name_en:'Coupons',
      route:'coupons',
      icon:<RiCoupon2Line/>
    },
  ])
  const [activePage,setActivePage]=useState('account');
  useEffect(()=>{
    setCurrentPage(activePage);
  },[activePage])
  return (
    <div className='page_tags_page'>
      {
        tags.map((item,index)=>{
          return(
            <Page activePage={activePage} setActivePage={setActivePage} item={item} key={index}/>
          )
        })
      }
    </div>
  )
}

export default PagesTag
