# Centy

.net 6 web api project

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
