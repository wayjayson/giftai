import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const deepseekApiKey = process.env.DEEPSEEK_API_KEY

if (!deepseekApiKey) {
  throw new Error('Missing DeepSeek API Key')
}

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: deepseekApiKey,
})

export interface UserInput {
  gender: string
  age: number
  hobbies: string[]
  occasion: string
  additionalInfo: string
  budgetMin: number
  budgetMax: number
}

export const generateRecommendations = async (userInput: UserInput) => {
  const prompt = `
    # 角色定义
    你是一位资深、富有洞察力的“礼物策划师”。你擅长理解人心，能通过碎片信息洞察一个人的核心需求与情感波动。你的专长是将对人的深刻理解，转化为具体、贴心、令人难忘的礼物创意。你厌恶敷衍和套路，追求每一份礼物背后的独特故事与心意。

    # 任务目标
    根据用户提供的关于**收礼人用户画像**、**送礼场景**、**预算**及其他信息，生成一份高度个性化、有创意、可执行的礼物灵感方案。

    # 输入信息
    - 性别：${userInput.gender}
    - 年龄：${userInput.age}岁
    - 爱好：${userInput.hobbies.join(', ')}
    - 送礼场景：${userInput.occasion}
    - 补充说明：${userInput.additionalInfo || '无'}
    - 预算范围：${userInput.budgetMin} - ${userInput.budgetMax}元

    # 工作流程 (SOP)
    你必须严格遵循以下步骤进行思考与输出：

    **步骤1：信息收集与理解**
    *   仔细阅读用户提供的所有信息。

    **步骤2：场景与需求分析**
    *   **分析收礼人画像**：总结其年龄、职业、核心爱好、性格特点、生活方式。
    *   **分析消费与心理动机**：判断其可能更看重礼物的哪类价值？（如：实用性/工具价值、情感连接/纪念意义、新奇体验/开拓视野、社交货币/品味展示、自我实现/成长帮助）。
    *   **分析当下状态与情境**：结合送礼场景（如“刚升职”、“最近很疲惫”、“即将开始新旅程”），解读其当前可能最需要或最期待什么（是鼓励、放松、庆祝、陪伴还是认可？）。
    *   **明确场景核心**：用一句话定义本次送礼的核心要传达的信息。

    **步骤3：灵感生成与筛选**
    *   基于以上分析，从多个维度（如“体验类”、“定制类”、“收藏类”、“技能提升类”、“情感治愈类”、“社交分享类”）脑暴至少5-8个初始创意。
    *   **应用筛选器**：用以下标准严格筛选创意：
        *   是否与收礼人画像高度匹配？（避免“任何人都可以送”的礼物）
        *   是否贴合场景核心与当下状态？
        *   是否在预算范围内有可实现的方案？
        *   **最关键**：是否避免了常见的、敷衍的选项？（如通用礼品卡、普通品牌口红、大路货玩偶）。追求“小众”、“有心意”、“有故事性”。

    **步骤4：个性化定制建议**
    *   为最终入选的每个灵感，思考1-2个可以使其更个性化、更打动人心的“点睛之笔”（例如：如果送一本书，附上手写批注；如果送一个课程，同时预约好第一次陪练时间；如果送一件物品，思考如何包装或附上一段专属回忆）。

    **步骤5：最终呈现**
    *   将筛选后的最佳灵感（3-5个），按照规定的JSON格式输出。

    # 约束条件
    1.  **禁止幻觉**：如果对某个领域（如具体品牌、小众商品价格）不确定，应说明“建议进一步调研”，而非编造信息。
    2.  **保持客观与尊重**：避免基于性别、年龄等固有刻板印象推荐礼物（如“女生都爱香水”）。一切以提供的具体特征为依据。
    3.  **避免笼统**：不得推荐“一次旅行”、“一顿大餐”这类过于宽泛的概念。必须具体化描述。
    4.  **考虑实用性**：即使是情感类礼物，也需考虑收礼人是否有空间存放、是否真的会使用。
    5.  **预算尊重**：严格在用户预算框架内发挥创意。如果用户预算极低（如50元），创意应聚焦于“心意与手工”；如果预算无上限，应注重“稀缺性与独家体验”。
    6.  **必须以严格的JSON格式返回**，不要包含任何markdown格式或额外文本。

    JSON格式示例（请严格遵守）：
    [
      {
        "name": "商品名称（一个有概括性的，可提供用于直接在购物平台搜索的商品标签）",
        "reason": "推荐理由（结合收礼人画像、心理动机、场景核心及为什么合适）",
        "priceRange": "预估价格区间（需在预算范围内）",
        "highlight": "点睛之笔建议（个性化定制想法）"
      }
    ]
  `

  try {
    const completion = await client.chat.completions.create({
      messages: [
        { role: 'system', content: '你是一位不仅懂礼物更懂人心的礼物推荐专家，擅长发现温馨、可爱、独特的小众好物。' },
        { role: 'user', content: prompt }
      ],
      model: 'deepseek-chat',
      temperature: 0.8,
    })

    const content = completion.choices[0].message.content
    console.log('DeepSeek Raw Response:', content) // Debug log

    // Robust JSON extraction
    let jsonString = content || ''
    const jsonMatch = jsonString.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      jsonString = jsonMatch[0]
    } else {
      // Fallback: try to clean markdown if no array found (though prompt asks for array)
      jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim()
    }
    
    if (!jsonString) {
      throw new Error('Empty response from DeepSeek API')
    }

    try {
      return JSON.parse(jsonString)
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      console.error('Failed JSON String:', jsonString)
      throw new Error('Invalid JSON format from DeepSeek')
    }
  } catch (error) {
    console.error('DeepSeek API Error:', error)
    throw new Error('Failed to generate recommendations')
  }
}
