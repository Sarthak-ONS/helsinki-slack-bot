const { App } = require("@slack/bolt");
const {
  AppHomeView,
  GetGithubTokenView,
  renderSuccessView,
  CreateGithubRepoView,
  renderErrorview,
} = require("./views");
const getFormattedCreateRepoModalValues = require("./utils/getFormattedCreateRepoModalValues");
const { createGithubRespository } = require("./helpers");

const { SIGNING_SECRET, OAUTH_BOT_TOKEN } = process.env;

const slackApp = new App({
  signingSecret: SIGNING_SECRET,
  token: OAUTH_BOT_TOKEN,
  ignoreSelf: false,
});

slackApp.command("/gitcreate", async ({ command, ack, say, client, body }) => {
  await ack();

  await client.views.open({
    trigger_id: body.trigger_id,
    view: CreateGithubRepoView,
  });
});

// Render the App Home View on App Home
slackApp.event("app_home_opened", async ({ event, client }) => {
  await client.views.publish({
    user_id: event.user,
    view: AppHomeView,
  });
});

// Render the GetGithubRepoToken View on App Home when the user clicks the button
slackApp.action("add_token_to_db", async ({ ack, body, client }) => {
  await ack();

  await client.views.open({
    trigger_id: body.trigger_id,
    view: GetGithubTokenView,
  });
});

// Triggers when user submits the form to add a Github token
slackApp.view("add_github_token", async ({ ack, view, client, body }) => {
  await ack();

  const successView = renderSuccessView("Github Token Added Successfully!");

  await client.views.open({
    trigger_id: body.trigger_id,
    view: successView,
  });
});

// Triggers when user submits the form to create a Github Repository
slackApp.view("create_github_repo", async ({ ack, view, client, body }) => {
  await ack();

  const values = getFormattedCreateRepoModalValues(view.state.values);

  createGithubRespository({
    ...values,
    token: process.env.GITHUB_TOKEN,
  })
    .then(async (res) => {
      const successView = renderSuccessView(
        `Github Repository Created Successfully! \n ${res}`
      );

      await client.views.open({
        trigger_id: body.trigger_id,
        view: successView,
      });
    })
    .catch(async (err) => {
      const failureView = renderErrorview(
        `Failed to create Github Repository \n ${err.message}`
      );

      await client.views.open({
        trigger_id: body.trigger_id,
        view: failureView,
      });
    });
});

slackApp.error((error) => {
  console.error(error);
});

module.exports = slackApp;
