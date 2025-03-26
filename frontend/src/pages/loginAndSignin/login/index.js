import { useState } from "react";
import styles from "../loginAndSignin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames/bind";
import Image from '../../../assets/images'
const cx = classNames.bind(styles);

function LogIn() {
   

   
   

    return (
        <div className={cx("login-container")}>
            <h2>Đăng nhập</h2>
            <form >
              <div className={cx('btn-login')}>
              <img src={Image.facebookIcon} alt="Google Logo"  width={20}/> 
              <strong>  Đăng nhập bằng Facebook</strong>
            
              </div>
              <div className={cx('btn-login')}>
              <img src={Image.googleIcon} alt="Google Logo"  width={20}/> 
             
              <strong> Đăng nhập bằng Google</strong>
              </div>
            </form>
        </div>
    );
}

export default LogIn;
