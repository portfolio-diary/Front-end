import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutAPI } from '../apis/MemberAPI';
import styles from '../styles/Header.module.css';

const Header = () => {
    const { handleLogout } = LogoutAPI();

    return (
        <div>
            <nav>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src="/logo.png" alt="로고 이미지" />
                    </Link>
                </div>
                <div className={styles.navButtons}>
                    <Link to="/write" className={styles.writeButton}>
                        글쓰기
                    </Link>
                    <Link to="/mypage">
                    <button className={styles.mypageButton}>마이페이지</button>
                    </Link>
                    <button className={styles.loginButton} onClick={handleLogout}>로그아웃</button>
                </div>
            </nav>
        </div>
    );
};

export default Header;
