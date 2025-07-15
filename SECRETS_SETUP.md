# GitHub Secrets 配置指导

## 问题说明
当前出现"Username and password required"错误，这是因为阿里云的secrets没有正确配置在production环境中。

## 解决步骤

### 1. 检查Repository Secrets
首先确保在仓库级别配置了所有必需的secrets：

1. 进入仓库 Settings → Secrets and variables → Actions
2. 检查以下secrets是否存在：
   - `ALIYUN_USERNAME` - 阿里云用户名
   - `ALIYUN_PASSWORD` - 阿里云密码
   - `SERVER_HOST` - 服务器IP地址
   - `SERVER_USERNAME` - 服务器用户名
   - `SERVER_SSH_KEY` - SSH私钥
   - `SERVER_PORT` - SSH端口（通常是22）

### 2. 配置Environment Secrets
由于deploy job使用了`environment: production`，需要将secrets配置到production环境中：

1. 进入仓库 Settings → Environments
2. 点击 "production" 环境
3. 在环境配置页面中，找到 "Environment secrets" 部分
4. 点击 "Add secret"
5. 添加以下secrets：
   - `ALIYUN_USERNAME` - 阿里云用户名
   - `ALIYUN_PASSWORD` - 阿里云密码
   - `SERVER_HOST` - 服务器IP地址
   - `SERVER_USERNAME` - 服务器用户名
   - `SERVER_SSH_KEY` - SSH私钥
   - `SERVER_PORT` - SSH端口

### 3. 验证Secrets配置
确保所有secrets都已正确配置：
- Repository secrets（仓库级别）
- Environment secrets（production环境级别）

### 4. 测试配置
推送代码后，检查GitHub Actions的运行状态，确认不再出现"Username and password required"错误。

## 常见问题

### Q: 为什么需要配置Environment secrets？
A: 当job使用`environment: production`时，GitHub会优先使用Environment secrets，如果找不到会使用Repository secrets。

### Q: 如何确认secrets配置正确？
A: 检查方法：
1. 在GitHub Actions日志中查看secrets是否被正确引用
2. 确认没有出现"Username and password required"错误

### Q: 如果还是出现错误怎么办？
A: 可能的解决方案：
1. 检查secrets名称是否完全匹配（区分大小写）
2. 确认secrets值是否正确
3. 尝试重新配置secrets 