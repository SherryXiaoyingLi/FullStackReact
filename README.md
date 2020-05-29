# FullStackReact

## Application

1. run 'npm run dev' to start the express server and create-react-app server concurrently using react module

2. express server listens on localhost:5000
   react app server listens on localhost:3000

3. thrid party API: 

1) two remote MongoDB instances (one for prod, one for dev env) @ mongodb.com 
2) two google project (OAuth+Passport, one for prod, one for dev env) @ google developer console
3) application (named mighty-harbor-36387 @ heroku) deployed to https://git.heroku.com/mighty-harbor-36387.git @ heroku.com and application (production) can be accessed at https://mighty-harbor-36387.herokuapp.com/
4) billing handled via Stripe (one test account)
5) use email provider SendGrid

## Routes

### Express Routes

1. authRoutes.js

1) /auth/google
2) google redirect urls: localhost:5000/auth/google/callback and localhost:3000/auth/google/callback
3) /api/logout
4) /api/current_user 

2. billingRoutes.js

1) /api/stripe

3. surveyRoutes.js

1) /api/surveys
2) /api/surveys/thanks

### React-router
