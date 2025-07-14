# 部署设置指南

## 解决阿里云登录失败问题

### 问题原因
当工作流使用 `environment: production` 时，GitHub Actions 会优先查找 `production` 环境中的 secrets，而不是仓库级别的 secrets。

### 解决方案

#### 方案1：配置Production环境（推荐）

1. **创建Production环境**：
   - 进入GitHub仓库 → Settings → Environments
   - 点击 "New environment"
   - 环境名称：`production`
   - 点击 "Configure environment"

2. **配置保护规则**：
   - **Required reviewers**：添加您的GitHub用户名
   - **Wait timer**：设置为 0 分钟
   - **Deployment branches**：选择 `Restrict to branches` 并添加 `main` 和 `master`

3. **迁移Secrets到Production环境**：
   在 `production` 环境中添加以下 secrets：
   ```
   ALIYUN_USERNAME=您的阿里云用户名
   ALIYUN_PASSWORD=您的阿里云密码
   SERVER_HOST=服务器IP
   SERVER_USERNAME=服务器用户名
   SERVER_SSH_KEY=SSH私钥
   SERVER_PORT=SSH端口
   SLACK_WEBHOOK_URL=Slack webhook（可选）
   ```

#### 方案2：移除环境配置（简单）

如果您不想配置环境，可以修改工作流文件，移除 `environment: production` 行。

## 手动确认部署流程

### 当前配置的工作流程

1. **推送代码**：推送到 `main` 或 `master` 分支
2. **自动构建**：`build` job 自动执行，构建并推送Docker镜像
3. **手动确认**：在GitHub Actions页面手动触发部署
4. **执行部署**：确认后执行 `deploy` job

### 如何手动触发部署

1. 进入GitHub仓库的 `Actions` 标签页
2. 点击左侧的 "Deploy to Production" 工作流
3. 点击右上角的 "Run workflow" 按钮
4. 选择分支（通常是 `main`）
5. 勾选 "确认部署到生产环境"
6. 点击 "Run workflow"

### 查看部署状态

- 在 `Actions` 页面查看工作流执行状态
- 在 `Environments` 页面查看部署历史
- 部署成功后，应用在 `http://your-server-ip:18080` 可用

## 故障排除

### 阿里云登录失败
1. 确认阿里云用户名和密码正确
2. 检查阿里云容器镜像服务是否启用
3. 确认网络连接正常

### 部署失败
1. 检查服务器SSH连接
2. 确认服务器防火墙开放18080端口
3. 验证Docker服务正常运行

### Secrets配置问题
1. 确认所有必需的secrets已配置
2. 检查secrets是否在正确的环境级别
3. 验证secrets值是否正确

## 注意事项

- 构建阶段会自动执行，无需确认
- 只有部署阶段需要手动确认
- 确保阿里云容器镜像服务凭据有效
- 定期检查服务器资源使用情况 