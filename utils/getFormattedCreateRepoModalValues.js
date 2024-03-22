const getFormattedCreateRepoModalValues = (rawData) => {
  const data = Object.values(rawData);

  let formattedData = {};

  formattedData.name = data[0].repo_name.value;
  formattedData.description = data[1].repo_description.value;
  formattedData.private = data[2].repo_type.selected_option.value === "private";

  return formattedData;
};

module.exports = getFormattedCreateRepoModalValues;
