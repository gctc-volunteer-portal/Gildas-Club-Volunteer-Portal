# Gilda’s Club Twin Cities Volunteer Portal

The Gilda’s Club Twin Cities Volunteer Portal is a web application designed to simplify and streamline the process for volunteers to sign up for volunteer opportunities with Gilda’s Club Twin Cities. The app has three user access levels, Volunteers, Managing Volunteers, and Administrators.

---
## Built With:
* React.js
* React-Redux
* Redux-Saga
* Node.js
* PostgreSQL
* Material-UI
* Passport.js
* Cloudinary
* Express.js
* SweetAlert
* React-Csv
* Nodemailer
* Moment.js
* Getting Started:
* Required Tech:
* Node.js
* PostgreSQL
---

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Required Technologies
Link to software that is required to install the app (e.g. node):

* [Node.js](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/)
  
1. Make sure to have node and PostgreSQL installed on to your local machine.
2. Clone or download this project repository on to your local machine.
3. Open the project in the IDE (integrated development environment) of your choice.
4. Run `npm install` inside the IDE’s integrated terminal or in the terminal application of your choice (navigate to the project’s root directory and run npm install).
5. Set up the database:
    * While in the terminal, navigate to the root directory of this downloaded project. It will contain a file named database.sql.
    * Create a new database called ‘gildasclub’ by entering the following command into your terminal: `createdb gildasclub`.
    * Create the necessary database tables by running the following command in the project’s root directory: `psql < database.sql`.
    * You have now successfully set up the database structure.
  
6. Setting Up Keys for Password Reset:
    * In order to use the password reset feature, you will need to do the following steps:
        * Sign into an existing or set up a new Gmail account. Note that this will be the account from which password reset emails are sent to users, so you may not want to use a personal account.
        * Go to the following url: https://console.developers.google.com/apis/dashboard
        * Click Credentials in the menu at the left
        * Click Create to create a new project
        * Give your project a name and click Create
        * On the next screen, click OAuth consent screen, near the top of the page
        * Give the application a name, then click Save at the bottom
        * Click Create Credentials and select OAuth client ID
        * Select Web Application
        * Update the name if you’d like, and add the following url to the authorized redirect URIs: https://developers.google.com/oauthplayground (Authorized JavaScript origins can be left blank)
        * Click Create
        * In a new tab or window, go to the following url: https://developers.google.com/oauthplayground
        * In the left hand menu, under Step 1 Select and Authorize APIs, select https://mail.google.com (can be found under the Gmail API v1 dropdown or by searching in the search field below)
        * You will need to authorize your Gmail account at this point
        * Before completing Step 2, click the Settings Gear in the upper right corner
        * Click the ‘Use your own OAuth credentials’ checkbox
        * Here you should copy and paste the Client ID and Client secret that you generated in the google developers console (Closing the settings drop down will save the keys)
        * Back on the left side of the page in the oauth playground, check the ‘Auto-refresh the token before it expires’ checkbox (note that once the tokens are generated, the timer will still count down an expiration even though the token will be refreshed)
        * Click Exchange authorization code for tokens
        * Step 3 can be ignored. Clicking Step 2 will expand the tokens details so you can get to the refresh and access tokens
        * In your code, you will need to create the following keys in your .env file (you should create a .env file if you haven’t already)
  
            1. NODEMAILER_CLIENT_USER
                * This will be the Gmail email address for the account you used to generate keys in the previous steps
            2. NODEMAILER_CLIENT_ID
                * This will be the OAuth Client ID key you generated in the google developers console
            3. NODEMAILER_CLIENT_SECRET
                * This will be the OAuth Client Secret key you generated in the google developers console
            4. NODEMAILER_REFRESH_TOKEN
                * This will be the refresh token you generated in the OAuth playground
            5. NODEMAILER_ACCESS_TOKEN
                * This will be the access token you generated in the OAuth playground
  
