# Node.js API with postgreSQL and dependency injection

App use `pg` npm dependency for low-level communication with PostgreSQL. 
The code has been written object oriented with the Inversion of Control purpose by `Awilix`.

# Run with docker
```
docker-compose up -d
```

# Run dev mode
```
npm i
npm run dev
```

# Run production mode
```
npm i
npm run build
npm start
```
***It is better to use docker because of the preparation of individual dependencies for production***<br/>
[***If you don't believe me check out dockerfile***](/Dockerfile)
