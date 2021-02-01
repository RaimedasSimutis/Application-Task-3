# Application-Task-3

## About 

Just a small weather app with basic functionality. It uses [OpenWeather](https://openweathermap.org) provided API and displays current weather / week forecast to the end user. :sunny:

[DEMO](https://application-task-3.vercel.app/)

## Things to improve
- Cities list is huuuuge and has massive negative impact on performance. City suggestions could be refactored with API requests;


## Task
- Get current weather from API for users city if user allowed to access theirs location, if
not fallback to Vilnius, Lithuania;
- Get forecast for a week;
- Allow user to select city from a list of cities (with instant filtering as user types);
- Short description in readme file describing how to set up project;
- Use best practices in software development;
- System must be scalable if any new features needs to be added or existing -
modified.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
