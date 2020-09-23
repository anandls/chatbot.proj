INSTRUCTIONS

Please clone the repo : https://github.com/anandls/chatbot.proj

* There are two folders included in the project i.e client and server
* The project uses React for the client side and Node for the server with a local MongoDB
* Please ignore the previous repo

To set up and run the project locally:    
- change directory to the <client> folder and run npm install
- to start the <client> project please run npm run dev
- project will run on http://localhost:3000    
- change directory to the <server> folder and run npm install
- to start the <server> project please run npm run start
- the <server> project will run on http://127.0.0.1:8082
- the ports can be changed in the .env file as well as the ALLOW_ORIGIN for CORS

Once running:
- please "sign up" which will direct you to the "client area" which will show the chat UI
- the interface accepts input such as :
    - "Hi, "Hello", "Hi there", "Good afternoon", "How are you"
    - "I want to check my bank balance", "I want to check the balance for my account", "i want to check the balance for my account"
    - "Bye", "Goodbye"
- there are a few random responses to the above and asking for bank balance will return an amount that is entered at sign up

- the client info, "bank" account info and messages are stored in the DB 
- messages are aggregated into conversations i.e one conversation contains many Client and Bot messages
- Basic JWT is used for authentication with simple localstorage

- I have not completed stats queries
- there is a login issue with data being sent and may not allow log in
- however on sign up there is a redirect to the client area -> chat UI
