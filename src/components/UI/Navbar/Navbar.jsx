import React, { useState } from "react";
import MyButton from "../MyButton/MyButton";
import AuthService from "../../../services/AuthService";
import MasterAuth from "../../../services/MasterAuth";

import logo from "../../../img/logo.jpg"

import { useNavigate } from "react-router-dom";

import classes from "./Navbar.module.css"


function Navbar() {
    const navigate = useNavigate();

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    async function logout() {
        if (localStorage.getItem("whoAuth") === "admin" ) {
            await AuthService.logout();
        }
        else if (localStorage.getItem("whoAuth") === "master" ) {
            await MasterAuth.logout();
        }
        navigate('/');
    }

    const currentUrl = window.location.href;

    return (
        <div className={classes.navbar}>
            <img className={classes.logoStyle} src={logo} onClick={() => navigate('/')} alt="Logo"/>
            { localStorage.getItem("whoAuth") && <MyButton className={classes.menuBtn} onClick={logout}>Выйти</MyButton> }
            {
                localStorage.getItem("whoAuth") === "master" && currentUrl.search("/repair_orders/all") === -1 &&
                <MyButton className={classes.menuBtn} onClick={(e) => {
                    e.preventDefault();
                    navigate('/repair_orders/all')
                }
            }>Все заказы на ремонт</MyButton>
            }
            {
                localStorage.getItem("whoAuth") === "admin" && currentUrl.search("/admin/master/all") === -1 &&
                <MyButton className={classes.menuBtn} onClick={(e) => {
                    e.preventDefault();
                    navigate('/admin/master/all')
                }
            }>Все мастера</MyButton>
            }
            {
                localStorage.getItem("whoAuth") === "admin" && currentUrl.search("/admin/master/add") === -1 &&
                <MyButton className={classes.menuBtn} onClick={(e) => {
                    e.preventDefault();
                    navigate('/admin/master/add')
                }
            }>Добавить мастера</MyButton>
            }
            {
                localStorage.getItem("whoAuth") && 
                <MyButton className={classes.openMenuBtn} onClick={(e) => {
                    e.preventDefault();
                    if (isOpenMenu) setIsOpenMenu(false);
                    else setIsOpenMenu(true);
                }
            }>Меню</MyButton>
            }

            {
                isOpenMenu && 
                <div className={classes.menuBar}>
                    { 
                        localStorage.getItem("whoAuth") && 
                        <MyButton className={classes.menuBtnWhenIsOpend} onClick={logout}>
                            Выйти
                        </MyButton> 
                        }
                    {
                        localStorage.getItem("whoAuth") === "master" && currentUrl.search("/repair_orders/all") === -1 &&
                        <MyButton className={classes.menuBtnWhenIsOpend} onClick={(e) => {
                            e.preventDefault();
                            navigate('/repair_orders/all')
                        }
                    }>Все заказы на ремонт</MyButton>
                    }
                    {
                        localStorage.getItem("whoAuth") === "admin" && currentUrl.search("/admin/master/all") === -1 &&
                        <MyButton className={classes.menuBtnWhenIsOpend} onClick={(e) => {
                            e.preventDefault();
                            navigate('/admin/master/all')
                        }
                    }>Все мастера</MyButton>
                    }
                    {
                        localStorage.getItem("whoAuth") === "admin" && currentUrl.search("/admin/master/add") === -1 &&
                        <MyButton className={classes.menuBtnWhenIsOpend} onClick={(e) => {
                            e.preventDefault();
                            navigate('/admin/master/add')
                        }
                    }>Добавить мастера</MyButton>
                    } 
                </div>
            }
        </div>
    )
}

export default Navbar;
