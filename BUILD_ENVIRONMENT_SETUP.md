# Build 环境设置指导

## 目标
配置build环境，让build阶段自动运行，无需review，只有deploy阶段需要review。

## 当前配置
- **Build job**: 使用 `environment: build`（无保护规则）
- **Deploy job**: 使用 `environment: production`（有Required reviewers）

## 需要做的事情

### 1. 创建Build环境
1. **进入仓库设置**：
   - 访问：`https://github.com/pollux1314/image-preview-app/settings/environments`

2. **创建build环境**：
   - 点击 "New environment"
   - 环境名称输入：`build`
   - 点击 "Configure environment"

3. **配置build环境**：
   - 不勾选任何保护规则
   - 直接点击 "Save protection rules"

### 2. 配置Build环境Secrets
build环境需要访问阿里云secrets：

1. **在build环境配置页面**：
   - 找到 "Environment secrets" 部分
   - 点击 "Add secret"

2. **添加以下secrets**：
   - `ALIYUN_USERNAME` - 阿里云用户名
   - `ALIYUN_PASSWORD` - 阿里云密码

### 3. 验证Production环境
确保production环境配置正确：

1. **点击production环境**
2. **确认保护规则**：
   - ✅ Required reviewers: `pollux1314`
   - ✅ Wait timer: `0` 分钟
   - ✅ Deployment branches: `Protected branches only`

## 预期结果
配置完成后：
- ✅ Build job自动运行，无需review
- ✅ Deploy job等待手动确认
- ✅ 不会出现"Username and password required"错误

## 检查清单
- [ ] 创建了build环境
- [ ] build环境没有保护规则
- [ ] build环境配置了阿里云secrets
- [ ] production环境有Required reviewers
- [ ] Build job自动运行
- [ ] Deploy job显示"Review deployments"按钮 