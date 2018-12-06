# Delivery Documentation
## Team JID-8136: Athlead


## Release Notes: ##
### v 0.8.0 ###
**New Software Features Found in this Release:**
- Team Athlete and Individual Athlete User Functionality
  - Can View Today's Workout Preview
  - Can View Program Overview and week preview
  - Can View Exercise Coaching Cues in Workout Preview
  - Can View Profile
  - Can edit user's name
  - Can make 1 Rep Max Log Entry
- Can view and search exercise library
- Can create coach account
  - Can View Team Roster

**Bug Fixes Made Since the Last Release:**
- This is the first release of the application.
  
**Known Bugs and Defects:**
  - Profile page requires refresh after settings modification (name update)
  - 1 Rep Max Log Entry doesn't display properly in history page
  - Coach's app missing view history functionality for each athlete in roster

## Install Guide: ##

**Pre-requisites**
  - Operating System: Windows 7 or greater, Mac OS X 10.11 or greater, GNU/Linux kernel 2.6.32 or greater
  - Web browser: Internet Explorer 9 or greater, Microsoft Edge, Google Chrome v23 or greater, Mozilla Firefox v21 or greater, Safari v12 or greater

**Dependent libraries that must be installed**
- Install the most recent version of Node.js from https://nodejs.org/en/download/
- Windows
  - Download the Windows installer (.msi file) from the provided link
  - Run the installer and follow prompts to complete installation
- MacOS
  - Download the macOS installer (.pkg file) from the provided link
  - Run the installer and follow prompts to complete installation
    
**Download instructions**
  - Project repository found at https://github.com/adip730/WebApp8136
  - To download this project, click the green "Clone or Download" button
    - Click "Download ZIP"
  - To clone this project to a local repository
    - Click the green "Clone or Download" button
    - Copy the URL
    - Open your computer's Command Line/Terminal
      - Navigate to the desired local repository
      - Run the command `git clone [Copied URL]`
  
**Build instructions**
  - Navigate to location of cloned repository/downloaded project in your command line/terminal
  - Run the command `npm run build` to build the source code as an executable application
  
**Installation of actual application**
  - Navigate to location of cloned repository/downloaded project in your command line/terminal
  - Run the command `npm install` to install all modules listed as dependencies in package.json
  
**Run instructions**
  - Navigate to location of cloned repository/downloaded project in your command line/terminal
  - Run the command `npm start` to run the program
    

**Troubleshooting**
  - Dependencies are not properly installed (not recognized)
    - If any dependencies are reported as not recognized upon dependency installation and runnning the code, close the command line/terminal, open up a new instance, navigate back to the relevant directory, and try running to program again
  - Program does not open on command `npm start`
    - The application should automatically open and run in new tab in your web browser
    - If it does not, open your web browser and navigate to `localhost:3000`
  - Errors are unlikely with these installation steps. Any other encountered errors can usually be fixed by following instructions that appear in the Command/Terminal window.
    
