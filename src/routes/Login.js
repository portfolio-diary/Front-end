import React from 'react';
import styles from '../styles/Login.module.css';


const Login = () => {


    return (
        <div className={styles.main}>
            <img className={styles.mainImg} src="/PODA.png" alt="mainImg" />
            <div className={styles.googleLogin}>
                <a href="http://ec2-54-79-176-242.ap-southeast-2.compute.amazonaws.com:8080/oauth2/authorization/google" className={styles.googleButton}>
                    <div className={styles.googleIconWrapper}>
                        <img
                            className={styles.googleIcon}
                            src="/google-icon.png"
                            alt="google-icon"
                        />
                    </div>
                    <span className={styles.buttonText}>구글로 로그인</span>
                </a>
            </div>
        </div>
    );
};

export default Login;
