const fs = require('fs')
const inquirer = require('inquirer')
const generatePage = require('./generatePage')

const questions = [
    {
        type: 'input', 
        name: 'name',
        message: 'Enter a name: '
    },
    {
        type: 'input', 
        name: 'id',
        message: 'Enter an employee ID: '
    },
    {
        type: 'input', 
        name: 'email',
        message: 'Enter an email address: '
    },
    {
        type: 'input', 
        name: 'office',
        message: 'Enter an office number: '
    },
    {
        type: 'list', 
        name: 'job',
        message: 'Who would you like to add? ',
        choices: ['Engineer', 'Intern', 'Finish building my team'],
        filter(val) {
            return val.toLowerCase()
        }
    }

]

const engineerQuestions = [
    {
        type: 'input', 
        name: 'name',
        message: 'Enter the name of the engineer: '
    },
    {
        type: 'input', 
        name: 'id',
        message: 'Enter their ID: '
    },
    {
        type: 'input', 
        name: 'email',
        message: 'Enter their email: '
    },
    {
        type: 'input', 
        name: 'github',
        message: 'Enter their Github username: '
    },
    {
        type: 'list', 
        name: 'job',
        message: 'Who would you like to add? ',
        choices: ['Engineer', 'Intern', 'Finish building my team'],
        filter(val) {
            return val.toLowerCase()
        }
    }
]

const internQuestions = [
    {
        type: 'input', 
        name: 'name',
        message: 'Enter the name of the intern: '
    },
    {
        type: 'input', 
        name: 'id',
        message: 'Enter their ID: '
    },
    {
        type: 'input', 
        name: 'email',
        message: 'Enter their email: '
    },
    {
        type: 'input', 
        name: 'school',
        message: 'Enter their school name: '
    },
    {
        type: 'list', 
        name: 'job',
        message: 'Who would you like to add? ',
        choices: ['Engineer', 'Intern', 'Finish building my team'],
        filter(val) {
            return val.toLowerCase()
        }
    }
]

function promptEngineer() {
    return inquirer.prompt(engineerQuestions)
        .then((answers) => {
            if (answers.job === 'engineer') {
                return promptEngineer()
            } else if (answers.job === 'intern') {
                return promptIntern()
            } else {
                false
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

function promptIntern() {
    return inquirer.prompt(internQuestions)
        .then((answers) => {
            console.log(answers.job)
            if (answers.job === 'engineer') {
                promptEngineer()
            } else if (answers.job === 'intern') {
                promptIntern()
            } else {
                false
            }
        })
        .catch((error) => {
            console.log(error)
        })
}


function writeToFile(fileName, data) {
    const write = generatePage.generatePage(data)

    fs.writeFile(fileName, write, (err) =>
    err ? console.error(err) : console.log('Successfully created HTML file!'))
}

function init() {
    return inquirer.prompt(questions)
        .then((answers) => {
            if(answers.job === 'engineer') {
                promptEngineer()
            } else if (answers.job === 'intern') {
                promptIntern()
            } else {
                writeToFile('index.html', answers)
            }
            
        })
        .catch((error) => {
            console.log(error) 
        })
}

init()