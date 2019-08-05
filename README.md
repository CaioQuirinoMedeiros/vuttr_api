# VUTTR API

## Register [/register]

### Store a user [POST]

Para criar um usuário basta enviar um JSON com os campos `name`, `email` e `password`. O email tem que ser um email válido e a senha deve ter no mínimo 6 caracteres. A resposta contém as informações do usuário e um token.

- Response 200 (text/plain)

        Hello World!

* Request (application/json)

  - Body

          {
          "name": "your_name",
          "email": "your_email@email.com",
          "password": "123456"
          }

* Response 201 (application/json)

  - Body

          {
          "user": {
          "\_id": "generated_id",
          "name": "your_name",
          "email": "your_email@email.com",
          },
          "token": "generated_jwt_token"
          }

## Login [/login]

### Get token [POST]

Para fazer login basta envar um json com `email` e `password`. A resposta contem as informações o usuário e um token.

- Request (application/json)

  - Body

          {
          "email": "your_email@email.com",
          "password": "123456"
          }

- Response 200 (application/json)

  - Body

          {
          "user": {
          "\_id": "generated_id",
          "name": "Caio Quirino",
          "email": "caio.quirino.medeiros@gmail.com
          },
          "token": "generated_jwt_token"
          }

## Logout [/logout]

### Destroy token [POST]

Aqui é necessário enviar um token de autenticação. Uma resposta com status 200 significa que o token foi deletado.

- Request (application/json)

  - Headers

          Authorization: Bearer token

- Response 200 (application/json)

## Logout All [/logoutAll]

Da mesma forma que o logout, mas aqui todos os tokens do usuário serão deletados.

### Destroy token [POST]

- Request (application/json)

  - Headers

          Authorization: Bearer token

- Response 200 (application/json)

## Tools [/tools]

Todas as rotas de `tools` precisam de um token de autenticação. As operações só terão sucesso se a `tool` for do usuário identificado pelo token

### Create Tool [POST]

Apenas o `title` é obrigatório.

- Request

  - Body

          {
          "title": "tool_title",
          "link": "tool_link",
          "description": "tool_description",
          "tags": [ "tag_1", "tag_2", "tag_3" ],
          }

* Response 200 (application/json)

  - Body

          [
          {
          "title": "tool_title",
          "link": "tool_link",
          "description": "tool_description",
          "tags": [ "tag_1", "tag_2", "tag_3" ],
          "user": "user_id"
          }
          ]

### Update Tool [PUT][/tools/{tool_id}]

- Request

  - Body

          {
          "title": "tool_title_edited",
          "tags": [ "tag_1", "tag_3" ],
          }

* Response 200 (application/json)

  - Body

          [
          {
          "title": "tool_title_edited",
          "link": "tool_link",
          "description": "tool_description",
          "tags": [ "tag_1", "tag_3" ],
          "user": "user_id"
          }
          ]

### Get Tools [GET][/tools?title&tag]

Retorna todas as `tools`, podendo filtrar por `title` ou `tags`. Caso os dois parametros sejam enviados, o filtro será feito pela tag.

- Response 200 (application/json)

  - Body

          [
          {
          "title": "tool_title",
          "link": "tool_link",
          "description": "tool_description",
          "tags": [ "tag_1", "tag_2", "tag_3" ],
          "user": "user_id"
          },
          {
          "title": "tool_title",
          "link": "tool_link",
          "description": "tool_description",
          "tags": [ "tag_1", "tag_2", "tag_3" ],
          "user": "user_id"
          }
          ]

### Get Tool [GET][/tools/{tool_id}]

- Response 200 (application/json)

  - Body

          {
          "title": "tool_title",
          "link": "tool_link",
          "description": "tool_description",
          "tags": [ "tag_1", "tag_2", "tag_3" ],
          "user": "user_id"
          }

### Delete Tool [DELETE][/tools/{tool_id}]

- Response 200 (application/json)
