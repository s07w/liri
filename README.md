# Liri, a jsNode Answer to Siri
This project involved using jsNode, Axios, BandsInTown, Spotify, and moment.js to pull and display information in command line. This was also our introduction to .gitignore and .env files. Suffice to say, there were a lot of moving parts to this project!

Ultimately it proved to be a satisfying and challenging project. The Liri app takes four commands and displays results accordingly, following the syntax node liri.js:

## 1. concert-this < artist/band name >
This searches the Bands in Town Artist Events API for an artist and renders the following information about each event to the terminal:

* Name of the venue
* Venue location
* Date of the Event (use moment to format this as "MM/DD/YYYY")
![image of concert-this](https://i.imgur.com/MLN8OCQ.png)

## 2. spotify-this-song < song title >
This displays the following information about the song in the user's terminal/bash window:

* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from
* If no song is provided then your program will default to "The Sign" by Ace of Base.
![image of spotify-this-song](https://i.imgur.com/sBUZ6QB.png)

## 3. movie-this < movie name >
This uses the OMDB API to output the following information to the user's terminal/bash window:

* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.
* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
![image of movie-this](https://i.imgur.com/z9KjXq3.png)

## 4. do-what-it-says
Using the fs Node package, LIRI takes the text inside of random.txt and then uses it to call one of LIRI's commands.

For the purposes of this demo, it runs spotify-this-song for "I Want it That Way," as follows the text in random.txt.
![image of do-what-it-says](https://i.imgur.com/0ayMJmV.png)

## BONUS: Saving commands and search terms
Finally, all of the commands and search terms are stored in log.txt, using fs.appendFile.
![image of log.txt](https://i.imgur.com/hU16itD.png)
