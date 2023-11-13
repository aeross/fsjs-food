# API Docs

## Data

The food data is obtained from a third-party API, [Edamam](https://developer.edamam.com/edamam-docs-nutrition-api).
The recipes data is obtained from another third-party API, [TheMealDB](https://www.themealdb.com/api.php).

## Endpoints

The server side will have these following endpoints:

1. `POST "/register"`
2. `POST "/login"`
3. `GET "/user"`
4. `GET "/"`
5. `GET "/recipes/:id"`
6. `POST "/recipes"` <= need authentication
7. `PUT "/recipes/:id"` <= need authentication and authorisation
8. `DELETE "/recipes/:id"` <= need authentication and authorisation
