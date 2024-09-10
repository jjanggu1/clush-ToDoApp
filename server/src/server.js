const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const todoDataRouter = require('./routes/todoDataRouter');

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000', // 허용할 도메인 설정
  allowedHeaders: ['Content-Type'] // 허용할 헤더 설정
}));

app.use(express.json());
app.use('/todos', todoDataRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
