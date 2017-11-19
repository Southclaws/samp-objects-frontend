# SA:MP Objects Frontend

[https://samp-objects.com](https://samp-objects.com) is a service I built for the San Andreas Multiplayer community - SA:MP 0.3.8 added the ability for servers to provide custom assets to clients so this website is a platform where users can share their work and server owners can search for content to add to their servers.

## Architecture

The site follows a modern, decoupled RESTful service-oriented architecture. The backend is a Go web service and [you can check that out here](https://github.com/Southclaws/samp-objects-api).

The app was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and uses React Router with Bootstrap and Blueprint for UI. The reason I've used two UI frameworks is because neither of them provide all the features I want (and I'm not really a CSS expert!).

It's also written in TypeScript which is why there's a `src/ts/` directory with a bunch of empty .d.ts files, it keeps the compiler happy with the libraries that don't have type definitions.

## Development

To work on the application locally, you'll need an instance of the API service running - because of CORS, you can't use the live API at api.samp-objects.com. To get that running, [read this](https://github.com/Southclaws/samp-objects-api#development).

Once that's running, ensure the configuration in `App.tsx` is set up to use the local endpoint:

```ts
// export const HOST = "samp-objects.com";
// export const API_SCHEME = "https";
// export const API_HOST = "api.samp-objects.com";
// export const API_PORT = "443";
export const HOST = "localhost";
export const API_SCHEME = "http";
export const API_HOST = "localhost";
export const API_PORT = "8080";
```

And when submitting a pull request, make sure you leave the production config uncommented.

(I haven't quite figured out how to make this process easier, the create-react-app maintainers suggested ejecting and adding config functionality myself which I don't want to do).

## Tests

I'm fairly new to React and modern JavaScript projects (as you can probably tell!) so tests don't exist here yet. At some point I'll likely get around to it and forget to edit this message!
