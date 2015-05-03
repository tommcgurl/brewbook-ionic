#Brew Book Ionic 
This is the first repo in a series of experiments I've been working on. The plan is to implement a craft beer cataloging app that I've decided to call, __Brew Book__, in the different popular front-end javascript frameworks (React, Angular, Ember, ect.) - [Tom McGurl](@https://twitter.com/tom_mcgurl)

This is my version of the popular [TodoMVC](http://todomvc.com/), which is the inspiration for this project. I wanted to create a [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) app with some asynchronus data requests that would be close to something you would implement in a real world application.

This verision of the app is implemented with 

- [Ionic](http://ionicframework.com/): an SDK that uses [Angular](https://angularjs.org/) for developing hybrid mobile apps. 
- [Firebase](https://www.firebase.com/) as the a backend with [AngularFire](https://www.firebase.com/docs/web/libraries/angular/). 
- [ng-Cordova](http://ngcordova.com/) for any hardware interactions such as the camera.


####The App
The App containts the basic CRUD functionality with regards to beers. The user should be able to

- Log a beer into the app, which includes
    + A picture (either by taking a photo or picking one from your photo gallery)
    + A description
    + A Rating
    + A Name
    + The Brewery that makes the beer
    + The Style (IPA, stout, saison, pilsner ...)
    + Other brew related information like ([IBU](http://beer.about.com/od/glossary/g/ibudefined.htm) and [ABV](http://en.wikipedia.org/wiki/Alcohol_by_volume))
- View a list of your logged beers
    + Sorted by brewery
    + Sorted alphabetically (all brews view)
-  Edit a beer entry
-  Remove a beer entry

__*More may be added to this list later on__

####Firebase Setup
1. Since we will be using [Firebase](https://www.firebase.com/) as a backend for this application. We will need to [sign up for a free Hacker Plan](https://www.firebase.com/signup/)

    ![sign up](./READMEImages/fbsignup.png?raw=true )

2. Next you should create a new app. Name it whatever you like.

    ![create app](./READMEImages/createapp.png?raw=true)

3. Select "Manage App" from your dashboard.

4. Select "Import Data" in the top right corner.

    ![import data](./READMEImages/importdata.png?raw=true )

5. Import the __brews.json__ included in this repo.

    You will now have a working firebase! The data should look something like this...
    
        ![data](./READMEImages/data.png?raw=true )

6. Make sure everything was properly imported by visiting 
https://<your app name here>.firebaseio.com/brews.json
    - You should see a json object with keys representing a brewery name where each breweries value is an array of objects reprenting a beer.

####Setup Ionic and Generate Starter Template

1. Follow the [instructions for installing ionic](http://ionicframework.com/getting-started/)

2. Once installed run the command
    ```
    $ ionic start brewbook tabs
    ```

    This generates out a starter app that we will modify and build off of.

3. Run the below command from the 'brewbook' directory you just created to test if everything is working
    ```
    ionic serve --lab
    ```

    You should see the following. Click around and explore.
    
    ![folder structure](./READMEImages/lab.png?raw=true )

Alright! Now we can start modifying this and building out Brewbook!

####Style Guide Changes
While the code that Ionic generates is an awesome starting point, I like to follow a style guide for Angular. This helps keep the code clean and more readable for others.

For this app I will be following [John Papa's](https://github.com/johnpapa) [ Angular Style Guide](https://github.com/johnpapa/angular-styleguide).

We will also be strucutring our project a by component instead of by file type.

For example, the brewsTab component will be in a folder like this
    ```
    BrewsTab 
       |__ brews.controller.js
       |__ brews.template.js
    ```

Feel free to skip these commits since they are just changing around the generated code to follow the style guide best practices.

__A.1__: Single Responsibility (rule of 1)
Here we will move all of the generated components and services to their own files. We will keep all the routes in app.js though since it's nice to have them all in one place.

* Created a _layout_ folder where each of our different views and their controllers will go.
* Split up all the controllers and put them in their corresponding _layout_ folder
* Moved the _Chats_ service to a _services_ folder and renamed it to _ChatService_
* Removed the postfix 'Ctrl' from all of the controllers since they are now indicated with a _.conroller.js_ file extention and they are alreaady with their corresponding view
* Wrapped all of the controllers and services in an [IIFE](https://github.com/johnpapa/angular-styleguide#iife)
* The new folder structure looks like this

    ![folder structure](./READMEImages/folderStructure1.png?raw=true )

####Gulp Inject
Next up I'm going to be adding the awesome [Gulp Inject](https://www.npmjs.com/package/gulp-inject) by [Joakim Carlstein](https://twitter.com/joakimbeng) to the project. 

Gulp Inject will automatically inject the javascript files we add to the project so that we don't have to remember to add it to change our index.html everytime we add a file to the project.

[Björn Holdt](https://twitter.com/bholdt) has some great [instructions](http://bjornholdt.me/gulp-inject-and-ionic/) on adding Gulp-inject so that it works with the 
```
ionic serve
```
command. I Followed with some minor adjustments. See the below steps and their corresponding commits.

__NOTE:__ I had to upgrade my node and npm version to get gulp to work. I did it using npm with the following commands
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

```

__B.1__ Install Gulp-inject. Add the _index_ task to our gulp file. 

- First run 
```
npm install
```
This will install all of node dependencies used by gulp.

- We will be injecting all the js files in the _www_ folder except the js files in _www/lib_ since they are already bundled with ionic.
    + you can test that the task works by running 
    ```
    gulp index
    ```
    You should see your files now injected into index.html
    
    ![injected files](./READMEImages/injected.png?raw=true )

B.2 Add the _index_ task to gulp's watch task and ionic's serve task

- First we add a reference to the files we will be watching
- Next we add that path to the watch task
- Lastly, add the _gulpStartupTasks_ propery to _ionic.project_

####SASS
The last part of our setup before beginning will be to configure ionic to use [SASS](http://sass-lang.com/)

Ionic makes it super easy to use their SASS stylesheets instead of the default css.

__C.1__ Follow the instructions in index.html to use ionic's SASS generated css sheet.

__C.2__ Change the _ionic.project_ file's _gulpStartupTasks_ property to include the _sass task_




