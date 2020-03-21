## Initialization steps:

#### To init the application:
- Install mongodb locally (brew install mongodb)
- Setup node 10.15.0 (currently using) or higher

Commands:

// Pre-requisites
*Used to setup node modules and load the geoData into mongoDB*
npm ci && node evolutions/initializeLocations

// Start the server
npm run serve



