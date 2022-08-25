&nbsp;
<p align="center">
    <picture>
        <img alt="Epimetheus" src="doc/logo/Epimetheus.png" width="300px">
    </picture>
</p>
<h3 align="center">Argouse 前端监控解决方案</h3>
<h3 align="center">Epimetheus 可视化平台</h3>
<p align="center">
    通过 Docker 整合 Node.js 数据服务、时间序列数据库 Loki 与可视化面板 Grafana
</p>


## Warning
This is an experimental project, please do not use it in a production environment.

## Requirements
- [docker-engine](https://docs.docker.com/engine/install/) and [docker-compose](ttps://docs.docker.com/compose/install/) installed
- a website with [ArgouseSDK](https://github.com/Argouse/Argouse) implemented

## Getting Started
```sh
# clone the repository
git clone https://github.com/Argouse/Epimetheus.git
cd Epimetheus
# config reportid, password, etc.
cp example.env .env && vim .env
# build the image
sudo docker-compose build
# start the docker-cluster
sudo docker-compose up
```

Here are the other commands you might need to control the service:
- `sudo docker-compose up -d` # start the docker-cluster with detached mode
- `sudo docker-compose up -d --force-recreate ` # restart containers
- `sudo docker-compose down` # stop the docker-cluster

## Config with ArgouseSDK
Backend service url is `http://localhost:3002/metrics/report` by default, which is the same as the one in the ArgouseSDK.

Then you can login to the dashboard at http://localhost:3000/ , default username is `admin`, password is set in .env file.

### Does it support multiple report IDs?
No, only one reportID is supported at the moment.

You can change the reportid in .env file and grafana dashboard variables if you don't like YajuuSenpai.

## Update
```sh
# pull the repository
cd Epimetheus
git pull
# check if new config is applied
cat example.env 
# rebuild the image and start the docker-cluster
sudo docker-compose up --build
```

## Contributing
Please feel free to fork and submit pull requests!
