## Images dashboard

### Para iniciar el proyecto en local

1. Instalar dependencias con `npm i`
2. Iniciar el servidor de desarrollo con `npm start`

> El archivo `environments.ts` contiene el campo `GRAPHQL_BASE_URL` el cual contiene la URI donde está ejecutándose la API graphql.

### Librerías que se han utilizado

 - `@tanstack/react-query` para manejo de peticiones a API.
 - `i18n-react` para el manejo de literales y traducciones.
 - `@fortawesome/*` para el uso de iconos.
 - `@graphql-codegen/cli` para obtener los tipos que proporciona la API graphql de manera automática.

### Funcionalidades
#### `Scroll infinito`
  > Cuando se carga por primera vez la aplicación web, se muestran un máximo de 9 imagenes. Después, si hacemos scroll hasta abajo del todo, automáticamente se caargarán otras 9 imágenes.

![Alt text](/readme-images/main.png "Main")

  #### `Dar o quitar un like a una imagen`
  > A cada imagen que se muestra se le puede dar like pulsando el icono del corazón, en la parte inferior derecha. Para quitar el like, basta con volver a pulsar el icono.
  
![Alt text](/readme-images/like.png "Like")

  #### `Buscar por título`
  > En la parte superior derecha de la aplicación web se encuentra un buscador. En ese elemento podremos introducir el título de una imagen para que se haga una búsqueda, y se muestre en la lista.

![Alt text](/readme-images/search.png "Search")