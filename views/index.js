const CreateGithubRepoView = require("./createGithubRepository.json");
const AppHomeView = require("./appHome.json");
const GetGithubTokenView = require("./getGithubToken.json");
const { renderErrorview, renderSuccessView } = require("./getDynamicViews");

module.exports = {
  CreateGithubRepoView,
  AppHomeView,
  GetGithubTokenView,
  renderErrorview,
  renderSuccessView,
};
