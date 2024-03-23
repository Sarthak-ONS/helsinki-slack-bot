const renderGithubRepoForDeletion = (repoList = []) => ({
  type: "modal",
  title: {
    type: "plain_text",
    text: "Delete Github Repo",
    emoji: true,
  },
  callback_id: "delete_github_repo",
  submit: {
    type: "plain_text",
    text: "Delete",
    emoji: true,
  },
  close: {
    type: "plain_text",
    text: "Cancel",
    emoji: true,
  },
  blocks: [
    {
      block_id: "username_selection",
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "user_name",
        placeholder: {
          type: "plain_text",
          text: "Github Username",
        },
      },
      label: {
        type: "plain_text",
        text: "Username",
      },
    },
    {
      type: "section",
      block_id: "repo_selection",
      text: {
        type: "mrkdwn",
        text: "Select which github repo you want to delete?",
      },
      accessory: {
        type: "static_select",
        action_id: "repo_selection",
        placeholder: {
          type: "plain_text",
          text: "Select a repo",
          emoji: true,
        },
        options: repoList,
      },
    },
  ],
});

module.exports = renderGithubRepoForDeletion;