7. Setting Up Keys for Image Upload:
   
    * How to use Cloudinary image upload
        * Sign up by using a email and password
        * You will be redirected to the dashboard once set up and the Cloud name is used to be applied to the CLOUD_NAME key
        * The API _KEY is also available under the cloud name. You will use the API_KEY with your code as well
        * Next you need to enable unsigned uploading, by clicking on the gear on the navigation bar (upper right). Next you will click on upload and scroll down to Upload presets. Enable unsigned uploading. And Copy the text under the Name column. This is going to be used for UPLOAD_PRESET in your code.
        * Next you will need the API_SECRET_KEY. Next to the upload tab above, click on security and scroll to the bottom. The API KEY will be here also, it will be hashed out, but if you click on it will show the actual key,but you want the API secret from this page. Make sure it’s active. Copy or copy/paste API SECRET. This key will be used for the CLOUDINARY SECRET KEY API. 
        * Next in your `<head>` in the `index.html` file you can add the widget: ```<script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>```. This will enable the widget to run the code, so you can upload images to cloudinary. Then you can visit the media library next to the dashboard table at the top to see uploaded images. You can delete upload images by click the check and then clicking the trash can that will pop up.
        * For documentation please vist https://cloudinary.com/documentation.
            * All Keys Can be stored in the .env file
    * NOTE: 
        * With the free plan on Cloudinary you have access to 20,000 Monthly Transformations
        * 300,000 Total images
        * 10 GB Manage storage
        * 20 GB Monthly Viewing Bandwidth
        * Anything beyond this you would need to upgrade your plan.
8. Setting Up Administrator Account:
    * In the terminal application of your choice, run the command ‘psql gildasclub’ in order to run queries inside your database
    * ```UPDATE "public"."users" SET "access_level" = 3 WHERE "users".email = '[YOUR EMAIL HERE]'``` 
9. In your integrated IDE terminal or the terminal of your choice (while in the project’s root directory), run `npm run server`.
10. In another terminal tab, run `npm run client`. These commands will run the application locally on your machine
---
## Features:
* This web application has three user access levels: Admin, Managing Volunteer, and Volunteer.
---
## Admin Abilities
* Create opportunities to be viewed by the Volunteers.
* Upload photos for and edit opportunity information/status.
* Filter opportunities by name or status.
* Leave notes for each opportunity.
* Sign up and remove volunteers for/from opportunities.
* Edit individual volunteer information,assign certifications, change active status of volunteers and write notes for each volunteer.
* View all volunteer information and sort by column headers
* Create and delete announcements.
* Give volunteers manager access.
* Export volunteer and opportunity data to csv file.


### Managing Volunteer Abilities
* Similar privileges as the Admin user but with minor limitations.
* Can navigate between Admin and Volunteer views
* Cannot access edit volunteer dialog.
* Cannot utilize the export to csv feature.


### Volunteer Abilities
* View/Sign-up/Withdraw from active upcoming opportunities that they are certified for.
* View all opportunities that they are currently signed up for.
* View announcements

### Next Steps
* We would like to be able to allow opportunities to have multiple shifts.  As of now, a new opportunity needs to be created for each individual shift that would be part of the same opportunity.
* We would like to add a way for volunteers to edit their own information.  As of now, only an administrator can update the personal information for volunteers.
---

### Acknowledgements

**Special thanks to**: 
* [Paia Thao](https://github.com/paiathao) for advice on setting up password reset features and Nodemailer.
* [Mai Yer Lee](https://github.com/Roboronnie) for help implementing the cloudinary image uploading.
* [Dane Smith](https://github.com/DoctorHowser) for all of his guidance during the two week process of building this app.
---
**Created By: [Peter Johnson](https://github.com/Petecoj), [De’Anthony Miller](https://github.com/deanthonymiller), [BJ Pennington](https://github.com/bjpennington), [Danny Yang](https://github.com/dannyyaaj)**