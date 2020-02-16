# Account Management Frontend

### Deployment
In order to Deploy the project on the server (pwpg15) navigate into account-management and pull new git changes. Build the Project by running 
```
npm run build
```
to create the static files the Server serves. Afterwards execute
```
pm2 restart frontend
```
or
```
pm2 serve build/ 10015 [optional: --name frontend]
```