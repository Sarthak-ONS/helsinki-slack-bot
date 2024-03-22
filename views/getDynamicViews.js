exports.renderSuccessView = (message = "Your operation was successful.") => ({
  type: "modal",
  title: {
    type: "plain_text",
    text: "Success",
  },
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:white_check_mark: *Success!* \n\n ${message}`,
      },
    },
  ],
  close: {
    type: "plain_text",
    text: "Close",
  },
});

exports.renderErrorview = (failureMessage = "Something Went Wrong!") => ({
  type: "modal",
  title: {
    type: "plain_text",
    text: "Error",
  },
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:x: *Oops, ${failureMessage}*`,
      },
    },
  ],
  close: {
    type: "plain_text",
    text: "Close",
  },
});
