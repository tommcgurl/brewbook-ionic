#Brew Book Ionic 
This is the first repo in a series of experiments I've been working on. The plan is to implement a craft beer cataloging app that I've decided to call, __Brew Book__, in the different popular front-end javascript frameworks (React, Angular, Ember, ect.) - [Tom McGurl](@https://twitter.com/tom_mcgurl)

This is my version of the popular [TodoMVC](http://todomvc.com/), which is the inspiration for this project. I wanted to create a [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) app with some asynchronus data requests that would be close to something you would implement in a real world application.

This verision of the app is implemented with 

- [Ionic](http://ionicframework.com/): an SDK that uses [Angular](https://angularjs.org/) for developing hybrid mobile apps. 
- [Firebase](https://www.firebase.com/) as the a backend with [AngularFire](https://www.firebase.com/docs/web/libraries/angular/). 
- [ng-Cordova](http://ngcordova.com/) for any hardware interactions such as the camera.

####Note
I use [Genymotion](https://www.genymotion.com/#!/) to test on android as apposed to the regular android emulator. It's fast to boot up, and super easy to use. You can have the emulated device use your computer's camera as it's own.


####The App
The App contains the basic CRUD functionality with regards to beers. The user should be able to

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
    - The template will display all of the detials of our current brew. we can use an ng-if directive on values that may not be present, so that we don't show useless labels.

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
       |__ brews.template
          - The template will display all of the detials of our current brew. we can use an ng-if directive on values that may not be present, so that we don't show useless labels.
    .js
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

2. Now we can create a controller and template
    - The template will display all of the detials of our current brew. we can use an ng-if directive on values that may not be present, so that we don't show useless labels. for our new view
    - First we'll add an _allBrews_ folder to our _layout_ folder that will hold our _allBrews.controller.js_ and _allBrews.template
        - The template will display all of the detials of our current brew. we can use an ng-if directive on values that may not be present, so that we don't show useless labels.
  .html_
    - The controller should have the array of brews on it's scope
    - We will be using the [_controllerAs_](https://github.com/johnpapa/angular-styleguide#controlleras-with-vm) syntax
    - So we will create a property, vm.brews
    - We will inject our newly created _BrewService_
    - In our activate function we will call BrewService.getBrewList and set vm.brews to the response.
    - The Template
        - The template will display all of the detials of our current brew. we can use an ng-if directive on values that may not be present, so that we don't show useless labels.
   will use the [collection-repeat directive](http://blog.ionic.io/collection-repeat-iteration-two/) mentioned above to create a list item for every brew
    - The template
        - The template will display all of the detials of our current brew. we can use an ng-if directive on values that may not be present, so that we don't show useless labels.
   should contain an _ion-view_, and an _ion-content_ element.
    - Inside the _ion-content_ we will render an _ion-list_ of _ion-items_
    - In each ion-item we will put the details of the brew
    - An [_ion-spinner_](http://ionicframework.com/docs/api/directive/ionSpinner/) element will be added so that we can display a spinner while the data is being fetched.

3. Now we have to modify the _tabs.template
    - The template will display all of the detials of our current brew. we can use an ng-if directive on values that may not be present, so that we don't show useless labels..html_ and _app.js_
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

2. Create a controller and template
    - The template will display all of the detials of our current brew. we can use an ng-if directive on values that may not be present, so that we don't show useless labels. 
    - First we create a new folder _layout/breweries_
    - Then create new files for the controller and template
        - The template will display all of the detials of our current brew. we can use an ng-if directive on values that may not be present, so that we don't show useless labels.
  
    - The controller
        + should contain a breweries object on it's scope
        + It will call an _activate_ function which will use our new service to get the list of breweries
    - The template
        + Will loop over the brewery list using the collection-repeate directive
        + Each ionic item simply shows the brewery name for now

3. Create a new route and tab for the _breweries_ view
    - Add a route for our new view in app.js
    - Change the tabs to point to the new view and change the brewery tabs icon.

####Brews By Brewery
Create a view of all the beers made by a particular brewery when you click it.

Now that we have the breweries view, we can filter the individual brews by the brewery they belong to. So when you click a particular brewery in the list you will be taken to the list of that breweries beer. 

Since we already made a view of brews in our [brews tab](#brews-tab) section, this would be the perfect time to move that view into a re-usable directive!

1. Move the brews list to a custom directive.
    - We can start by making a directives folder
        + Inside we will make a brewList.js and brewList.html
    - We will call the directive *bbBrewList* as in _Brew Book Brew List_ .
        + It's a good idea to namespace custom directives. 
        + All of the built in directives are namespaced with _ng_. Creating our own namespace helps to prevent nameing collisions and tells anyone who's looking at the code that the directive is custom.
    - Directives are automatically converted from camelCase to dash seperated words, sometimes called _spine-case_ or _train-case_.
        + Whatever it's called, it looks like this
        ```
        bbBrewList -----> bb-brew-list
        ```
    - We also have to pass our directive the brews that it will be showing.
        + We will pass the brews using the directive's _isolate scope_
        ```javascript
        var directive = {
          scope: {   // Isolate scope
            brews: '='
          },
          templateUrl: '/directives/brewList/brewList.html',
          restrict: 'E'
        };
        ```
        + The _'='_ allows us to pass in a bound object, in this case our brews array.
    - The _restrict: 'E'_ indicates that this directive will be an actual element
        + It's always best practice to use an element or an attribnute for your custom directives. 
        + In this case an element makes sense
    - The template will just be the ion-list from the allBrews.template.html with some slight modifications since we won't be using the Brews controller.

2. Use the BrewList directive to display brews
    - First we will replace the ion-list in the allBrews template.
    - Then we will create a similar template for our breweries brew list.
        + We will change the title to be the current brewery of the beers we are viewing in the list.
        + This file is titled brewsByBrewery.template.html

3. Add a route to the brewsByBrewery layout
    - The name of the brewery we select will be appended to the route
        + For example:
        ```
        #/tab/breweries/sixpoint
        ```
    - To acheive this we simple add an href to each ion-item in the breweries list.
        + this href will pass the brewery name
        + we will use the  brewery name from our brew object property keys so that our url a bit clearer
        + to get the key from the full brewery name we use a filter
    - We can create our own Angular filter that will remove the whitespace and convert the full brewery name to a brewery key for our brews object.
    - Now that each list item invokes a brewery specific route, we need to add that route to our app.js.

4. Create a brewsByBrewery controller
    - The controller just needs a list of the beers for the given brewery.
    - We can pull the brewery key from our URL since we passed it.
        + We will do this using UIRouter's $stateParams module
    - We will then call a function on the brewService that will return the brews for that brewery.

####Brew Detail
When we select a brew from one of our lists it should show us the details

1. Add a service that will return a single brew given the brewery and it's name.
    - Added a service to BrewService.js that uses a simpel array filter to pull out the proper brew from the breweries array.

2. Add a route and the controller
    - Create a brewDetail folder in the layout directory. 
      + put our new controller and template in here.
    - We can add a route to app.js that will contain two url parameters
      + brewery and brewName
    - Alter the brew list so that each item, when selected, routes to the detail view
      + We simply add an ng-href to the ion-items in brewList.html
      + We pass the brewery and brewName as the url parameters.
    - For the controller:
      + we simply pull the brewery and the brewName from the $stateParams module.
      + Then we invoke our new service function to get the details for the current selected beer.

3. Make the brewDetail template
    - The template will display all of the details of our current brew. we can use an ng-if directive on values that may not be present, so that we don't show useless labels.

4. Make the brewDetail work for both the *brews* and *breweries* tab
    - We can use the brewDetail layout to display the details of our beers from our _brewsByBrewery_ layout
    - We just have to make a new route
        - This route will be a child of the *tab.brews-by-brewery* and will use the *tab.breweries*
    - We will have to make sure that our _brewList_ directive (that we are also re-using by these two views) knows which route to direct to when selected.
        - We added an ng-href in step 2 above.
        - We will need to alter this ng-href to route properly.
        - The brewList will have to know which tab it is being displayed in
        - We can do this by adding another property to the brewList's isolate scope.
        - It will use this new *tab* property to direct the ng-href to the proper route.
    - We can pass this tab property to our brewList directive from our *allBrews* and *brewsByBrewery* layouts.

#### Add a brew
So far we can view brews, breweries, and individual details, but none of this is any good if we can't catalog the delicious new beers we try! 

Now we are on to another fun part. We are going to make the form for adding a new brew. I'm going to break this section up a bit since it's a more complex.

We will finally get to do some work with ngCordova!! That means some hardware integration! We will be using ngCordova to access our mobile device's camera and photo album so that we can add a picture of our nice new brew.

1. Add an 'Add' button to the nav bar to navigate to this new layout we will be creating.
  - It will direct to a new route (#/addBrew) using the *ng-href* directive
  - We can add it to the layouts that make sense, in this case:
    + allBrews
    + breweries
    + brewsByBrewery

2. Create the basic layout and controller files for our new route
  - The template will contain some placeholder input fields and a save button for now
  - The controller will simply have some logic to close the view for now.
    + We will use ionics **$ionicHistory** module to handle closing the view and taking us back to the previous view.

3. Next we can add a route for our new view
  - Since this route exists outside of our tab interface ( it doesn't belong to either the brew or breweries tab) we should make an entirely seperate state for it.
  - In other words it should not be a child of the 'tab' state
  - Add links to this new rote from our 'Add' button

4. Create a style service for the 'style' select input
  - We will create a simple service that returns an array of style options
  - The last item in the array is 'other', which we will later use to indicate that the user would like to enter a different style

5. Create a directive for the 'select menu'
  - One type of input I feel never works well on mobile is the **select** dropdown.
  - I prefer to use a **side-menu** instead of a dropdown
    + The idea is that when a use clicks on the style or brewery input, a side menu appears with their options instead of a dropdown menu.
    + The user experience is nice and capitalizes on the screen realestate of a mobile device.
  - Since we will be using this sort of menu for both our brewery and style selections (and any other future select inputs) this is a perfect candidate for a custom directive.
  - The directive's isolate scope will consist of 4 things
    + **title**
      - The menu title e.g. *Select a Brewery*
    + **side**
      - The side of the screen our *side-menu* will appear from (left or right).
    + **select**
      - an onclick function to handle the selection of an option
    + **options**
      - The options for the select menu
  - Passing a function to a directive is rather complex. For a good explanation check out [Dan Whalin's awesome post on this topic ](http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-3-isolate-scope-and-function-parameters)
  - We have to do some manipulation in the *compile* function of our directive
    + Here we must set the *side* attribute of our menu, to the *side* property passed to this directive.

6. Add the ABV and IBU input fields
  - We are going to add some basic input fields for ABV and IBU, we will allign them next to eachother.
  - Later when we add validation to this form, we will ensure that these values are numbers

#### Image Picker
We need a way to add an image to our newly entered brew. We can make an image picker directive.

1. First we need to add the **[ngCordova camera plugin](http://ngcordova.com/docs/plugins/camera/)** to our ionic app.

2. Create an **ImageService** that will use the **$cordovaCamera** module to access our device's photo library
  - Later we can improve this and allow the user to take a photo as well.
  - For now we will simply set some image options. 
  - Then we are going to return a promise to the caller.  
    + This promise will resolve once we have recieved the imageData.
  - The only function we are exposing is the *getPic* function

3. Create the **Image Picker** directive controller and template. 
  - This directive will let you add an image, remove it, and change it.
  - It will use the new **ImageSerice** we made in the previous step.
  - Once an image is added, it will be displayed.
    + It will have a badge in the top right that will allow you to remove the image.
    + Clicking the image again will allow you to change to a different image.
  - The image service lets us specify that we want square images.
    + While I prefer not to force the user to crop the image, I think square images will make for a more uniform UX
  - We will show some confirmation popups to the user before they remove or change an image.
  - Then simply add the ImagePicker to the **AddBrew** Layout.

4. Modify the **Image Picker** to accept a brew object as an isolate scope
  - By passing in the brew object from our **AddBrew** layout's scope, we can attach the selected image to the brew object.
  - We will also modify our Addbrew to properly pass the brew object, and add some ng-model attributes to our inputs so that they are two-way bound to our new brew object.

#### Save Brew
Now we want to be able to save our beer to our firebase database.

1. Add a save function to our BrewService.
  - we simply use the angularfire object's **$save** function

2. Create a save function in the **AddBrew** layout to pass the user's input to our **BrewService**

3. Make sure all of the view's contain the latest firebase data after saving
 - By default Ionic will cache a view's controller.
   + This is a good thing, but for our scenario we want to make sure we update our current view with the latest brews, especially if we just added one
 - We can do this by adding a watch on a lifecycle event of the view
   ```
   $scope.$on('$ionicView.beforeEnter', activate);
   ```
 - We simply call *activate* again, which triggers a data fetch from our **BrewService**

#### Optional Style and Brewery
We should allow the user to enter their own style, as well as enter new breweries when cataloging a beer. We will add an *Other* option to both of the select menus. When *Other* is selected, the input field focuses and allows for user input.

1. Handle user selection of the *Other* select option.
  - If the user selects *Other* we can programatically focus in on that input field and allow them to edit it.
  - We will have to makesure we set it's readonly attributes properly so that the user can edit, then when they are done, we set it back to readonly.

2. Make keyboard popup when *Other* is selected
  - To provide a better user experience we can add the [cordova ionic keyboard plugin2](https://github.com/driftyco/ionic-plugin-keyboard)
  - This plugin will allow us to open the native keyboard when the input field is focused.
  - Simply run
    ```
    cordova plugin add com.ionic.keyboard
    ```
    in the terminal to install it.
  - We then make a function called **_openKeyboard** that envokes the show function on the cordova keyboard plugin.
    + It is wrapped in a try catch since the web app doesn't have access to cordova from the browser.

#### From
For now our location will just be a string representing where the brew is brewed, but later we can opt in for a location API.

1. We simply add another input and map it to our brew object with ng-model
  - In this case *vm.brew.from*
    
#### Optimization through One-time Binding 
Okay so we have done a good amount so far but there are more features to implement. Now that we have a form (AddBrew) we can see how beneficial Angular's **Two-way Data Binding** can be. The **ng-model** directive makes it super easy to leverage two-way binding with froms to bind our inputs to the actual data object in our controller.

Two-way binding is very powerful, but can sometimes be overkill and overused. While it works great for froms, it isn't always necessary when simply templating out some data onto a page.

Two-way bindings create **watchers** these watchers are dirty checked during Angular's [**$digest loop**](https://www.ng-book.com/p/The-Digest-Loop-and-apply/). The more watchers, the more work that is done during this phase diffing to see what evaluations have changed. By using One-time binding we can avoid creating too many watchers.

In this section we will look at some of our templates and try to leverage One-time binding.

One important thing to note about One-time binding is that the binding is active until the value becomes defined. So if you template something like
```
vm.brew.name
```
Then the watcher would be removed once vm.brew.name is defined. This allows us to template in data when it's available.        

- Brewlist directive
  - According to the ionic documentation, since our BrewList directive uses ionic's [**collection-repeat directive**](http://ionicframework.com/docs/api/directive/collectionRepeat/) we cannot use One-time binding.

1) Add One-time binding to the BrewDetail
  - This is a great place to apply One-time binding since we are just templating the brew details onto the page.
  - We simply prefix our bindings with **_::_** like below

  ```javascript
  {{::vm.brew.name}}
  ```

### Styles Tab

1) Add a **_Styles_** tab for brewing brews by style.
  - We will add a tab to the tabs template. For now I'm just using the wine glass icon until I find something better.
  - We simple add a new *ion-tab* to the *tabs.template.html* file

2) Add a Styles Object to our firebase database.
  - We will be using some data denormalization here
  - We are going to create another json to add to our firebase  database
  - This object will be similar to our exisitng *brewObject* but it will have styles as properties rather than breweries.
  - We are duplicating data here which is okay with NoSQL databases, and is favorable when seaking fast denormalized data queries.
  - This does however mean that we will need to make sure we persist brews between the two objects.
  - First login to firebase and add a propety to the database by clicking the **"+"** button next to the database name
    
    ![add style](./READMEImages/addStyleObject.png?raw=true )

  - Now create a new property named 'styles' with some dummy string value like 'hello' for now.
  - Then click the styles property, and then once inside, select import JSON as we did before.

3) Add functionality to our style service for pulling data from firebase.
  - We will add two major functions.
    + One fore pulling down the style object.
    + One for getting the array of brews for a particular style.

4) Create a template and controller for the style list.
  - The style list will need a list of the styles in our style object. We can add this functionality to our StyleService
    + It will repeat over this list
  - Our controller wil have functionality to get the style list from our StyleService
  - We will also add a route to app.js for our new view

5) Add a **BrewsByStyle** view
  - Create a new view that uses our *BrewList* directive to display all brews for a selected style.
  - Create the template and controller (similar to our previous brew list controllers)
  - Create the route in app.js

6) Add a **Brew Detail** view from the styles tab.
  - We simple create a new route in app.js and point to our already created Brew Detail controller and template.

### Add Brew Transaction

Now that we have denormalized the data on our firebase database, we have to make sure all brews that are added are persisted by both objects

In other words, if we add to one, we must add to the other.

1) Add a function to StyleService that adds a brew to the Style Object.
  - First check to make sure we fetch the Style object.
  - Then add to the style object and return a promise.

2) Modify the BrewService to have it call the StyleService's add brew function.
  - We can leverage the [**$q.all**](https://docs.angularjs.org/api/ng/service/$q) function to ensure that both our adds go through.
  - We will return a promise so that anyone consuming this api can get notifications when it's done (even though we aren't currently using it).

### Remove Brew

We will want to be able to remove brews from our catalogue. 

1) We will add some [**ion-option-button**](link) elements to our brewList directive.
  - We will add a "remove" button and an "edit" button.

2) Add controller to the *BrewList* directive
  - We will add a controller to the directive to handle adding and removing brews.

3) Add a function to the *BrewService* to remove a brew from both the *Styles Object* and the *Brews Object*.
  - Make sure to remove from both objects and wrap the promises in a *q.all()*.

4) Add function to the *StylesService* to remove a brew
  - We have to implement the function that the BrewService will call to remove a brew.

5) Add a handler to our newly created *BrewList* to call our new *BrewService.removeBrew* function.
  - We will also manually remove the brew from the BrewList directives scoped brews object, since it may not be directly bound to the firebase object
  - For example, on the *AllBrews* view it is scoped to an array made from the firebase object rather than the object itself so updating firebase does not directly change the view.
  - We will also have to add the [$ionicListDelegate](http://ionicframework.com/docs/api/service/$ionicListDelegate/) in order to close our **ion-option** buttons after an item is removed.

