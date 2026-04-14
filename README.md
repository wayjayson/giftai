# GiftAI - 个性化礼物推荐助手

GiftAI 是一个基于人工智能的个性化礼物推荐系统。通过收集用户的性别、年龄、兴趣爱好、预算等信息，结合 DeepSeek AI 分析，为用户生成贴心的礼物推荐，并直接链接到电商平台购买。

## 功能特性

- **智能表单收集**：直观的表单界面，收集收礼人的详细信息
- **AI 分析推荐**：利用 DeepSeek AI 分析用户输入，生成个性化礼物建议
- **多平台比价**：提供淘宝、京东、拼多多等平台的购买链接
- **响应式设计**：适配桌面和移动设备，提供良好的用户体验
- **实时验证**：表单字段实时验证，友好的错误提示

## 技术栈

- **前端**：React 18 + TypeScript + Vite + Tailwind CSS
- **后端**：Node.js + Express + TypeScript
- **AI 集成**：DeepSeek API
- **数据库**：Supabase (PostgreSQL)
- **状态管理**：Zustand
- **路由**：React Router DOM

## 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn

### 安装步骤

1. 克隆项目
   ```bash
   git clone <repository-url>
   cd gift01
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 配置环境变量
   ```bash
   cp .env.example .env
   ```
   编辑 `.env` 文件，填写必要的 API 密钥：
   - `DEEPSEEK_API_KEY`: DeepSeek API 密钥
   - `SUPABASE_URL`: Supabase 项目 URL
   - `SUPABASE_ANON_KEY`: Supabase 匿名密钥

4. 启动开发服务器
   ```bash
   npm run dev
   ```
   前端运行在 `http://localhost:5173`
   后端 API 运行在 `http://localhost:3000`

### 生产构建

```bash
npm run build
npm run preview
```

## 项目结构

```
gift01/
├── src/                    # 前端源代码
│   ├── components/        # React 组件
│   ├── pages/            # 页面组件
│   ├── store/            # 状态管理
│   ├── hooks/            # 自定义 Hooks
│   └── lib/              # 工具函数
├── api/                   # 后端 API
│   ├── routes/           # API 路由
│   ├── services/         # 服务层
│   └── app.ts            # Express 应用
├── supabase/             # 数据库迁移脚本
└── public/               # 静态资源
```

## API 接口

### 获取礼物推荐
```
POST /api/recommendations
```
请求体：
```json
{
  "gender": "男生",
  "age": 25,
  "hobbies": ["摄影", "旅行"],
  "occasion": "生日",
  "budgetMin": 100,
  "budgetMax": 500,
  "additionalInfo": "喜欢户外活动"
}
```

### 健康检查
```
GET /api/health
```

## 部署

项目已配置 Vercel 部署，可通过以下步骤部署：

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进项目。