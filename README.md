# Servicio web



# Contenidos

- [Instalación y despliegue](#instalación-y-despliegue)
- [Añadir secreto para la sesión](#añadir-secreto-para-la-sesión)
- [Configurar la conexión con el servidor de Keycloak](#configurar-la-conexión-con-el-servidor-de-Keycloak)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Configuración de llamadas HTTP](#configuración-de-llamadas-HTTP)
  - [Backend](#backend)
  - [Frontend](#frontend)

---

## Instalación y despliegue

En un terminal en el directorio `/backend`

```sh
npm install
```

```sh
npm start
```

En un terminal en el directorio `/frontend`

```sh
npm install
```

```sh
npm start
```

## Añadir secreto para la sesión

En `/backend/app.js` añadir un secreto privado para iniciar la sesión de comunicación.

```js
app.use(session({
  secret: 'SECRET FOR THE SESSION',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));
```

## Configurar la conexión con el servidor de Keycloak

Debemos configurar la conexión con Keycloak tanto en el frontend como en el backend.

### Backend
---

#### keycloak.json

En la parte del backend debemos configurar el archivo `keycloak.json` con el JSON de instalación que facilita Keycloak en la configuración del cliente confidencial que queremos asociar.

### Frontend
---

#### app.js

Cambiar la variable KC_URL con la dirección del servidor de Keycloak sin la barra final (http://localhost:8000)

```js
var KC_URL = process.env.KC_URL || "Dirección del servidor de Keycloak"; 
var SERVICE_URL = process.env.SERVICE_URL || "http://localhost:3000";
```

#### keycloak.json

Añadir el JSON de instalación de Keycloak del cliente asociado al frontend.

## Configuración de llamadas HTTP

### Backend
---

#### app.js

En este archivo se comprueba la autorización de acceso a los servicios protegidos. Esto se hace con dos métodos distintos de Keycloak.

El método `keycloak.protect()` permite hacer autorización de acceso basada en roles añadiendo el realm y el rol que queremos comprobar. De esta forma, si escribimos por ejemplo “keycloak.protect(‘realm:admin’)” el usuario además de tener que estar autenticado para acceder, tiene que tener también asociado el rol de admin en nuestro realm de Keycloak.

De la misma forma usando los parámetros del método `keycloak.enforcer()`, si escribimos `keycloak.enforcer(‘resource1:scope’)` se comprobarán los permisos de acceso del usuario autenticado al recurso y scope indicados.


### Frontend
---

#### index.html

Se trata de la página que se presenta al usuario con los botones que realizan las funcionalidades del servicio.

#### Función sendRequestRPT

```js
function sendRequestRPT() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            var RPTtokenparsed = JSON.parse(req.responseText);
            var RPTaccess_token = RPTtokenparsed.access_token;

            RPTtoken = parseJWT(RPTaccess_token);

            output(RPTtoken); 
        }
    }
    req.open('POST', 'KC_URL' + '/realms/myrealm/protocol/openid-connect/token', true);
    req.setRequestHeader('Authorization', 'Bearer ' + kc.token);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.send('grant_type=urn:ietf:params:oauth:grant-type:uma-ticket&audience=mybackend');
}
```

Cambiar `mybackend` por el nombre del cliente configurado en Keycloak que actúa como servidor de recursos.

#### Función sendRequestRPTresource

```js
function sendRequestRPTresource(resource) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            var RPTtokenparsed = JSON.parse(req.responseText);
            var RPTaccess_token = RPTtokenparsed.access_token;

            RPTtoken = parseJWT(RPTaccess_token);

            output(RPTtoken); 
        }else{
            output(req.status + '\n\n' + req.responseText);
        }
    }
    req.open('POST', 'KC_URL' + '/realms/myrealm/protocol/openid-connect/token', true);
    req.setRequestHeader('Authorization', 'Bearer ' + kc.token);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.send('grant_type=urn:ietf:params:oauth:grant-type:uma-ticket&audience=mybackend&permission=' + resource);
}
```

Cambiar `mybackend` por el nombre del cliente configurado en Keycloak que actúa como servidor de recursos.

#### Configuración de los botones

En los botones de la función `sendRequestRPTresource` incluir en la llamada el nombre del recurso sobre el que se quiere comprobar los permisos de acceso del usuario autenticado mostrando su Requesting Party Token (RPT).

```ts
<button onclick="sendRequestRPTresource('RECURSO A COMPROBAR')">Show RPT Token for localizacion1</button>
<button onclick="sendRequestRPTresource('RECURSO A COMPROBAR')">Show RPT Token for localizacion2</button>
<button onclick="sendRequestRPTresource('RECURSO A COMPROBAR')">Show RPT Token for pruebarecurso</button>

```









