const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// todos.json 파일 경로 설정
const todosFilePath = path.join(__dirname, '../data/todos.json');

// GET 요청으로 todos 데이터를 반환
router.get('/', (req, res) => {
    // 파일을 비동기로 읽기
    fs.readFile(todosFilePath, 'utf-8', (err, data) => {
        if (err) {
            // 에러 처리
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Failed to read todos data' });
        }

        try {
            // JSON 데이터 파싱
            const todos = JSON.parse(data);
            // JSON 응답
            res.json(todos);
        } catch (parseErr) {
            // JSON 파싱 에러 처리
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ message: 'Invalid JSON data' });
        }
    });
});

module.exports = router;
