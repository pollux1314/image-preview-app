# 图片预览与下载应用

一个基于 React + TypeScript 的图片预览和下载应用，支持跨域图片处理。

## 功能特性

- 🖼️ 图片预览功能
- 📥 智能下载（支持跨域图片）
- 🎨 现代化 UI 设计
- 📱 响应式布局
- 🔧 多种下载策略

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## Docker 部署

### 构建镜像
```bash
docker build -t image-preview-app .
```

### 运行容器
```bash
docker run -d -p 18080:18080 --name image-preview-app image-preview-app
```

### 使用 docker-compose
```bash
docker-compose up -d
```

## CI/CD 部署流程

### 1. 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

- `ALIYUN_USERNAME`: 阿里云容器镜像服务用户名
- `ALIYUN_PASSWORD`: 阿里云容器镜像服务密码
- `SERVER_HOST`: 部署服务器 IP 地址
- `SERVER_USERNAME`: 服务器用户名
- `SERVER_SSH_KEY`: 服务器 SSH 私钥
- `SERVER_PORT`: 服务器 SSH 端口（默认 22）
- `SLACK_WEBHOOK_URL`: Slack 通知 Webhook（可选）

### 2. 配置阿里云镜像仓库

1. 登录阿里云容器镜像服务
2. 创建命名空间和镜像仓库
3. 更新 `.github/workflows/deploy.yml` 中的镜像名称

### 3. 服务器准备

确保服务器已安装：
- Docker
- Docker Compose（可选）

### 4. 自动部署

推送代码到 `main` 或 `master` 分支将自动触发部署：

1. 构建 Docker 镜像
2. 推送到阿里云镜像仓库
3. 在服务器上拉取最新镜像
4. 重启应用容器

## 部署脚本

使用提供的部署脚本：

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NODE_ENV` | 运行环境 | `production` |
| `PORT` | 应用端口 | `18080` |

## 技术栈

- React 18
- TypeScript
- Vite
- Docker
- Nginx
- GitHub Actions
- 阿里云容器镜像服务

## 许可证

MIT
