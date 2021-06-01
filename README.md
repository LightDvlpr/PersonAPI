# PersonAPI

PersonAPI is an API I designed from scratch that implements basic CRUD principles. 
It is built using Node.js + Express.js/Postgres and can be run via Docker.

Note: The below documentation has been constructed mostly for macOS. There might be an adjustment or two to be made for Windows.

## Installation

Two installations are required. One for docker desktop and one for node. 

### Docker

Docker desktop will be used to run the entire application.

*Be sure to have Docker Compose available in your installation*   

Install docker from [here](https://docs.docker.com/docker-for-mac/install/)

### Node

Node will be used to run the test file for the routes. 

Install node from [here](https://www.npmjs.com/get-npm)

### Set it up

First thing's first, clone the repo. 

```
cd PersonAPI
```

Before you run the application you need to set up the database connections and install node modules      

Run this command to install the necessary node modules

```
npm install
```

Run this command to create a custom bridge Docker network

```
docker network create -d bridge --subnet 192.168.0.0/24 --gateway 192.168.0.1 mynet
```

# Start up the application

Run the following commands 

```bash
docker compose build
```

```bash
docker compose up
```

After you run the above commands you'll notice 3 containers will be created. 

Container 1: API    
Container 2: Database           
Container 3: PgAdmin. (Database administration tool)    

# What you can do

This API is built for you to be able to manage a database with people's information. 

You are able to 
>`create a person object`      
 `read a person object`       
`read a person object + your preferred version`      
`update a person object`      
`delete a person object`       

One particular feature of this application is that when you `update` an individual's information, a new version of that person will be created for that particular individual. 

For instance, lets say you have an individual named bob smith.  His information will pop up as


>`firstName: bob, lastName: smith, age: 23, email: bobsmith@gmail.com`

Now lets say he's now 24. If you update his information you will have his previous information as well as the new info noted below:

>`firstName: bob, lastName: smith, age: 24, email: bobsmith@gmail.com` 


The first version of his info will be noted as Version 1. The second will be noted as Version 2. So on and so forth.

In addition to versions, your updates and deletes will only occur on the latest version of that individual's info.

# How to interact with the API

This application can be interacted with via Postman or cURL commands. 
Lets be a little daring and use cURL. 

## Create a Person

In order to create a person you'll need to use a cURL command via a different terminal.

In order for the command to work, you need to enter the info accordingly

First Name **required** `Needs to be a string`      
Middle Name **Optional** `Needs to be a string`     
Last Name **required** `Needs to be a string`      
Email **required** `Needs to be a string`      
Age **required** `Needs to be an integer`      


Here's the cURL command:  

>You may change the key values as you'd like.

```
curl --location --request POST 'http://localhost:3000/persons' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Alex",
    "middleName": "smith",
    "lastName": "Frank",
    "email": "1gmail.com",
    "age": 19
}'
```

## Get all People in the database (latest Versions only)

This cURL command will allow for you to see all the different people that are currently in the databse. Their latest versions only. 

```
curl --location --request GET 'http://localhost:3000/persons'
```

## Read data on a specific person

This will require you to interact with the results. I've designed the backend to create a different ID value for every single person.    

In order for you to get the details of a specific person you'll need to grab their `pid` value. (pid = ID)

How can you get that value? 

>The previous cURL command is what you can use to grab the `pid` for whichever person you like. 
Once you copied it, replace it in the cURL command below where you see `ID`
```
curl --location --request GET 'http://localhost:3000/persons/ID'
```

## Update the data on a specific person

This cURL command will allow for you to update the information on a particular individual. In addition to needing their `pid`, you will also need to update their information however you'd like. 

>Replace the `ID` value with the `pid`

Enter in new values for whatever you'd like to change. (first name, middle name, last name, email, age)

```
curl --location --request PUT 'http://localhost:3000/persons/ID' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "",
    "middleName": "",
    "lastName": "",
    "email": "",
    "age":
}'
```

## Read data on a specific person and your selected version

Now that you've updated a particular person's data, you now have two versions of one person. 
Lets say you want to choose the first version of that person, not the default latest version of that person. 

Here's the cURL command:     

>Replace `ID` with your person's `pid`  
Replace 'Version' with your preferred version number
***Assuming the version number exists of course***

```
curl --location --request GET 'http://localhost:3000/persons/ID/Version' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "David",
    "middleName": "kim",
    "lastName": "moon",
    "email": "applesAndJamgmail.com",
    "age":45
}'
```

## Delete a person

All things come to an end. Lets say a person no longer wants to be apart of your database. Fortunately you're able to delete them from your database with no trouble.

Here's the cURL command:

>Remember to swap `ID` with your person's `pid`

```
curl --location --request DELETE 'http://localhost:3000/persons/ID'
```

# How to use PgAdmin while the application is running 

PgAdmin allows you to explore the databse while you're running/entering in data to the database

If you'd like to connect to PgAdmin then follow these instructions

>First, while the application is running, go to your browser and enter in the following address 
```
http://localhost:16543     
```

>Second, enter in the login info.   

`Email: test@gmail.com`   
`Password: test123!` 

>Third, after you've logged in, you'll need to connect to the server.

- On the pgAdmin dashboard you'll see 'Add new Server'. Click on that. 
- In the general section you may choose a name for the server. 
- Switch over to the connection tab and enter in the following info:    

` Host : 192.168.0.1`     
`Port : 5432`      
`Maintenance database : personalDB`      
`Username: postgres`      
`Password: password`      

> Click on 'Save' and you are now connected to the server!

To check the tables used in this DB: 
--> Select Root
--> Select PersonalDB
--> Select Schemas
--> Select Tables

>Persons table keeps all IDs of the different people in your databse.     
To check all values in this table, Right click on it and click View/Edit Data and choose All Rows

>PersonsVersions is where all versions of each person is kept track of    
To check all values in this table, Right click on it and click View/Edit Data and choose All Rows

# Testing

In order to run the test file make sure you have Node installed.

`cd` into the root directory of the project in a separate terminal

run the command while the containers are alive

```npm test``` 

These tests will be run against our database