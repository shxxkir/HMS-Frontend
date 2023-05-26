import React from 'react' 
import css from '../styles/News.module.css' 
 
function News() { 
  return ( 
    <div className={css.newsMain}> 
      <div className={css.newsHeader}><h2>Latest Articles & Blogs</h2></div> 
        <div className={css.newsContainer}> 
            <div className={css.newsRow}> 
                <div className={css.newsColumns}> 
                  <div className={css.newsImage1}/> 
                  <h4>July 12, 2018</h4> 
                  <h1>Top 5 Tips for Caregivers <br/>During the Holidays</h1> 
                  <p>It's essential to have a realistic plan for the holidays, taking into account the needs and abilities of the person you're caring for. Set realistic expectations for what you can accomplish during this time</p> 
                </div> 
                <div className={css.newsColumns1}> 
                  <div className={css.newsImage2}/> 
                  <h4>May 2, 2018</h4> 
                  <h1>Caregiving Checklist for a <br/>New Year</h1> 
                  <p>Caring for a loved one can be emotionally and physically draining, so it's important to take care of yourself. Set aside time for self-care, such as exercising, socializing with friends and family.</p> 
                </div> 
                <div className={css.newsColumns2}> 
                  <div className={css.newsImage3}/> 
                  <h4>November 3, 2018</h4> 
                  <h1>Our Experts Answer Your Questions About MedCare</h1> 
                  <p>We're happy to help answer any questions you may have about MedCare. What would you like to know? what specific questions you have about MedCare or healthcare in general,</p> 
                </div> 
            </div> 
        </div> 
  </div> 
  ) 
} 
 
export default News