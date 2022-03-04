# React构建网易云音乐

## clone项目

```bash
git clone https://github.com/tohsaka888/NeteaseCloudMusicWeb.git
```

## 安装依赖

```bash
yarn install
```

## 运行

```bash
yarn start
```

## 编译

```bash
yarn build
```

## Docker支持

> 如果您本地安装了docker,可以尝试这种方法运行

### 拉取仓库

```bash
docker pull tohsaka888/neteasecloudmusicweb:latest
```

### 运行

```bash
docker run -p 3000:<your port> tohsaka888/neteasecloudmusicweb:latest
```

>  `<your port>为您想监听的端口`

或者

clone本项目,并执行

```bash
yarn docker
```
