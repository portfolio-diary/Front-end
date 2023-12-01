import React, { useState } from 'react';
import styles from '../../styles/Write.module.css';

const ExperienceForm = ({ id, title, onRemove, onSave}) => {
   
    //expreince의 title과 textarea 내용
    const [exTitle,setExTitle] = useState(title);
    const [text, setText] = useState('');


    const handleTextChange = e => {
        const newText = e.target.value;
        setText(newText);
        onSave({ id, title: exTitle, content: newText }); // 변경된 text를 onSave를 통해 전달
    };

    const handleTitleChange = e => {
        const newTitle = e.target.value;
        setExTitle(newTitle);
        onSave({ id, title: newTitle, content: text }); // 변경된 text를 onSave를 통해 전달
    };
    
    const handleRemove = e => {
        e.preventDefault();
        onRemove(); // 부모 컴포넌트로 삭제 요청 전달
    };

    //text의 길이를 셈
    const characterCount = text.length;

    return (
        <div className={styles.exContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.titleCharacterContainer}>
                    <input
                        className={styles.inputTitle}
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={exTitle}
                        onChange={handleTitleChange}
                        required
                    />
                    <div className={styles.characterCount}>
                        {characterCount}자
                    </div>
                </div>
                <button className={styles.deleteButton} onClick={handleRemove}>
                    X
                </button>
            </div>
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="내용"
                required

            />
        </div>
    );
};

export default ExperienceForm;
