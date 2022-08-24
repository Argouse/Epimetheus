# Epimetheus
afterthinker

dev branch

## TODO
- next.js with react frontend
- jwt for grafana authentication (multiple users)

## Commands
- `cp example.env .env && vim .env` # edit the docker-cluster config
- `sudo docker-compose build` # build the image
- `sudo docker-compose up -d` # start the docker-cluster
- `sudo docker-compose up -d` --force-recreate # to restart the containers
- `sudo docker-compose down` # stop the docker-cluster
- `cp app\config\config.default.js app\config\config.js && vim app\config\config.js` # edit the backend config
- `npm run start` or `npm run dev` # start the backend

## Endpoints(default)
- http://localhost:3100 # loki
- http://localhost:3000 # grafana credential: admin/PASSWORD
- http://localhost:3030/metrics/report # nodejs backend
