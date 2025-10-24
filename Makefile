.PHONY: build-frontend up down clean

build-frontend:
	podman build -f ./wordpress-blog/Dockerfile.dev -t wordpress-blog-frontend:dev ./wordpress-blog

up: build-frontend
	podman compose up

down:
	podman compose down

clean:
	podman compose down --rmi all --volumes
	podman rmi wordpress-blog-frontend:dev
