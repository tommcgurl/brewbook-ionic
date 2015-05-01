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
    ![lab](./READMEImages/ioniclab.png?raw=true )

Alright! Now we can start modifying this and building out Brewbook!
