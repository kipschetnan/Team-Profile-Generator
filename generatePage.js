function generatePage(data) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>Team Profile</title>
    </head>
    <body>
        <header>
            My Team
        </header>

        <div class="container">
        ${team(data)}
        </div>

    </body>
    </html>`
}

function team(data) {
    let create = ''
    for(let i = 0; i < data.length; i++) {
        if(data[i].type == 'Engineer') {
            create += '\n<section>\n<div>' + data[i].name + '</div>\n' + '<div>' + data[i].type + '</div>\n' + '<div>ID: ' + data[i].id + '</div>\n' + '<div>Email: ' + data[i].email + '</div>\n' + '<div>GitHub: ' + data[i].github + '</div>\n</section>\n'
        } else if (data[i].type == 'Intern'){
            create += '\n<section>\n<div>' + data[i].name + '</div>\n' + '<div>' + data[i].type + '</div>\n' + '<div>ID: ' + data[i].id + '</div>\n' + '<div>Email: ' + data[i].email + '</div>\n' + '<div>School: ' + data[i].school + '</div>\n</section>\n'
        } else if (data[i].type == 'Manager'){
            create += '\n<section>\n<div>' + data[i].name + '</div>\n' + '<div>' + data[i].type + '</div>\n' + '<div>ID: ' + data[i].id + '</div>\n' + '<div>Email: ' + data[i].email + '</div>\n' + '<div>Office number: ' + data[i].office + '</div>\n</section>\n'
        }
        
    }
    create += '</div>'

    return create
}

module.exports = {generatePage, team};