const { App } = require("@slack/bolt");
const { AppHomeView } = require("./views");

const { SIGNING_SECRET, OAUTH_BOT_TOKEN } = process.env;

const slackApp = new App({
  signingSecret: SIGNING_SECRET,
  token: OAUTH_BOT_TOKEN,
  ignoreSelf: false,
});

slackApp.message(async ({ message, say }) => {
  console.log("Message received:::::: ", message);
});

slackApp.command("/ec2", async ({ command, ack, say }) => {
  await ack();
  await say(`Please wait while we work our magic::: ${command.text}`);
});

slackApp.event("app_home_opened", async ({ event, client }) => {
  await client.views.publish({
    user_id: event.user,
    view: AppHomeView,
  });
});

slackApp.action("add_token_to_db", async ({ ack, body, client }) => {
  await ack();
  const user = body.user.id;

  console.log({ user });
});

slackApp.error((error) => {
  console.error(error.data);
});

module.exports = slackApp;
