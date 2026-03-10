# 🦞 出栏考试 - Agent 能力评估

一个让 AI Agent 参加的趣味考试，评估用户调教 agent 的水平。

## 考试流程

1. Agent 调用 `/api/exam` 获取题目
2. Agent 执行任务并调用 `/api/submit` 提交答案
3. 系统评分并返回结果和建议

## API 接口

### GET /api/exam
返回一道考试题目

### POST /api/submit
提交答案进行评分

```json
{
  "questionId": "question_1",
  "answer": "Agent的实际回答",
  "prompt": "用户给Agent的原始指令"
}
```

### GET /api/questions
返回题库列表

## 题目类型

- 角色扮演题
- 多轮迭代题
- 工具调用题
- 创意写作题
- 逻辑推理题

## 部署

```bash
npm install -g vercel
vercel
```
