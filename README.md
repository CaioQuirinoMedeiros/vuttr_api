# VUTTR API

# Authentication

## Register [/register]

### Store a user [POST]

To create a user, send a JSON with a name, an valid email and a password with at least 6 characters. The response will contain the user information and a token

- Request (application/json)

        {
            "name": "Caio Quirino",
            "email": "caio.quirino.medeiros@gmail.com,
            "password": "123456"
        }

- Response 201 (application/json)

        {
          "user": {
            "_id": "generated_id",
            "name": "Caio Quirino",
            "email": "caio.quirino.medeiros@gmail.com
          },
          "token": "generated_jwt_token"
        }

## Login [/login]

### Get token [POST]

To create a user, send a JSON with a name, an valid email and a password with at least 6 characters. The response will contain the user information and a token

- Request (application/json)

        {
            "email": "caio.quirino.medeiros@gmail.com,
            "password": "123456"
        }

- Response 200 (application/json)

        {
          "user": {
            "_id": "generated_id",
            "name": "Caio Quirino",
            "email": "caio.quirino.medeiros@gmail.com
          },
          "token": "generated_jwt_token"
        }

## Logout [/logout]

### Destroy token [POST]

To create a user, send a JSON with a name, an valid email and a password with at least 6 characters. The response will contain the user information and a token

- Request (application/json)

  - Headers
    Authorization: Bearer token

- Response 200 (application/json)
