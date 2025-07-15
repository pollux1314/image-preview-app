# GitHub 环境设置指导

## 问题说明
当前工作流没有显示"Review deployments"按钮，这是因为GitHub环境没有正确配置保护规则。

## 解决步骤

### 1. 手动创建GitHub环境

**重要：** GitHub环境配置文件不会自动创建环境，必须手动在GitHub界面中创建。

#### 步骤：
1. 打开你的GitHub仓库：`https://github.com/pollux1314/image-preview-app`
2. 点击 "Settings" 标签页
3. 在左侧菜单中找到 "Environments"
4. 点击 "New environment"
5. 环境名称输入：`production`
6. 点击 "Configure environment"

### 2. 设置保护规则

在环境配置页面中：

#### Required reviewers（必需审核者）
- ✅ 勾选 "Required reviewers"
- 添加你的GitHub用户名：`pollux1314`

#### Wait timer（等待时间）
- ✅ 勾选 "Wait timer"
- 设置为：`0` 分钟

#### Deployment branches（部署分支）
- ✅ 勾选 "Deployment branches"
- 选择：`Protected branches only`

### 3. 保存配置
- 点击 "Save protection rules"

### 4. 测试环境保护

创建环境后：
1. 进入 "Actions" 标签页
2. 找到 "Test Environment Protection" 工作流
3. 点击 "Run workflow"
4. 应该会看到 "Review deployments" 按钮

### 5. 验证主工作流

测试成功后，推送代码到main分支，查看主工作流是否也显示 "Review deployments" 按钮。

## 常见问题

### Q: 为什么没有显示"Review deployments"按钮？
A: 通常是因为：
1. 没有手动创建GitHub环境
2. 环境名称不匹配（必须是`production`）
3. 保护规则没有正确设置
4. 用户权限不足

### Q: 环境配置文件有什么用？
A: 环境配置文件主要用于：
1. 记录环境配置
2. 团队协作时共享配置
3. 但不自动创建环境

### Q: 如何确认环境已正确创建？
A: 检查方法：
1. 进入仓库 Settings → Environments
2. 应该能看到 "production" 环境
3. 点击环境名称，应该能看到保护规则设置 