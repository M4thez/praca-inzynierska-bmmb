import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import style from './headerNavigation.module.scss'
import { auth } from '../firebase/firebase'
import { changeModalVisible, changeSideMenuVisible, showLoginForm } from '../store/appState'
import { AiOutlineMenu } from 'react-icons/ai'

export const HeaderNavigation = () => {
  const user = auth.currentUser

  //creating ref to redux dispatch object
  const dispatch = useDispatch()

  //ref to user login status in redux
  const userLoggedIn = useSelector((state) => state.app.userLoggedIn)
  console.log('logged in?', userLoggedIn)

  console.log('userinio', user)
  useEffect(() => {}, [user])
  async function signoutUser() {
    try {
      await signOut(auth)
      console.log('user is signed out', userLoggedIn)
      setTimeout(() => (window.location.href = '/about'), 1000)
    } catch (error) {
      console.log('error', error.message)
    }
  }

  function closeLinkHub() {
    dispatch(changeModalVisible())
  }
  function showForm() {
    dispatch(showLoginForm())
  }
  function toggleMenu() {
    dispatch(changeSideMenuVisible())
  }
  return (
    <nav className={style.headerNav}>
      <Link to="/menu" className={style.logoLink}>
        <img src="src/assets/cosmic-logo.svg" alt="cosmic logo" className={style.logo} />
      </Link>
      <button id={style['hamburger-icon']} onClick={toggleMenu}>
        {' '}
        <AiOutlineMenu />
      </button>
      <ul className={style.links}>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        {!userLoggedIn ? (
          <li>
            <p
              onClick={() => {
                showForm()
              }}
            >
              Sign In / Sign Up
            </p>
          </li>
        ) : (
          <li onClick={signoutUser}>
            <a href="">Sign Out</a>
          </li>
        )}
      </ul>
    </nav>
  )
}
