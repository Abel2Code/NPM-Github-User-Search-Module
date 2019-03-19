const
  github_project_search = require('github-project-search')
  inquirer = require('inquirer')

async function projects(username, token=null) {
  const response = await github_project_search.getProjects(username)
    // If we get a valid response
    if(response.constructor === Array) {
      const projects = response;
      const selection = await selectProject(projects);
      project(selection.Project, token);

    // If we do not get a valid response
    } else {
      const error = JSON.parse(response.text).message;
      if(error == 'Not Found') {
        console.log('ERROR: Invalid Username.');
      } else {
        console.log(`ERROR: ${error}`);
      }
    }
}

function selectProject(projects) {
  const choices = projects.map(project => {
    return {name: `${project.name} - id: ${project.id}`, value: project.id}
  });
  return inquirer.prompt([{
      type: 'list',
      message: 'select a project to view',
      name: 'Project',
      choices: choices,
  }]);
}

async function project(projectId, token=null) {
  if(token == '' || token == null) {
      const tokenRequest = await requestToken();
      token = tokenRequest.token;
  }

  const response = await github_project_search.getProject(projectId, token)
  if(response.text == null){
    const project = response;
    const out = `You Selected:
    ${project.name}${project.body ? `\n\tDescribed as ${project.body}` : ''}
    \tAccess at ${project.url}
    \tCreated by ${project.creator.login}
    \tCreated on ${new Date(project.created_at)}`;

    console.log(out);
  } else if(typeof response == 'object'){
    const error = JSON.parse(response.text).message;
    console.log(`ERROR: ${error}`)

  } else {
    console.log("ERROR: Please try again later.");
  }
}
function requestToken() {
  return inquirer.prompt([{
      type: 'password',
      message: 'Please enter your Github Access Token with admin repository rights',
      name: 'token',
  }]);

}


module.exports = {
      project,
      projects
  }
