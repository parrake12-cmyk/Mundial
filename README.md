# Kevin vs Ivonne · Mundial 2026

App compartida para Kevin e Ivonne.

## Abrir en este computador

```bash
node server.js
```

Luego entra a:

```text
http://localhost:4173
```

## Abrir desde el celular de Ivonne

Ambos deben estar en la misma red WiFi. Con el servidor corriendo, abre en el celular:

```text
http://10.102.80.18:4173
```

Si la IP cambia, el servidor imprime la nueva URL al arrancar.

## Para que siga prendido con el PC apagado

No se puede mantener vivo desde este computador si el PC está apagado. Hay que montarlo en un servidor de internet.

La ruta recomendada para esta app es:

- Render: publica la app y te da una URL.
- Supabase: guarda los picks y resultados en base de datos.

Así Render puede dormir/reiniciar sin perder datos, porque el estado vive en Supabase.

### 1. Crear Supabase

1. Crea un proyecto en Supabase.
2. Abre SQL Editor.
3. Ejecuta el contenido de:

```text
supabase-schema.sql
```

4. Copia estos valores desde Project Settings > API:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

### 2. Subir a Render

1. Sube este proyecto a GitHub.
2. En Render, crea un Web Service conectado al repo.
3. Render puede leer `render.yaml`.
4. En Environment Variables agrega:

```text
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

5. Start command:

```bash
npm start
```

Cuando Render termine, te da una URL pública para ambos.

## Desarrollo local

Sin Supabase, la app guarda en archivo local:

```bash
npm start
```

Con Supabase local/remoto:

```bash
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm start
```

## Guardado

En local sin Supabase:

```text
data/state.json
```

En producción con Supabase, los cambios se guardan en la tabla `app_state`.

## Uso

No hay pantalla de código. Cada persona selecciona arriba `Estoy como Kevin` o `Estoy como Ivonne`.

Cuando un pick se guarda, queda bloqueado. Kevin puede editar resultados y nombres desde la interfaz; Ivonne solo edita sus picks.

## Estado inicial

- Kevin e Ivonne ya están configurados como jugadores.
- Ivonne tiene escogido a México en el partido inaugural.
- El partido de Corea queda sin pick para que lo decidan después.
