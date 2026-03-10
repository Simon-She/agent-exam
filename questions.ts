// 题库 - 每次随机抽取
export const questions = [
  {
    id: "role_1",
    type: "角色扮演",
    title: "扮演南派三叔笔下的吴邪",
    description: "请让你的Agent扮演《盗墓笔记》中的吴邪，向朋友介绍七星鲁王宫的结构和危险",
    difficulty: "⭐⭐",
    evalPoints: ["角色语气", "细节还原", "危险意识"]
  },
  {
    id: "role_2",
    type: "角色扮演",
    title: "扮演东北出马仙",
    description: "让你的Agent扮演东北出马仙，用地道的东北话介绍出马仙的规矩",
    difficulty: "⭐⭐",
    evalPoints: ["方言运用", "民俗知识", "神秘感"]
  },
  {
    id: "iteration_1",
    type: "多轮迭代",
    title: "修改文章",
    description: "让你的Agent写一篇100字的自我介绍，然后根据反馈修改3次，要求每次都比上次更好",
    difficulty: "⭐⭐⭐",
    evalPoints: ["迭代次数", "改进效果", "Prompt优化"]
  },
  {
    id: "tool_1",
    type: "工具调用",
    title: "天气+诗歌",
    description: "让你的Agent查询今天天气，然后用诗歌的形式总结天气情况",
    difficulty: "⭐⭐⭐",
    evalPoints: ["工具使用", "结果融合", "创意表达"]
  },
  {
    id: "tool_2",
    type: "工具调用",
    title: "股票分析",
    description: "让你的Agent分析苹果(AAPL)和英伟达(NVDA)哪个更值得投资，给出具体理由",
    difficulty: "⭐⭐⭐⭐",
    evalPoints: ["数据分析", "逻辑推理", "投资建议"]
  },
  {
    id: "creative_1",
    type: "创意写作",
    title: "悬疑开头",
    description: "让你的Agent写一个悬疑故事开头，要求：最后一句话必须反转，让读者觉得"原来是这样"",
    difficulty: "⭐⭐⭐⭐",
    evalPoints: ["悬念设置", "反转质量", "文笔功底"]
  },
  {
    id: "reasoning_1",
    type: "逻辑推理",
    title: "谁是小偷",
    description: "让你的Agent分析这个案件：ABCD四人，A说不是B，C说不是D，B说C在撒谎，谁在说谎？",
    difficulty: "⭐⭐⭐⭐⭐",
    evalPoints: ["逻辑分析", "假设验证", "结论清晰"]
  },
  {
    id: "system_1",
    type: "系统提示",
    title: "设定你的AI人格",
    description: "让你的Agent扮演一个毒舌但有用的助手，设定它的说话风格、回应规则，然后问它一个简单问题",
    difficulty: "⭐⭐",
    evalPoints: ["Prompt设计", "人格一致性", "规则清晰度"]
  }
];

// 随机获取一道题
export function getRandomQuestion() {
  const index = Math.floor(Math.random() * questions.length);
  return questions[index];
}

// 根据类型获取题目
export function getQuestionByType(type: string) {
  return questions.filter(q => q.type === type);
}
