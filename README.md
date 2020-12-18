# PL Report: An English Premier League Score Tracker

## Grading (30 Points)
- 20/20: Requirements
- 4.5/5:   Validity
- 5/5:   Documentation
- 2/2:   Bonus
Total: 31.5/30

## Requirements: 20/20
In my original project statement, I set out to accomplish the following milestones in my app (if you already have my original Project Statement handy, this is just copy/pasted from there. Feel free to skip ahead to line 37 in this doc for my proof that I accomplished all of this):

### Individual Match Page 
For each of the matches that the Football Data API returns, I will create a page that allows the most common stats that people like to see when looking at the results of a soccer match (please see Figure 3 below which shows how an existing application called OneFootball displays some of these statistics). Here are the main stats that I will be displaying for each team:
  - Goals scored
  - Total shots
  - Shots on target
  - Total passes
  - Scorers of each goal
  - Players who earned yellow cards
  - Players who earned red cards
  - Substitutions
  - Lineup

### List of all matches for the day
The main screen in this application will list out all of the Premier League matches that occurred on the current day. If there are no matches on that day, there will be two buttons on the page instead: one to go back to the previous matchweek’s results, and another to go forward to the upcoming matchweek’s fixtures. See figure 1 for an example from the OneFootball app of how this might look.

### Track English Premier League teams only
As the free version of the API does limit what leagues you can pull data from and the main league I have an interest in is the English Premier League, I plan to only implement this app to track results and fixtures from teams in the English Premier League.

### Show the team logos for each team on all pages
Users should be able to see the logo of the team’s scores that they are looking at wherever they go in the application, so it is easy to identify which score they are looking for.

### Move throughout all of the past results from previous seasons of the Premier League
Users should be able to view results and fixtures from games at the very beginning of the season, as well as multiple years back, so long as the API has data on those years. The app should have buttons on the main screen for users to go back one gameweek, go forward one gameweek, as well as jump to the current gameweek if they go back or forward too far. 

### How successful was I at accomplishing the above Requirements?
- For the **Individual Match Page** requirement, I indeed was able to build out a page component that allows users to view any individual match from the API. However, I was not able to show every single field listed in my requirements. I saved the individual match page for last in my process of building the project, and found out that the day before this was due, the API I was using would charge me 25 euros/month to get access to all of the data I needed to show on this page. So, I was forced to find a new API ([SportsDB](https://www.thesportsdb.com/)) and port over all of my existing logic and requests to use the new API and its endpoints. This caused me a several hour setback in my project, but ended up working out well for me. I was able to successfully show individual match data for any match that my user requested. However, due to the restrictions of the API endpoints, I was unable to show 'Substitutions', 'Scorers of each goal', 'Players who earned yellow cards', and 'Players who earned red cards'. Thankfully, as you will be able to see in my app, I have made up for the lack of this data with about 15 other data points that are relevant to the match. The API I am using unfortunately does not offer easy access to the specific players who scored a goal, got a red/yellow card, etc, but does offer lots of datapoints regarding the overall stat for a team (such as total yellow cards for a team in a match or total shots on target).
- For the **List of all matches for the day** requirement, I was able to implement a "Today" page which shows the currently live matches and other matches occurring on the day that my user opens the app, along with a view that lets the user know that no matches are going on today if no matches are occurring today. I did change my app so that I have a separate "Matchday" page, which allows the user to look at any gameweek (which if you are not familiar, means all of the matches played in a certain group of days, as sometimes Premier League games can have weird schedules and will not always be only on Saturday/Sunday), past, present, or future (so long as the future gameweek is in the current season, the API does not provide endpoints for future seasons as there is no schedule out for them yet).
- For the **Track English Premier League teams only** requirement, I was able to show all Premier League matches, and no other leagues.
- For the **Show the team logos for each team on all pages** requirement, I was able to show team logos on all *individual match pages* and the "Table" page, but not on the main "Today" or "Matchday" pages. The reason for this is that if I wanted to get the logos for each team on the "Today" or "Matchday" page, I would have to make a separate request for **each team** that is listed on a card for a match on that page. This means, that for each match on the page, I would have to fire 2 separate requests for that team's data, then only use the image link provided to me from that data in the card. On some pages, I have as many as 10 matches shown at once, which if I requested team logos for *all* of the teams, that would be 21 total requests for just one gameweek! I decided against this, as it slowed down my app significantly, and I did not want to be requesting such a ridiculous amount of data from a free API for one page view. However, on the individual match page, I did go ahead and make that request for each team (as there will ever only be two teams on the page), so the logos are shown there. Also, in the request I use for the Table page, that data included logos for each team (as I had to use the original API for just the Table data, since the new API I use for everything else did not provide quickly-updated table data).
- For the *Move throughout all of the past results form previous seasons of the Premier League* requirement, so long as the API I am requesting has data on that season, my app can get access to it and show it to the user. In my testing, the API goes back about 10-15 years in the Premier League's 25-30 year history.

## Validity: 4.5/5
I believe that it will be clear that I spent a lot of time focusing the design of my app for mobile users primarily. While there is a functioning desktop site, this app certainly was designed for and is much more enjoyable to use on a mobile or tablet device. I unfortunately ran out of time at the end of this project to make the navigation tab bar into a sidebar on the desktop site, which given another hour or so would have been my final major change to this project. 

## Documentation: 5/5
I believe that my app is well-documented, though in some components it may be a bit challenging to read, as JSX with React is not easily used with comments, since you cannot use normal '//' Javascript comments or even '/* */' multi-line Javascript comments easily. My requests and my functions throughout though are very well-documented, and I believe that you should be able to get the general flow of my app at a glance through my code.

## Bonus: 2/2
I added an extra component, the Table page, which shows the current Table for the Premier League, which was not a part of my requirements. This was not listed explicitly as a bonus feature, but was something I decided to add as I felt it fit right in perfectly with the rest of the features in my app.

## Notes
I ended up using TailwindCSS instead of ChakraUI in my final project for styling the code, hence why you will see many classes throughout my components (as TailwindCSS is a CSS framework that applies styles based upon what classes you give to elements). I did not set up a Node.js server, as Next.js has a built in feature called `getServerSideProps()`, which allows you to do server-side rendering of pages. I made all my requests using this function in my components, to avoid the extra hassle of building out a Node.js server from scratch. I did not know that Next.js had this capability when I originally wrote the requirements for this project. The link to my live demo is [here](https://pl-report.vercel.app), which I provided instead of recording a YouTube video this time. I believe that my README is a thorough enough explanation of all the features I would normally talk about in a screen recording demo of the app. Also, make sure to `yarn install` in the project root to get the dependencies, as well as run `yarn dev` to spin up a local server at `localhost:3000` on your machine.
