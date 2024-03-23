const { Octokit } = require("@octokit/rest");

const deleteGithubRepository = async ({ name, token, owner }) => {
  try {
    const octokit = new Octokit({
      auth: token,
      request: {
        fetch: require("cross-fetch"),
      },
    });

    const res = await octokit.repos.delete({
      repo: name,
      owner,
    });

    return res.status;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = deleteGithubRepository;
