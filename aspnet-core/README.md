# Centy

.net 6 web api project

## Prerequisites

1. Obtain your own [ExchangeRate](https://exchangerate.host) API key on the site
2. Replace EXCHANGE_API_KEY value in launchSettings.json with the key
3. Install [MongoDb](https://www.mongodb.com) and update the connection string if needed in launchSettings.json

## Deploy

```sh
heroku login
heroku container:login
docker login --username=heroku-email --password=heroku-token registry.heroku.com
docker build --file centy/Dockerfile -t registry.heroku.com/centy-api/web .
docker push registry.heroku.com/centy-api/web
heroku container:release web --app centy-api
```

## URL

Once deployed API avaliable at https://centy-api.herokuapp.com/
