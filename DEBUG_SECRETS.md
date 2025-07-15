# Secrets 调试指南

## 问题分析
当前出现"Username and password required"错误，说明build job无法访问阿里云secrets。

## 可能的原因

### 1. Repository Secrets 不存在
build job现在不使用environment，所以需要Repository级别的secrets。

### 2. Secrets 名称不匹配
GitHub secrets区分大小写，必须完全匹配。

### 3. Secrets 值不正确
阿里云的用户名或密码可能不正确。

## 解决步骤

### 步骤1：检查Repository Secrets
1. 访问：`https://github.com/pollux1314/image-preview-app/settings/secrets/actions`
2. 查看是否有以下secrets：
   - `ALIYUN_USERNAME`
   - `ALIYUN_PASSWORD`

### 步骤2：添加Repository Secrets（如果不存在）
1. 点击 "New repository secret"
2. 添加以下secrets：

**ALIYUN_USERNAME**
- Name: `ALIYUN_USERNAME`
- Value: 你的阿里云用户名

**ALIYUN_PASSWORD**
- Name: `ALIYUN_PASSWORD`
- Value: 你的阿里云密码

### 步骤3：验证阿里云凭据
确保阿里云的用户名和密码是正确的：
1. 登录阿里云控制台
2. 进入容器镜像服务
3. 确认用户名和密码

### 步骤4：测试配置
推送代码后，检查GitHub Actions的运行状态。

## 临时解决方案

如果不想修改secrets，可以临时将阿里云secrets从Environment复制到Repository：

1. 进入Environment设置：
   - `https://github.com/pollux1314/image-preview-app/settings/environments`

2. 点击production环境

3. 查看Environment secrets中的阿里云secrets值

4. 复制这些值到Repository secrets

## 检查清单
- [ ] Repository secrets中有ALIYUN_USERNAME
- [ ] Repository secrets中有ALIYUN_PASSWORD
- [ ] Secrets名称完全匹配（区分大小写）
- [ ] Secrets值正确
- [ ] 阿里云凭据有效 