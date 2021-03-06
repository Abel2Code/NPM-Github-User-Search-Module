const config = require('./config');
const superagent = require('superagent');

const _fetch = (command, headers={}) => {
  headers = Object.assign(headers, config.mandatoryHeaders)
  return call = superagent.get(`${config.url}/${command}`)
    .set(headers)
    .then(response => response.text)
    .catch(error => error.response.error)
}
function getProjects(username) {
  return _fetch(`users/${username}/projects`).then((response) => {
    if(typeof response == 'string') {
      response = JSON.parse(response);
    }
    return response;
  });
}

function getProject(projectId, token) {
  return _fetch(`projects/${projectId}`, headers={'Authorization': `token ${token}`}).then((response) => {
    if(typeof response == 'string') {
      response = JSON.parse(response);
    }
    return response;
  });
}

module.exports = {
  getProjects,
  getProject
}
