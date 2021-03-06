###IOI-HA Outcome Tracker

## Project Description:

The **International Outcome Inventory for Hearing Aids** is a seven item
__standardized__ measure which has been translated into **30 different languages**.  
It was originally designed for evaluating the efficacy of hearing aid rehabilitation.
It is standard practice to ask patients to complete a **IOIHA** at least one month
after being fit with hearing aids.  However an outcome measure means nothing
unless you are tracking and analyzing the data.

I currently work with six different hearing aid vendors *(the big six)*.  Although
all hearing aids do the same thing (amplify sound), they all do it in different ways.  
I like to track the **IOIHA** outcome based on the Make and Style of the hearing aid.  
Are patients doing better with RIC style hearing aids than with Full Shell (FS) style
hearing aids?  Are patients doing better with one company's hearing aids compared
to another company?  Being able to answer these questions will help me improve
my treatment for future patients.  

The point of this web application is to create a database of IOIHA outcomes based
on Make, Model and style of hearing aid, then use those results to determine which
treatment is working best for my patients.  

## Instructions for running the app:

You cannot gain access to the mongodb without first adding the .env file to the
root directory.  The .env file will be emailed to individuals who require access.

**To Run the App**

  1. Ensure you have node.js installed on your computer
  2. Go to the root directly of the project
  3. Clone or download the project from the repo.
  4. Run **npm install** to install necessary packages
  5. Add a .env file to the root of project and include information sent over private communications
  6. Run **npm start** to begin the app server process
  7. Open your browser to localhost:3000 to run the app

## Future Directions for this project

  1. Display average IOIHA score based on hearing aid Make
  2. Display average IOIHA score based on hearing aid style
  3. Add audiometric thresholds and speech discrimination scores to database
  4. Display average IOIHA score based on pure tone averages
  5. Display average IOIHA score based on speech discrimination scores
  6. . . . the possibilities are endless.  
