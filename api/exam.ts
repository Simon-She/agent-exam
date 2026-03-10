import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getRandomQuestion } from './questions';

// 简单的评分系统
async function evaluateAnswer(question: any, answer: string, prompt: string): Promise<{
  score: number;
  feedback: string;
  suggestions: string[];
}> {
  const evaluationPrompt = `你是一个AI能力评估专家。请评估以下AI回答的质量。

题目类型：${question.type}
题目：${question.title}
题目描述：${question.description}
评价维度：${question.evalPoints.join(', ')}

用户的原始Prompt：${prompt}

AI的实际回答：${answer}

请从以下维度评分（0-100分）：
1. Prompt质量 - 用户的问题是否清晰、有条理
2. 回答质量 - AI的回答是否准确、完整、有创意
3. 迭代优化 - 如果是迭代题，用户是否有改进Prompt

请返回JSON格式：
{
  "score": 数字(0-100),
  "feedback": "一句话总结评价",
  "suggestions": ["建议1", "建议2", "建议3"]
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: '你是一个专业的AI能力评估专家。请严格按照JSON格式返回结果。' },
          { role: 'user', content: evaluationPrompt }
        ],
        temperature: 0.3
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '{}';
    
    // 解析JSON
    const result = JSON.parse(content);
    return result;
  } catch (error) {
    // 如果API调用失败，使用简单规则评分
    const baseScore = answer.length > 50 ? 60 : 40;
    return {
      score: baseScore,
      feedback: '评分系统暂时使用基础评分，请确保API Key配置正确',
      suggestions: ['配置OPENAI_API_KEY以获得更准确的评分']
    };
  }
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { method } = request;

  if (method === 'GET') {
    // 获取题目
    const question = getRandomQuestion();
    return response.json({
      success: true,
      question
    });
  }

  if (method === 'POST') {
    // 提交答案并评分
    const { questionId, answer, prompt } = request.body;
    
    if (!answer || !prompt) {
      return response.status(400).json({
        success: false,
        error: '请提供answer和prompt'
      });
    }

    // 找到对应的题目
    const questions = await import('./questions');
    const question = questions.questions.find((q: any) => q.id === questionId);

    if (!question) {
      return response.status(404).json({
        success: false,
        error: '题目不存在'
      });
    }

    // 评分
    const result = await evaluateAnswer(question, answer, prompt);

    return response.json({
      success: true,
      result: {
        ...result,
        question: {
          id: question.id,
          title: question.title,
          type: question.type,
          difficulty: question.difficulty
        }
      }
    });
  }

  return response.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
