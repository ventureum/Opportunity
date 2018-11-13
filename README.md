# Run on local host and development
Please follow the following steps carefully.

## Follow steps in [README.md](https://github.com/ventureum/ventureum/tree/master/v2_proto) in V2_proto
- Loom network, Listener, and Redis-server should be running before proceeding.

## Create an Telegram Bot
- [Login](https://web.telegram.org) to your Telegram account.
- Search for **BotFather**.
- Enter **/newbot** to "BotFather" to create a new Telegram bot.
- copy the name of your bot (the one ends with **_bot**)

## Change the name of Telegram bot used in React app
- open file ```./src/User/LoginComponent.jsx```
- Change the botName attribute:
```diff
  renderLoginBtn = () => {
    let { classes } = this.props
    return (
      <Grid item className={classes.loginButton} align='center'>
-        <TelegramLoginButton dataOnauth={this.handleTelegramResponse} botName='ventureum_bot' />
+        <TelegramLoginButton dataOnauth={this.handleTelegramResponse} botName=${nameOfYourBot_bot} />
      </Grid>
    )
  }
```

## Install [ngrok](https://dashboard.ngrok.com/get-started):
- After downloading the .zip file, run:
```
$ unzip /path/to/ngrok.zip
$ ./ngrok authtoken ${yourAuthToken}
```
- ${yourAuthToken} can be found at your ngrok account dashboard. 
```bash 
$ ./ngrok http 3000
```
- port 3000 is your where you run your React app
- In your terminal, you should see something like this:
```
Session Status                online
Account                       Your AccountName (Plan: Free)
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://abcdef604.ngrok.io -> localhost:3000
Forwarding                    https://abcdef604.ngrok.io -> localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              60      0       0.00    0.00    8.53    245.36
```

## Setting your Telegram Bot domain
- send ```/mybots``` to "BotFather" in [Telegram](web.telegram.org)
- Select the bot you use abve, select **'Bot Settings'**, select **'Domain'**.
- Enter the your **ngrok domain**. You can find your ngrok domain from your ngrok terminal after the word "Forawrding". In the example above, **`abcdef604.ngrok.io`** is your domain. (Discard the http:// part)

## Install dependencies
```
$ npm install
```

## Run your React app
```
$ npm run start
```
- After you React app is successfully loaded.
- In your browser, enter your ngrok domain. In the example above, you would enter: `http://abcdef604.ngrok.io`
- You should be all set by now.:tada: :tada: :tada: