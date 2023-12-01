import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import TagFilter from '../components/Tag/TagFilter';
import Header from '../components/Header';
import { getPosts } from '../apis/PostAPI';
import { getTagPosts } from '../apis/TagAPI';
import Pagination from '../components/Pagination';
import PostList from '../components/Post/PostList';
import Footer from '../components/Footer';


const Home = () => {
  
  const [nickname, setNickname] = useState('');
  
  useEffect(() => {
    fetch(`/api/v1/mypages`)
      .then(response => response.json())
      .then(data => {
        setNickname(data.result.name);
      })
      .catch(error => {
        console.error('login user 데이터를 가져오는 동안 오류가 발생했습니다.', error);
      });
  });

    //posts 목록
    const [posts, setPosts] = useState([]);
    //최신순, 오래된순 정렬방법
    const [orderBy, setOrderBy] = useState('newest');
    //현재 페이지 
    const [currentPage, setCurrentPage] = useState(0);
    //총 page 수
    const [totalPages, setTotalPages] = useState(1);
    //총 post 수
    const [totalPosts, setTotalPosts] = useState(0);
    
    //page가 바뀌면 화면을 top으로 이동
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0});
    };
    
    //선택된 태그
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagPosts, setTagPosts] = useState([]);
    // API 요청으로 posts 목록 받아오기
    useEffect(() => {
      if (selectedTags.length === 0) 
        getPosts(currentPage, orderBy)
        .then((data) => {
            if (data) {
            setPosts(data.pagePosts);
            setTotalPages(data.totalPages);
            setTotalPosts(data.totalPosts);
            }
        })
        .catch((error) => {
            console.error('포스트 데이터를 가져오는 동안 오류가 발생했습니다.', error);
        });
      else{
        getTagPosts(selectedTags, currentPage)
          .then((data) => {
            if (data) {
              setTagPosts(data.pagePosts);
              setTotalPages(data.totalPages);
              setTotalPosts(data.totalPosts);
            }
          })
          .catch((error) => {
            console.error('태그별 포스트 데이터를 가져오는 동안 오류가 발생했습니다.', error);
          });
      }
    }, [orderBy, currentPage, selectedTags]);



    return (
        <div>
            <div className={styles.fixedHeader}>
                <Header />
                <h1>{nickname}님의 기록 💪🏻</h1>
                
            </div>
            <div className={styles.container}>
                <TagFilter
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                setCurrentPage={setCurrentPage}
                setOrderBy={setOrderBy}
                />
                <PostList posts={selectedTags.length === 0 ? posts : tagPosts} />
                {totalPosts > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                )}
            </div>
            <Footer />
      </div>
    );
};

export default Home;