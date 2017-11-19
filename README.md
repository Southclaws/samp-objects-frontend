# SA:MP Objects Frontend

[https://samp-objects.com](https://samp-objects.com) is a service I built for the San Andreas Multiplayer community - SA:MP 0.3.8 added the ability for servers to provide custom assets to clients so this website is a platform where users can share their work and server owners can search for content to add to their servers.

## Architecture

The site follows a modern, decoupled RESTful service-oriented architecture. The backend is a Go web service and [you can check that out here](https://github.com/Southclaws/samp-objects-api).

The app was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and uses React Router with Bootstrap and Blueprint for UI. The reason I've used two UI frameworks is because neither of them provide all the features I want (and I'm not really a CSS expert!).

It's also written in TypeScript which is why there's a `src/ts/` directory with a bunch of empty .d.ts files, it keeps the compiler happy with the libraries that don't have type definitions.
