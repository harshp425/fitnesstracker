# FittApp

This project is a fullstack interactive fitness tracker web application which provides users with an array of workout data logging and analysis features. Users are able to register themselves upon initial use of the application and can then subsequently login with thier set username and password. The application offers a dashboard where users can add and remove thier personal records and fitness goals. They can also log different types of strength and endurance workout data which is then displayed through charts and graphs to visualize progress by select metrics.  

## Technologies Used

The backend for this project is written in Java using the Spring Boot framework. Among other dependencies outlined a later section, the application also uses the Spring Security framework to handle security features, tokens, and user authentication. The database used to store this user and entry data is a MySQL server. The frontend for this project is written in Javascript using React.js. The styling is handles through a combination of BootStrap and custom CSS. Furthermore, the chart visualizations are handled through recharts.js.

## Key Features

Some of the key features that this application provides to users include...
- Logging and removing personal records from the dashboard
- Logging and removing goals from the dashboard
- Logging Strength/Weight Training Workouts
- Logging Endurance/Cardio Training Workouts
- Viewing all past entries for a exercise of choice in the form of a chart
- Viewing strength exercise progress through weight progression, rep progression, and volume load progression charts
- Viewing endurance exercise progress through distance progression, distance vs pace progression, and intensity progression charts

## Installation and Setup

In order to setup the development environment to run this project, the user must have a SQL database server downloaded onto thier machine (preferably a MySQL server). The user must also have an IDE (integrated development environment) installed for Java and Javascript (this project utilizes IntelliJ Idea for the backend development and VsCode for the frontend). Additionally, the user must also have Node.js and npm currently installed on thier machine.

#### Backend Setup
The first step is to create a Spring Boot Project using https://start.spring.io/ with the proper dependencies added to the project as well. Refer to the image below for the list of dependenies that should be added while creating the project. The website does not allow for adding the `jjwt` dependency and so that will have to be added later to the `pom.xml` file. The file in `fitnesstracker/Backend/pom.xml` of this repository contains the dependency block for `jjwt` and can be copied into the user's pom.xml file. 

<img width="1470" alt="Screenshot 2024-01-23 at 11 16 15 AM" src="https://github.com/harshp425/fitnesstracker/assets/126726290/852625a9-d200-4cfe-8738-8eb1c6a1185d">

Once the project is dowloaded, the user can open up the project in thier IDE. Next, under the `com.project.{your project name}` folder in the project, the user can create the configuration, controller, models, repositories, service, and user detail folders. Next the user can populate those folders with thier respective files as shown in `fitnesstracker/Backend/`. 

<img width="315" alt="Screenshot 2024-01-23 at 12 50 12 PM" src="https://github.com/harshp425/fitnesstracker/assets/126726290/0818af68-8b9e-41af-a07c-2a5c89aec7be">

Next, in the application.properties folder of thier project, the user can copy and paste the contents in the `fitnesstracker/Backend/application.properties` file. The user must create a new database in thier SQL server and insert the appropriate database name, server name, and server password. 

### Frontend Setup
The first step is to open up VsCode and open a new terminal (assuming Node.js and npm are already installed). Inside the integrated terminal, the user should type `npx create-react-app my-app` where `my-app` is the name they wish to give to the project. Once the project is created, the user should open it up in VsCode and navigate to the `src` folder. Inside that folder, the user should add the files inside `fitnesstracker/Frontend/Javascript Files/` and `fitnesstracker/Frontend/CSS Files/`. Note that the premade index.js and App.js files should be replaced with the ones in the github repository folder. 

<img width="224" alt="Screenshot 2024-01-23 at 12 44 50 PM" src="https://github.com/harshp425/fitnesstracker/assets/126726290/68125d60-3cc3-4465-8bd1-e48c13ec93e5">



