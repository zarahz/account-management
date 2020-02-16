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

### Testing
1.
There is one test to delete an user which is commeted out at the moment. 
This one should be run at last. 
After running this test all tests with an user id or a token won't succeed anymore because a new user with the same user info won't have the same id and token.
You would have to adjust them in the tests of the services.
```
2.
To run the tests for the userservice you have to comment out the lines 64 and 92 in UserService.js and comment in lines 65 and 92. 
This is due to the tests of the services running locally and some cookies won't work in that way.
