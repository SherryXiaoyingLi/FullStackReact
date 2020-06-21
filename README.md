# FullStackReact

## Application

1. run 'npm run dev' to start the express server and create-react-app server concurrently using react module

2. express server listens on localhost:5000

   react app server listens on localhost:3000

3. thrid party API: 

two remote MongoDB instances (one for prod, one for dev env) @ mongodb.com 

two google project (OAuth+Passport, one for prod, one for dev env) @ google developer console

application (named invisible-power-36387 @ heroku) deployed to https://git.heroku.com/invisible-power-36387.git @ heroku.com and application (production) can be accessed at https://invisible-power-36387.herokuapp.com/

billing handled via Stripe (one test account)

use email provider SendGrid

## Routes

### Express Routes

1. authRoutes.js

/auth/google

google redirect urls: localhost:5000/auth/google/callback and localhost:3000/auth/google/callback

/api/logout

/api/current_user 

2. billingRoutes.js

/api/stripe

3. surveyRoutes.js

/api/surveys

/api/surveys/thanks

### React-router
