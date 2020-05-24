# FullStackReact

## Application

1. run 'npm run dev' to start the express server and create-react-app server concurrently using react module

2. express server listens on localhost:5000
   react app server listens on localhost:3000

3. two remote MongoDB instances (one for prod, one for dev env) @ mongodb.com and two google project (OAuth+Passport, one for prod, one for dev env) @ google developer console

4. application (named mighty-harbor-36387 @ heroku) deployed to https://git.heroku.com/mighty-harbor-36387.git @ heroku.com and application (production) can be accessed at https://mighty-harbor-36387.herokuapp.com/

## Routes

1. /auth/google

2. google redirect urls: localhost:5000/auth/google/callback and localhost:3000/auth/google/callback

3. /api/logout

4. /api/current_user 
