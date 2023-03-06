import React from 'react'
import ReadMore from '../readMore/readMore'
import './blogCard.css'
export default function BlogCard(props) {

  return (
    <>
    <div className='blog-card'>
    <h3>{props.title}</h3>
    <ReadMore>{props.maintext}</ReadMore>
    <p className='auther'>auther: {props.auther}</p>
    </div>
    </>
  )
}
