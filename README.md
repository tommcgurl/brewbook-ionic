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

####The Data
- The data for this app is an object where each key is the name of a brewery.
    
    ![breweries](./READMEImages/breweries.png?raw=true )

- The value for each key is an array of individual _brew_ objects.

    ![brews](./READMEImages/brews.png?raw=true )


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

Finally! Our setup is done. Now let's get to the beer!

####BrewService
Okay we are going to add a service to handle fetching our brews from firebase. See the below steps and their corresponding commits.

1. Add the firebase and angularfire dependencies
    
    + We will want to actually download these files rather than use the CDN
        * This is because we want the app to load even if we are offline since all the front-end dependencies are contained in the _www_ folder, then so should these files. We can add them to the lib folder.
        * Since the lib folder is ignored by the Gulp _index_ task, we must manually add them to index.html

2. Now we can create our BrewService factory to pull the data from our Firebase.

    + First we will inject two modules, $firebaseObject, and $q
        * [$firbaseObject](https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject) is a service used for pulling our brews from Firebase 
        * [$q](https://docs.angularjs.org/api/ng/service/$q) is the promise libary for angular based off of [Kris Kowal](https://twitter.com/kriskowal)'s popular [q library](https://github.com/kriskowal/q).
            - [Dave Smith](https://twitter.com/djsmith42)'s video [The Power of $q](https://www.youtube.com/watch?v=33kl0iQByME) is a greate explanation of the $q library and it's usefullness.
    + Next we will create our service object.
        * For now it will only have one function _getAll_.
        * The value for _getAll_ will be a private function *_getBrews*
    + *_getBrews* will use our firebase url to make a reference, and the an actual request using $firebaseObject.
    + The firebase object has a property called _$loaded_ which returns a promise. 
        * We will first store this in our singleton factory, then return it to the caller.
        * By storing the promise in our factory, we can return it later to anyone else who makes a request.
        * Once the promise is resolved, it stays resolved. So, if another request comes into the service, we simply return the promise.
            - If the promise is still not resolved, all the callers will be notified as soon as it resolves
            - If it has resolved, then the caller will instantly get the data back from the promise (meaning their .then or .done function will instantly be called)
        * This makes it super convienient!

####Brews Tab
Create a tab for viewing all brews
    - Now that our service is set up, we can create a view for our brews. This view will show a thumbnail image, the brew's name, and the name of the brewery that makes it.
    - Since this list may get rather long we will take advantage of ionic's [collection-repeat directive](http://blog.ionic.io/collection-repeat-iteration-two/)

1. collection-repeat only takes an array as input. Since the brews object returned from firebase is an object that is hashed on the brewery names, we will need to create an array of all the brews to pass to the collection-repeat directive.
    - First we create a *_getAllBrews*  utility function.
        + This function takes in the brews object as it's parameter
        + It uses the $firebaseObjects _forEach_ function to look over the objects values, which in this case are the brewery keys
        + We then store this array in our factory in case we need to pull it again
    - Next, we create a function *getBrewList* that will first call *_getBrews* to request the data, then pass that data to our new *_getAllBrews* function
        + This new function will return a promise that it will resolve once we have the array of brews
        + We will use the $q library for this
    - We then expose this new function on the factory for consumers to call

2. Now we can create a controller and template for our new view
    - First we'll add an _allBrews_ folder to our _layout_ folder that will hold our _allBrews.controller.js_ and _allBrews.template.html_
    - The controller should have the array of brews on it's scope
    - We will be using the [_controllerAs_](https://github.com/johnpapa/angular-styleguide#controlleras-with-vm) syntax
    - So we will create a property, vm.brews
    - We will inject our newly created _BrewService_
    - In our activate function we will call BrewService.getBrewList and set vm.brews to the response.
    - The Template will use the [collection-repeat directive](http://blog.ionic.io/collection-repeat-iteration-two/) mentioned above to create a list item for every brew
    - The template should contain an _ion-view_, and an _ion-content_ element.
    - Inside the _ion-content_ we will render an _ion-list_ of _ion-items_
    - In each ion-item we will put the details of the brew
    - An [_ion-spinner_](http://ionicframework.com/docs/api/directive/ionSpinner/) element will be added so that we can display a spinner while the data is being fetched.

3. Now we have to modify the _tabs.template.html_ and _app.js_
    - We can change the tab-dash to tab-brews
        + Since we no longer need that generated tab we can remove the _layout/dashTab_ folder
    - We can change the icon for the brews tab to the _pint_ icon provided by ionicons!
    - Next we have to add the route for our new view to app.js
        + We will put this view at the '/brews' route
        + We must also specify that we are using the controllerAs syntax in the route's _controller_ property
        ```
        controller: 'Brews as vm'
        ```

Great! We now have a list of brews displayed!

####Breweries Tab
Create a tab for viewing all the breweries
- Now we will create another tab for viewing all the breweries
    + For now we will just show the names, but we can change that later.

1. Add a function to our _BrewService_ to return the list of breweries.
    - The data is already hashed on the brewery.
    - We already have a function that get's this object.
    - We will add a function to our service that grabs the formatted Brewery Name. 
        + In this case, each brew object contains that formated name so we can use that.
    - We will expose this function on our factory as _getBreweryList_

        




