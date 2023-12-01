import React, {useEffect, useState} from 'react';
import styles from '../../styles/Modal.module.css';

const TagModal = ({ setModalOpen, selectedTags, setSelectedTags,setCurrentPage }) => {
    //나의 tag list 
    const [tags, setTags] = useState([]);

    //api get 요청으로 나의 tagList 받아오기
    useEffect(() => {
        fetch('/api/v1/tags')
        .then(response => response.json())
        .then(data => {
            const tagsData = data.result.map(tagData => ({
            tagType: tagData.tagType,
            tagNames: tagData.tagName,
            }));
            setTags(tagsData);
        })
        .catch(error => {
            console.error('태그 데이터를 가져오는 동안 오류가 발생했습니다.', error);
        });
    }, []);


    const handleTagClick = ( tagName) => {
        // 선택한 태그를 추가 또는 제거
        if (selectedTags.includes(tagName)) {
          setSelectedTags(selectedTags.filter(tag => tag !== tagName));
        } else {
          setSelectedTags([...selectedTags, tagName]);
        }
    };


    // 모달 끄기
    const closeModal = () => {
        setSelectedTags(selectedTags);
        setModalOpen(false);
    };


    return (
        <div className={styles.modalBox}>
            <div className={styles.container}>
                <button className={styles.close} onClick={closeModal}>
                    X
                </button>
                {tags.map(tag => (
                    <div key={tag.tags} className={styles.tagBox}>
                        <h2>{tag.tagType}</h2>
                        <div className={styles.tags}>
                            {tag.tagNames.map(tagName => (
                            <button
                                key={tagName}
                                className={`${styles.tag} ${
                                selectedTags.includes(tagName) ? styles.selected : ''
                                }`}
                                onClick={() => handleTagClick( tagName)}
                            >
                                {tagName}
                            </button>
                            ))}
                        </div>
                    </div>
                ))}
                </div>   
            </div>
    );
};
export default TagModal;
