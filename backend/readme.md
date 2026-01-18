🔐 My First Auth System (The Secret Guard)
Hello! This is a simple project that acts like a Secret Guard for a website. It helps people create accounts, log in, and change their passwords if they forget them.
🏗️ What's inside? (The Folders)
Think of the folders like a restaurant:
server.js: The Manager. He starts everything and makes sure everyone is working.
models/: The Blueprints. This tells the database exactly what a "User" looks like (Name, Email, Password).
routes/: The Menu. It lists all the paths a user can take (like /signup or /login).
controller/: The Chef. This is where the actual cooking (logic) happens. It checks if the password is correct or creates a new user.
utils/: The Helper. This one has a specific job—like sending emails.
.env: The Secret Box. We keep our private keys and database passwords here so nobody else can see them.
🚀 How to start the project
Install the "Brains" (Packages):
Open your terminal and type:
code
Bash
npm install
Fill the Secret Box (.env):
Create a file named .env and put this inside:
code
Text
PORT=5000
MONGODB_URI=your_mongodb_link_here
JWTSECRETKEY=my_super_secret_key
Run the Guard:
code
Bash
npm start
(Or node server.js)
🛣️ Where can I go? (The Endpoints)
Imagine you are talking to the guard at http://localhost:5000/auth:
1. Signup (/signup)
What it does: Creates a new person.
What you give: Full Name, Email, and a Password.
What happens: The Chef "shreds" (hashes) your password so it's safe and saves you in the database.
2. Login (/login)
What it does: Lets you in.
What you give: Email and Password.
What happens: If you are real, the guard gives you a VIP Pass (JWT Token) that lasts for 1 hour.
3. Forgot Password (/forgot-password)
What it does: Sends a 6-digit code (OTP) to your email.
Why: Because you forgot your keys!
4. Reset Password (/reset-password)
What it does: Changes your old password to a new one.
What you give: The OTP code, your "Reset Token," and your New Password.
💡 Things to Remember (Don't Forget!)
Don't share your .env! It's like your house key.
Use ../ when you are inside a folder and want to talk to another folder.
Check the Terminal: If something isn't working, look at the black screen (terminal). It usually tells you why it's grumpy!
🛠️ Tools I used:
Node.js & Express: The engine and the body.
MongoDB: The big notebook where we store user info.
Bcrypt: To hide passwords (so even if a hacker sees them, they look like gibberish).
JWT: To give users a digital "I'm logged in" badge.