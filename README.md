# Orbit Net

Codename for MVP Order Generation / Filling / Dashboard DApp

## Requirements

* Docker CE installed for [ubuntu](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) or [windows](https://docs.docker.com/docker-for-windows/install/)
* [Docker compose](https://docs.docker.com/compose/install/)

## MetaMask

### Installation
You should install [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) chrome extension to approve all blockchain transactions.

### Account import

1. Open MetaMask extension.
2. If this is the first run, agree with terms.
3. Click by update cycle icon at the right left corner.
4. Select `Import account`
5. Paste your private key.

## Local project setup

### Server part

1. Install dependencies

```
$ yarn install
```

2. Create `.env` file with the following variables:

```
SERVER_PORT=8080
MONGO_HOST=mongo
FRONT_HOST=http://localhost:3000
```

### Front part

1. Switch working directory to `react-ui`.
2. Install dependencies

```
$ yarn install
```

3. Start ngrok tunnel to your localhost in a separate terminal window (optional)

```
$ yarn ngrok:start
```

4. Create `.env.local` file with the following variables:

```
REACT_APP_HTTPS=false
REACT_APP_SERVER_HOST=localhost
REACT_APP_SERVER_PORT=8080
```

5. In case you ran ngrok: copy the ngrok forwarding route (it should look something like `https://00434830.ngrok.io`) without `http://` or `https://` at the beginning to `.env.local` file as `REACT_APP_NGROK_HOSTNAME=<your_ngrok_hostname>`.

6. Run local test chain in a separate terminal window:

```
$ yarn chain
```

7. Copy the first private key from the list and import it into MetaMask (see above).
8. Migrate contracts on to the local chain:

```
$ yarn contracts:migrate
```

> If you run `yarn contracts:migrate` after `yarn start`, make sure to re-run `yarn start` again in order
> to pick up the latest `networkId`

9. Pre-populate the app with some test loans data (optional):

```
$ yarn migrations:loans
```

10. Switch MetaMask network to `Localhost 8545`

### Running project

1. Run docker from the root directory:

```
$ docker-compose up -d
```

If this is the first time you run docker, it may take some time to download required containers.

2. Run server:

```
$ docker exec -ti orbit-net-server yarn start-dev
```

3. In separate terminal window run front (from `react-ui` folder):

```
$ yarn start
```

4. To completely stop docker from root directory run:

```
$ docker-compose down
```

### Run server without docker

1. Follow instructions described in *Server part* above.
2. Set `MONGO_HOST=localhost` in `.env` file.
3. Ensure you have [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) installed and running on your
local machine.

Command to run mongo daemon in a background:

```
$ mongod --fork --logpath /var/log/mongod.log
```

4. Run development server with:

```
$ yarn start-dev
```

## Kovan test network

Whether you have local instance run or deployed it somewhere you can switch to Kovan test network instead of local test chain.
To do this just open MetaMask extension and select `Kovan test network` from the list of available networks.

## Production updates

In case you need to apply some changes on production.

1. Switch to the project root directory:

```
$ cd ~/OrbitNet
```

2. Pull changes from git:

```
$ git pull
```

3. Rebuild docker containers:

```
$ ./start-prod.sh
```

## Testing

Run `yarn test:watch` in order to watch test files changes.
