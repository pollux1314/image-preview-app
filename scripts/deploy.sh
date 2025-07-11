#!/bin/bash

# 部署脚本
set -e

# 配置变量
REGISTRY="registry.cn-hangzhou.aliyuncs.com"
IMAGE_NAME="your-namespace/image-preview-app"
CONTAINER_NAME="image-preview-app"
PORT="18080"

echo "开始部署..."

# 检查 Docker 是否运行
if ! docker info > /dev/null 2>&1; then
    echo "错误: Docker 未运行"
    exit 1
fi

# 停止并删除旧容器
echo "停止旧容器..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# 拉取最新镜像
echo "拉取最新镜像..."
docker pull $REGISTRY/$IMAGE_NAME:latest

# 启动新容器
echo "启动新容器..."
docker run -d \
    --name $CONTAINER_NAME \
    --restart unless-stopped \
    -p $PORT:18080 \
    -p 443:443 \
    $REGISTRY/$IMAGE_NAME:latest

# 等待容器启动
echo "等待容器启动..."
sleep 10

# 检查容器状态
if docker ps | grep -q $CONTAINER_NAME; then
    echo "✅ 部署成功!"
    echo "应用运行在: http://localhost:$PORT"
    
    # 清理旧镜像
    echo "清理旧镜像..."
    docker image prune -f
    
    # 显示容器信息
    echo "容器信息:"
    docker ps | grep $CONTAINER_NAME
else
    echo "❌ 部署失败!"
    echo "容器日志:"
    docker logs $CONTAINER_NAME
    exit 1
fi 