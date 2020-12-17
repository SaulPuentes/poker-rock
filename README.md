This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Poker-Rock

## Table of contents
- [Poker-Rock](#poker-rock)
  - [Table of contents](#table-of-contents)
- [What is Poker-Rock](#what-is-poker-rock)
- [Getting started](#getting-started-1)
- [How to play](#how-to-play)
- [How it works](#how-it-works)
  - [Database connection](#database-connection)
  - [Login](#login)
  - [Waiting room](#waiting-room)
  - [Setup table](#setup-table)
  - [Rounds](#rounds)
  - [Add card](#add-card)
  - [Players Move](#players-move)
  - [End of round](#end-of-round)
  - [End of match](#end-of-match)
  - [Calculate best hand](#calculate-best-hand)
  - [Update Scoreboard](#update-scoreboard)
  - [Update History of Games](#update-history-of-games)
  - [Restart game](#restart-game)

What is Poker-Rock
==================

Poker-Rock is THE new ultimate generation online poker playing plataform. Seriously this is cool, check it out now at <SERVER_IP>

// TODO - Update server IP <SERVER_IP>

Getting started
===============
To setup this plataform in your own environment:


1. Clone this repo.
    ```bash
    git clone <GIT_HTTP_URI>
    ```
    // TODO - Update git Http <GIT_HTTP_URI>

2. Running it as a production server.
    ```bash
    npm run prod
    ```

How to play
===========

// TODO - Add how to play instructions

How it works
============

Database connection
-------------------
The backend works with MongoDB.

**Users collection**

Stores the user's data in the given format.
```json
{
    "id": "ObjectId('98GHff3f4NGfsdfBV9EJ')",
    "username": "Darth Vader",
    "password": "luke1amURfather",
    "score": 42
}
```

**Games collection**

Stores the games's data in the given format.

```json
{
    "id": "ObjectId('98GHff3f4NGfsdfBV9EJ')",
    "players": [
        "Darth Vader",
        "Frodo Baggins",
        "Sarah Connor"
    ],
    "movements": [
        {
            "player": "Darth Vader",
            "movement": "Raise",
            "bet": 42
        },
        {
            "player": "Frodo Baggins",
            "movement": "Fold",
            "bet": "undefined"
        },
        {
            "player": "Sarah Connor",
            "movement": "Call",
            "bet": 42
        }
    ]
}
```

Login
-----
If *User already registered* access granted to the waiting room.

If *User is not registered* redirected and ask for username and password.

Waiting room
------------
The application will wait for 4 players to be logged in order to start the game. If one payer is missing, the game will not start. 

Setup table
-----------
When the game starts, the table is initialized. There are 4 players, with their respective session credentials, and the table, which is a variation of the object of the player. 

Rounds
------
+ There are up to 3 rounds. There will be a counter for each round, will it be modified after the players movements.
+ During each Round, the numbers of cards held by the table will change. During the first round, the table will only have 3 cards, in the second one it will have 4 and in the third, and last, one it will have 5 cards. 

Add card
--------
+ In an array, the indexes of all the 52 cards will be stored. When the table is initialized, the 52 cards are “shuffled” with a random function and stored in a new array.
+ The first 3 cards of the new array will pop in order to assign these cards to the table. When a new Round is about to begin, another card for that given array is pop again. 
+ 2 cards more, per player, will pop to be assigned to each user. 
+ After this, the game is ready to begin. 

Players Move
------------
+ Each player has 4 possible moves: 
    + Raise: The player can increase the bet. These points will be taken from the score of each user. 
    + Fold. The player can standby and decide to not to play any further in the round. 
    + Call. The player can equal the initial bet. 
    + Quit. The player will logout from the application. 
+ The first player will make the initial bet. 
+ The order of each turn will be assigned to the player at the right of the previous player. 
+ Each player has a counter of 30 seconds to make their move, if the player does not make any move, the default move will be a Fold. 
+ During each player’s turn, the player can only make one of the 4 possible moves. 
+ If a player makes a Raise, the other players will have to make a raise or call. There can not be a player whose bet is lower than the rest of the players.  
+ When a player makes a Call or a Raise, their score will be decreased by the given amount, this will alter the collection from the database. So, if a player does not have enough points they can not make a Raise or a Call, only a Fold. 

End of round
------------
+ In order to End a Round, all the players must have moved, in their last turn, as Fold. When all the players make a Fold, the Round counter will increase in 1. So the next Round can start. 
+ The Table will call for another card and the players later can make a move again  repeating the mechanic. 

End of match
------------
When the Round is the last tone, the 3rd Round, and all the players make a Fold, the match will end, retrieving the data from all the players. Their current cards and score. 

Calculate best hand
-------------------
+ In order to calculate the best hand, the winner one, the cards from the table will be retrieved and concatenated with the cards of each player in an array for each player.
+ The comparison will be made with each new array and a series of predefined arrays which will contain the possible winning hands.
+ The possible winner hands are as shown below, and in that order, being the first one the stronger hand:

// TODO - Add hands image reference

<img src="https://enroutesystems.atlassian.net/2ccc08fb-8962-454b-80cb-755ae6d1353f#media-blob-url=true&id=37686ccc-bf0e-4e53-8c93-763cc500e78e&collection=&contextId=10225&mimeType=image%2Fjpeg&name=bWwaDGPUVVs_W4esJUf9ALv6uxU_QkNpaa47bMTDL93KjgdRzB7It4L3zF9dKzhuYWkD4rXyIFA_Ps1qWwqM0_dB_y_oBdJ4ScCY_WrVwxKcBIyDopBDP27LB3Mk4Q79G7AZJ0lk&size=77543&width=600&height=849" />

+ Combinations
  + Royal Flush. 10, K, Q, J and A of the same Suit
  + Straight Flush: 5 consecutive numbers of the same Suit
  + Four of a kind: 4 kinds of the same rank
  + Full House: 3 cards of the same rank and 2 different of another same rank. 
    > If two players have the same type of winner hand, a second comparison has to be done, with the 3 similar cards, depending on who has the highest rank,for example, if a player has 3A and another has 3K, the winner is the one who has the 3A.
  + Flush: 5 cards in no consecutive order of the same Suit.
  + Straight: 5 consecutive numbers of different Suit.
  + Three of a kind: 3 cards of the same Rank. In this case the same condition applies from Full House.
  + Two pairs: 2 couples of 2 cards of the same Rank.
    > Any other case will lose the match, a single pair will not make a condition for winning. 

Update Scoreboard
-----------------
+ When the game ends, one player is the winner, the total amount of points bet during the match is added to their current score, this will alter the collection from the database for that user. 
+ The leaderboard is linked with the database, the data retrieved is the user name and their corresponding score. 
+ The player with the highest score will be displayed on top in the list, followed by the player with the second highest score and so on. 

Update History of Games
-----------------------
+ In the database there is a collection used to store the data of the last five matches. The data stored here is:
  + The user name
  + The user score at the end of the match
  + Their cards
  + Status - If they are a winner. 
+ The History of Games view will only show the history of the last five matches, the collection will be updated deleting all the other matches and just conserving the last five ones. 

Restart game
------------
When the match ends, the application can tell the players if they want to play once more. If they choose “Yes” the application will redirect the to the Waiting Room in order to wait for other players. If they choose “No” the application will logout the player. 
