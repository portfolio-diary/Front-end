import React, { useState,useEffect } from 'react';
import Login from '../src/routes/Login';
import Home from '../src/routes/Home';
import Write from '../src/routes/Write';
import PostDetail from './routes/PostDetail';
import MyPage from '../src/routes/MyPage';
import Recycle from '../src/routes/Recycle';
import {
    BrowserRouter as Router,
    Routes,
    Route,

  } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 상태로 관리
    const [loading, setLoading] = useState(true);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    
    useEffect(() => {
        const token = getCookie('accessToken');
    
        if (token) {
            setIsLoggedIn(true);
            console.log('isLoggedIn:', isLoggedIn);
        }
        setLoading(false); // 토큰 처리가 끝났음을 표시하여 로딩 상태를 false로 변경
      }, [isLoggedIn]);
    if (loading) {
      return <div>Loading...</div>; // 토큰 처리 중일 때 로딩 화면 표시
    }
    return <Router>
        <Routes>
        <Route path="/" element={isLoggedIn ? <Home />: <Login/>}
        />
        <Route path="/login" element={<Login />} />
            <Route path="/write" element={<Write />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/recycle" element={<Recycle />} />
        </Routes>
    </Router>

}


export default App;
