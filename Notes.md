# Notes

Not actually following the matrix spec - it is too complex and verbose. Trimming and simplifying api. Will use websockets for actual chatting. 

Instead of homeservers being the "atomic unit of community", communities are organized in separate federations. A federation may contain one or more homeservers. Federations are just collections of home servers that trust (via public private keys) and listen (via domain names) to each other.

## Big ideas

* Create tauri app in directory `desktop-app` 
* Serve the client and server together as a desktop application
* Also be able to run the server separately via docker
* Would be cool if the server also served its own admin portal
* Might use CBOR later, dunno

## Big Questions

* Encrypt private messages (channels, direct messages)?
* What persistence layer to use? How do server admins configure where their data is stored?

## Vertical Slices

* Authenticate
* Create & join room
* Send & receive messages with room
* And then a whole lot more...

Idea: Could implement test client as cli program to simplify developing the server. Would make testing easier because using stdin & stdout as the interface is easier to replicate in simulation tests

### Slice: Authentication

Endpoints:
* `GET /auth/metadata` Returns data about authentication
* `POST /auth/register` Create a user account, returns token signed by the server*
* `POST /auth/login` Returns a new refresh token*
* `POST /auth/logout` Invalidates a refresh token and deletes the device from the user's devices
* `POST /auth/refresh` Refreshes and access tokensync