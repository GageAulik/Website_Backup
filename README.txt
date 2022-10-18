README

Gage Aulik 12/16/2021
	This README will give you the info on my project

What I didn't/couldn't do
	For some reason, the date's formatting didn't work, so you won't be able to add dates into the information on the sql table "date"
	Additionally when you add something it brings you to the /add page and gives you null IGNORE IT
	The data will still be in the SQL, just refresh the page and go to games.html

index.html
	This is the landing page giving you a little information on what is in this project
	Additionally there is an href that will link you directly to games.html

games.html
	This is the main page, there is a lot going on here
	There is an 'ADD' button that will allow you to ADD SQL Data to the Database AulikGames
	Additionally there is a cancel button that will allow you to go back to the landing page if you wish to cancel
	If you wish to fill add data, simply just get rid of anything that is sitting in the inputs and hit add
	Again, note that there will be no date as the function breaks the code, so I have it commented out. just pretend it doesn't exist
	There are two inner joins on this page, one is for the date, and there is one for the Genre of the game

	Pay attention to teh genre for the game as that is the most important one as it's functional.
	Lasty there is some information on the page on how you can add/cancel adding things to the SQL database

games.JS
	On this page you will see there are two main functions
	One will fill out all inputs with the information that you have decided to grab from your sql
	The other will add the neames of the games into nav


server.js 
	There is a lot going on here 
	First we have an express server that uses json
	second we have an sql and a body parser that allow us to actually do the important things
	I installed bodyparser into the server with npm install
	There are three endpoints /names /date and /add
	/names pulls all names from games and connects you to the sql server
	/date is where all of the inner join happens
	Again there are two inner joins: Dates and Genres into games.
	This also formats the date so it doesn't look ugly
	/add uses post to insert games and genres into our sql database
	This could use a little more polishing, maybe if I had an extra day or two I would be able to get everything super clean.

games.css 
	This is just making things look pretty

SQL
	The sql file that you are looking for is within the public folder
	