# Pishrun

This project was generated using [Nx](https://nx.dev).

## This Monorepo Contains below projects:

- Pishrun

## Installation

First, please clone the repository.

```
git clone git@github.com:PISH-RUN/pish.run.git
```

then install dependencies with:

```
yarn
```

## Running Development

- **Pishrun Client**

```
nx serve pishrun-client
```

- **Pishrun Core**

  First copy the `.env.example` to `.env`
  Then

```
nx develop pishrun-core
```

- **Pishrun UI Storybook**

```
nx storybook pishrun-ui
```

In order to run the test just use:

```
nx test
```

Or for the specific app use the app name after `test` command
