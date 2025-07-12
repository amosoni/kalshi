# 基于官方 Node 18 镜像
FROM node:18

# 安装 ffmpeg（包含 ffprobe）
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /app

# 复制依赖文件并安装依赖
COPY package*.json ./
RUN npm install

# 复制项目全部代码（包括 prisma/schema.prisma）
COPY . .

# 设置构建参数和环境变量
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# 构建生产环境
RUN npm run build

# 暴露端口（如有需要可修改）
EXPOSE 3001

# 启动命令（如有自定义请修改）
CMD ["npm", "start"] 