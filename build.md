# 部署指南

## 1. 构建项目
在部署之前，需要先构建项目生成静态文件：

```bash
# 安装依赖 (如果尚未安装)
npm install

# 构建生产环境代码
npm run build
```

构建成功后，项目根目录下会生成一个 `dist` 文件夹，里面包含了所有需要部署的静态资源。

## 2. 上传文件到服务器

1. **进入构建目录**
   在文件资源管理器中打开项目的 `dist` 目录。

2. **打开 PowerShell**
   在 `dist` 目录的空白处按住 `Shift` 键并点击右键，选择"在此处打开 PowerShell 窗口"（或者在地址栏输入 `powershell` 并回车）。

3. **执行上传命令**
   在 PowerShell 窗口中输入以下命令：

   ```powershell
   scp -r * root@<你的公网ip>:/home/ubuntu/helan/
   ```

   > **注意**：
   > - 请将 `<你的公网ip>` 替换为你服务器的实际公网 IP 地址。
   > - 确保服务器上的目标目录 `/home/ubuntu/helan/` 已经存在。如果不存在，可以先登录服务器创建该目录：`mkdir -p /home/ubuntu/helan/`。
   > - 或者将 `/home/ubuntu/helan/` 替换为你服务器上的实际目标目录。
   > - 该项目nginx配置如下:
   
   ```nginx
    server {
        listen 80;
        server_name 1.94.122.243;

        # Vue3 项目的 dist 目录
        root /home/ubuntu/helan;
        index index.html;

        # 处理 Vue3 history 模式路由
        location / {
            try_files $uri $uri/ /index.html;
        }

        # 静态资源缓存（可选）
        location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg|mp4)$ {
            try_files $uri =404;
            expires 30d;
            add_header Cache-Control "public";
        }
    }
   ```
