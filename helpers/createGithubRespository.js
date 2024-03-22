const { Octokit } = require("@octokit/rest");

const createGithubRepository = async ({
  name,
  description,
  private,
  token,
}) => {
  try {
    const octokit = new Octokit({
      auth: token,
      request: {
        fetch: require("cross-fetch"),
      },
    });

    const res = await octokit.repos.createForAuthenticatedUser({
      name,
      description,
      private,
      auto_init: true,
    });

    return res.data.html_url;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = createGithubRepository;
