const fs = require('fs')
const inquirer = require('inquirer')
const generate = require('./generatePage')
console.log(generate)

const teamList = []

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
            const engineer = {}
            engineer.type = 'Engineer'
            engineer.name = answers.name
            engineer.id = answers.id
            engineer.email = answers.email
            engineer.github = answers.github
            teamList.push(engineer) 
            if (answers.job === 'engineer') {
                return promptEngineer()
            } else if (answers.job === 'intern') {
                return promptIntern()
            } else {
                writeToFile('index.html', teamList)
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
            const intern = {}
            intern.type = 'Intern'
            intern.name = answers.name
            intern.id = answers.id
            intern.email = answers.email
            intern.school = answers.school
            teamList.push(intern) 
            console.log(answers.job)
            if (answers.job === 'engineer') {
                promptEngineer()
            } else if (answers.job === 'intern') {
                promptIntern()
            } else {
                writeToFile('index.html', teamList)
                false
            }
        })
        .catch((error) => {
            console.log(error)
        })
}


function writeToFile(fileName, data) {
    const write = generate.generatePage(data)
    console.log(write)
    fs.writeFile(fileName, write, (err) =>
    err ? console.error(err) : console.log('Successfully created HTML file!'))
}

function init() {
    return inquirer.prompt(questions)
        .then((answers) => {
            const manager = {}
            manager.type = 'Manager'
            manager.name = answers.name
            manager.id = answers.id
            manager.email = answers.email
            manager.office = answers.office
            teamList.push(manager) 
            if(answers.job === 'engineer') {
                promptEngineer()
            } else if (answers.job === 'intern') {
                promptIntern()
            } else {
                writeToFile('index.html', teamList)
            }
            
        })
        .catch((error) => {
            console.log(error) 
        })
}

init()

module.exports = {promptEngineer, promptIntern, init}