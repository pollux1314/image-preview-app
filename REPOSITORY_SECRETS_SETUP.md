# 仓库级别 Secrets 配置指导

## 问题说明
为了确保build阶段不需要review，我们需要将阿里云secrets配置到仓库级别，而不是环境级别。

## 解决步骤

### 1. 配置仓库级别 Secrets
由于build job不再使用environment，需要将阿里云secrets配置到仓库级别：

1. **进入仓库设置**：
   - 访问：`https://github.com/pollux1314/image-preview-app/settings/secrets/actions`

2. **添加以下Repository secrets**：
   - `ALIYUN_USERNAME` - 阿里云用户名
   - `ALIYUN_PASSWORD` - 阿里云密码

3. **点击 "New repository secret"**
4. **输入secrets名称和值**

### 2. 验证配置
确保以下secrets已配置：

**Repository secrets（仓库级别）**：
- ✅ `ALIYUN_USERNAME` - 阿里云用户名
- ✅ `ALIYUN_PASSWORD` - 阿里云密码

**Environment secrets（production环境）**：
- ✅ `SERVER_HOST` - 服务器IP地址
- ✅ `SERVER_USERNAME` - 服务器用户名
- ✅ `SERVER_SSH_KEY` - SSH私钥
- ✅ `SERVER_PORT` - SSH端口
- ✅ `SLACK_WEBHOOK_URL` - Slack webhook URL

### 3. 工作流程说明
配置完成后的工作流程：

1. **Build阶段**：
   - 自动运行，无需review
   - 使用Repository secrets访问阿里云
   - 构建并推送Docker镜像

2. **Deploy阶段**：
   - 需要手动review确认
   - 使用Environment secrets访问服务器
   - 部署到生产环境

## 预期结果
- Build job自动运行，无需等待review
- Deploy job等待手动确认后执行
- 所有secrets都能正确访问

## 检查清单
- [ ] Repository secrets中配置了ALIYUN_USERNAME和ALIYUN_PASSWORD
- [ ] Environment secrets中配置了所有服务器相关secrets
- [ ] Build job不再显示"waiting for review"
- [ ] Deploy job显示"Review deployments"按钮 