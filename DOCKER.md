# Docker GrapesJS React

There is a few docker files in this repository, to assert that the project runs correctly using react 18 & react 19.

You will find the `Dockerfile.base` which will build and mount `@grapesjs/react` to each:

1. `Dockerfile.react18`
2. `Dockerfile.react19`

## Dockerfile.base

Build this first, we build React in version 19.

```bash
docker compose build base
```

## Dockerfile.react18

To test react 18, run the following command:

```bash
docker compose build react18
```

Wait for the build then run the react18 container:

```bash
docker compose up react18
```

Visit `http://localhost:5173/` to see the project running.

## Dockerfile.react19

To test react 19, run the following command:

```bash
docker compose build react19
```

Wait for the build then run the react19 container:

```bash
docker compose up react19
```

Visit `http://localhost:5174/` to see the project running.
