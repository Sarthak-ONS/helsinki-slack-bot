const { Octokit } = require("@octokit/rest");

const getUserGithubRepository = async ({ token }) => {
  try {
    const octokit = new Octokit({
      auth: token,
      request: {
        fetch: require("cross-fetch"),
      },
    });

    const { data: repos } = await octokit.repos.listForAuthenticatedUser({});

    return repos.map((repo) => {
      return {
        text: {
          type: "plain_text",
          text: repo.name,
        },
        value: repo.name,
      };
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getUserGithubRepository;
