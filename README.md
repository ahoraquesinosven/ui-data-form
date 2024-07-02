# ui-registro-femicidios

Internal website for the femicide registry system we use at the Observatorio de las Violencias de Género “Ahora Que Sí Nos Ven”

This is a [ReactJS](https://react.dev/) project built using [Vite](https://vitejs.dev/).

## Development

### Prerequisites

We use a dockerized development environment, so you will need [docker](https://www.docker.com/) on your machine. No other dependencies are required in your machine.

### Quick start

* Make sure you have a server running from https://github.com/ahoraquesinosven/api-registro-femicidios
    * Follow the steps describe in that API README to create the env.defaults
    * Update the .env with:`AUTH_PROVIDER_REDIRECT_URI=http://localhost:5173/oauth/cb` to make sure it is calling this UI
    * Run `docker compose up` to run the server


* Run `docker compose up`. This will take a bit the first time since the docker images need to be built or downloaded. Once done, the website can be accessed at http://localhost:5173.
*
* ## License
*
* See the [LICENSE](./LICENSE) file for license rights and limitations (MIT).
*
