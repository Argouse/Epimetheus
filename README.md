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
- docker and docker-compose
- a website with ArgouseSDK implemented

## Getting Started
- `cp example.env .env && vim .env` # edit the docker-cluster config
- `sudo docker-compose build` # build the image
- `sudo docker-compose up -d` # start the docker-cluster
- `sudo docker-compose up -d --force-recreate ` # to restart the containers
- `sudo docker-compose down` # stop the docker-cluster
- `cp app\config\config.default.js app\config\config.js && vim app\config\config.js` # edit the backend config
- `npm run start` or `npm run dev` # start the backend

## Access (default)
- http://localhost:3100 # loki
- http://localhost:3000 # grafana credential: admin/PASSWORD
- http://localhost:3002/metrics/report # nodejs backend
