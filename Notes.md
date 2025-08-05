# Notes

Not actually following the matrix spec - it is too complex and verbose. Trimming and simplifying api. Will use websockets for actual chatting. 

Instead of homeservers being the "atomic unit of community", communities are organized in separate federations. A federation may contain one or more homeservers. Federations are just collections of home servers that trust (through public private keys and domain names) and listen to each other.

## Big ideas

* Create tauri app in directory `desktop-app` 
* Serve the client and server together as a desktop application
* Also be able to run the server separately
* Would be cool if the server also served its own admin portal
* Might use CBOR

## Big Questions

* Encrypt private messages (channels, direct messages)?
* What persistence layer to use? How do server admins configure where their data is stored?

## Vertical Slices

* Authenticate
* 

### Slice: Authentication

Endpoints:
* `GET /auth/metadata` Returns data about authentication
* `POST /auth/register` Create a user account signed by the server
* `POST /auth/login` Returns a new refresh token
* `POST /auth/refresh` Invalidates a refresh token and deletes the device from the user's devices
* `POST /auth/