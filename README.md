Relsem Bridge Manager
======================

Relsem bridge frontend web application

## About relsem bridge

[Project website](http://www.fer.unizg.hr/rasip/dsd/projects/relsem_bridge)

RelSem Bridge allows to use relational databases tools to access semantic data from multiple heterogenous data sources. Bridge provides a relational adapter to semantic data. Through its administration panel it enables viewing the data available in multiple semantic endpoints (DBPedia) and construction of relational schema from available data. Bridge implements PostgreSQL database protocol which in return enables users to connect to bridge using Postgres JDBC type 4 protocol and query semantic data sources utilizing existing relational tools.

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
