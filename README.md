# todolist

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


### Запуск через Docker
1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/ваш-логин/ваш-репозиторий.git
   cd ваш-репозиторий
   ```
   ```bash
    cp .env.example .env
   ```

   ```bash
    docker-compose up --build
   ```

___

Вот hhtp запросы, чтобы затестить приложение:
###
POST http://localhost:9298/api/register

Content-Type: application/json

{
"username": "testuser",
"email": "test@example.com",
"password": "12345678"
}


###
POST http://localhost:9298/api/login

Content-Type: application/json

{
"email": "test@example.com",
"password": "12345678"
}


###
POST http://localhost:9298/api/logout

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNjgwNDg1LCJleHAiOjE3NDE2ODIyODV9.MptWaxWkBfAfn6JbnOXxUAowZYZ91XCu6aHg_QhK6UY

Content-Type: application/json

{
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNjgwNDg1LCJleHAiOjE3NDI5NzY0ODV9.k9nDJ4faszxBmFLpWbw79ghMj3vIMMPrRGRIQIIvKW8"
}



###
GET http://localhost:9298/api/refresh

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNjgwODEyLCJleHAiOjE3NDE2ODI2MTJ9.SCa1xCWsUIJwEE-6qhUeUFUYC2AdGVATn_FzrcX1U9U

Content-Type: application/json

{
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNjgwODEyLCJleHAiOjE3NDI5NzY4MTJ9.ZPs0Q-sdpxcdYA6us_-rO8t0jNSwEv4y00zOLMw2Zck"
}



###
POST http://localhost:9298/api/todos

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNjgwOTg0LCJleHAiOjE3NDE2ODI3ODR9.9B3KTEy7M1ezje6BQemL83DhpAwIq8Q3oAwr_v-WDwA

Content-Type: application/json

{
"title": "first todo",
"description": "Its test lolololo"
}



###
GET http://localhost:9298/api/all

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNjgwOTg0LCJleHAiOjE3NDE2ODI3ODR9.9B3KTEy7M1ezje6BQemL83DhpAwIq8Q3oAwr_v-WDwA

Content-Type: application/json





###
GET http://localhost:9298/api/1

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNjgwOTg0LCJleHAiOjE3NDE2ODI3ODR9.9B3KTEy7M1ezje6BQemL83DhpAwIq8Q3oAwr_v-WDwA

Content-Type: application/json





###
PUT http://localhost:9298/api/4

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNjgwOTg0LCJleHAiOjE3NDE2ODI3ODR9.9B3KTEy7M1ezje6BQemL83DhpAwIq8Q3oAwr_v-WDwA

Content-Type: application/json

{
"title": "first todo. Updated",
"description": "Its test lolololo. Updated"
}



###
DELETE http://localhost:9298/api/4

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNjgwOTg0LCJleHAiOjE3NDE2ODI3ODR9.9B3KTEy7M1ezje6BQemL83DhpAwIq8Q3oAwr_v-WDwA


Content-Type: application/json


// For private routes
###
POST http://localhost:9298/api/me/todos

Authorization: Bearer <token>

Body: { "title": "Название", "description": "..." }

###
GET http://localhost:9298/api/me/todos/my

Authorization: Bearer <token>

###
GET http://localhost:9298/api/me/todos/:id

Authorization: Bearer <token>

###
PUT http://localhost:9298/api/me/todos/:id

Authorization: Bearer <token>

Body: { "title": "Новое название", "description": "..." }

###
DELETE http://localhost:9298/api/me/todos/:id

Authorization: Bearer <token>