import { NavLink } from "react-router"
import styles from "./Header.module.css"

function Header({title}){


  return(
    <>
    <div className={styles.headerTitleImg}>
      <img src="learns-dark.png" alt="logo" className={styles.headerImgStyle} />
      <h1>{title}</h1>
    </div>
      <nav className={styles.nav}>
       <NavLink to={"/"} 
         className={({ isActive }) =>isActive ?  styles.active: styles.inactive}>
         Home
        </NavLink>
        <NavLink to={"/about"} 
          className={({ isActive }) =>isActive ? styles.active: styles.inactive}>
          About
        </NavLink>
    </nav>


    </>
  )
}

export default Header