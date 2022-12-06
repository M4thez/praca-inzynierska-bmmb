import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styles from '../styles/LinkHub.module.scss'
import { useDispatch } from 'react-redux'
import { changeModalVisible } from '../../../infrastructure/store/appState'
// import { HeaderNavigation } from '../../../infrastructure/navigation/headerNavigation'
// import { Form } from '../../Account/components/Form'

export function LinkHub() {
  //creating ref to dispatch
  const dispatch = useDispatch()

  function closeLinkHub() {
    dispatch(changeModalVisible())
  }
  return (
    <div className="parent-cont">
      <div className={styles['links-container']}>
        <Link to="/mars" className="mars-li" onClick={() => closeLinkHub()}>
          Learn about Mars
        </Link>
        <Link to="/solar" className="solar-li" onClick={() => closeLinkHub()}>
          Learn about our Solar System
        </Link>
        <Link to="/stage" className="stage-li" onClick={() => closeLinkHub()}>
          Learn about NASA'S inventions
        </Link>
        <Link to="/apod" className="apod-li" onClick={() => closeLinkHub()}>
          See interesting astronomy pictures
        </Link>
        <Link to="/about" className="about-li" onClick={() => closeLinkHub()}>
          Learn more about the project
        </Link>
      </div>
    </div>
  )
}
