# 基于官方 Node 18 镜像
FROM node:18-bullseye

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 安装 ffmpeg
RUN apt-get update && apt-get install -y ffmpeg && ffmpeg -version && rm -rf /var/lib/apt/lists/*

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["node", "index.js"] 