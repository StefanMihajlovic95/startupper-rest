Express Mysql REST API
==================================

Getting Started
---------------

```sh
# Install dependencies
npm install

# Start development live-reload server
npm run dev

# Start production server:
npm start
```

Local Parameters
---------------
```
# app env mode
NODE_ENV=development
# app debug mode
DEBUG=true
# app password secret
APP_SECRET=itsverysecret
# server port
SERVER_PORT=3000
# jwt secret
JWT_SECRET=itsverysecret
# jwt expire time in seconds
JWT_EXPIRE=3600

# mysql parameters for read and write options
DB_READ_HOST=localhost
DB_WRITE_HOST=localhost
DB_PORT=3306
DB_DATABASE=database
DB_USERNAME=root
DB_PASSWORD=
```
