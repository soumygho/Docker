# Docker
Docker playground
Run commnad to build the docker image using 
docker build -t contactlist:1.0 ./docker
docker-compose -f ./docker/mongo.yaml -d
docker run -name contactlistapp contactlist:1.0
docker start contactlistapp
