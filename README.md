Relsem Bridge Manager
======================

Relsem bridge frontend web application

## Instructions for running the application

To start the development you need:

- node.js installed on your system
- ruby and rbenv, sass and compass gem
- run `npm install` in the root folder to install all node modules
- run `grunt` to start the server (localhost:8000) and other live tasks

## Grunt tasks:

### `grunt`
Runs the server, js hinter, sass converter. Next tasks are performed:

- jshint
- sass
- connect
- watch

### `grunt release`
Creates a release version of the app. Next tasks are perfomed:

- jshint
- clean
- jst 
- requirejs 
- concat
- uglify
- sass
- cssmin
- copy


### `grunt zip`
Creates a release compressed version of the app. The zip archive can be found in the deploy folder.

- release
- zip

### `grunt ftpdeploy`
Creates a release version of the app and uploads it to the ftp server. See the configuration in the Gruntfile.js.
To use ftpdeploy you need to create .ftppass (file with authentication parameters) in project root directory and put the next content in it:

> {
>   "ftp_authentication": {
>    "username": "your_username",
>    "password": "your_password"
>   }
> }

The .ftppass file is not included in the git repository.

- release
- ftp-deploy

### `grunt ftpdeployonly`
Uploads current release to the ftp server.