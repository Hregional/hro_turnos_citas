# hro_turnos_citas

Es un sistema basado en microservicios que tiene como finalidad llevar el control de turnos 
y citas de pacientes del Hospital Regional de Occidente.
Hace uso de los siguientes servicios

- hro-tms-api-gateway: microservicio orquestador desarrollado en expressjs.
- hro-tms-core: microservicio encargado de almacenar y gestionar los turnos y citas, desarrollado en expressjs.
- hro-tms-frontend: microservicio desarrollado en reactjs que es para uso administrativo del personal de salud.
- hro_tms_auth_service: microservicio desarrollado en django el cual tiene como funcion validar las peticiones que pasan
  por el orquestador y ofrece un panel administrativo para la gestion de usuarios y areas.
  
## Instalacion local

REQUISITOS:
- Sistema operativo Windows/Linux/macOS
- Docker
- Permisos de administrador/sudo/root

Descargar el repositorio y navegar al directorio descargado

Modificar el archivo docker-compose.yaml

Modificar el valor de PATIENTS_SERVICE_URL para que el sistema pueda comunicarse al servicio de pacientes
el cual se usa para la busqueda de los mismos y generacion de sus turnos y citas.
```yaml
- PATIENTS_SERVICE_URL=<endpoint>/api/
```
Modificar el valor de REACT_APP_APIGW_SERVICE_URL asignando la IP del host donde se ejecutan los servicios con Docker
```yaml
- REACT_APP_APIGW_SERVICE_URL=http://<IP del host>:3002/ # REEMPLAZAR ESTA IP POR LA IP DEL HOST REAL
```

Ejecutar los siguientes comandos

Construye las imagenes de docker

```bash
docker compose build
```

Inicia los servicios en un ambiente dockerizado

```bash
docker compose up
```

Se recomienda ejecutar los comandos anteriores de nuevo cuando se hacen cambios en el codigo

## Uso

Navegar a las siguientes direcciones desde el navegador web (Se recomienda el uso de Google Chrome actualizado)

Aplicacion web para la gestion de turnos y citas
```bash
http://<IP del host>:3000/
```

Aplicacion web para la administracion
```bash
http://<IP del host>:8000/
```

## Instalacion en la nube

Se recomienda desplegar cada servicio en cualquiera de los siguientes proveedores
- AWS
- Google Cloud
- Azure
- Heroku

Configurar cada servicio segun sea necesario

## Contribucion

Las solicitudes de extracción son bienvenidas. Para cambios importantes, abra primero un problema
para discutir lo que le gustaría cambiar.
