App.Router.map(function() {
    this.route('home', {
        path: '/'
    });
    this.route('profile', {
        path: '/profile'
    });
    this.route('messages', {
        path: '/messages'
    });
});

App.ApplicationRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set("tabs", Ember.ArrayProxy.create());
        controller.tabs.set("content", []);

        var homeTab = App.Tab.create({
            name: "Home",
            target: "#home",
            isActive: true,
            isRoot: true
        });
        var tabs = controller.get("tabs");
        tabs.addObject(homeTab);
    }
});

App.HomeRoute = Ember.Route.extend({
    setupController: function() {
        var appCtrl = this.controllerFor("application");
        appCtrl.send("setActiveMenu", "home");
        appCtrl.send("setActiveTab", "Home");
    }
});

App.ProfileRoute = Ember.Route.extend({
    moduleLoaded: false,
    beforeModel: function() {
        var self = this;
        var appCtrl = this.controllerFor("application");

        if (appCtrl.isModuleLoaded("Profile")) {
            console.log("module 'Profile' already loaded, skipping model hook");
            self.set("moduleLoaded", true);
        } else {
            console.log("loading module 'Profile'...");
        }
    },
    model: function() {
        var isLoaded = this.get("moduleLoaded");
        if (!isLoaded) {
            var user = App.User.create({
                name: "Armin Zia",
                email: "arminzia@live.com"
            });
            return user;
        }
    },
    setupController: function(controller, model) {
        if (model !== undefined) {
            controller.set("user", model);
            console.log(model);
        }

        var appCtrl = this.controllerFor("application");
        var tabs = appCtrl.get("tabs");

        var result = tabs.findBy("name", "Profile");
        if (result === undefined) {
            var profileTab = App.Tab.create({
                name: "Profile",
                target: "#profile"
            });
            tabs.addObject(profileTab);
        } else {
            appCtrl.send("setActiveMenu", "profile");
            appCtrl.send("setActiveTab", "Profile");
        }
    }
});

App.MessagesRoute = Ember.Route.extend({
    moduleLoaded: false,
    beforeModel: function() {
        var self = this;
        var appCtrl = this.controllerFor("application");

        if (appCtrl.isModuleLoaded("Messages")) {
            console.log("module 'Messages' already loaded, skipping model hook");
            self.set("moduleLoaded", true);
        } else {
            console.log("loading module 'Messages'...");
        }
    },
    model: function() {
        var isLoaded = this.get("moduleLoaded");
        if (!isLoaded) {
            return "You have 88 new messages!";
        }
    },
    setupController: function(controller, model) {
        if (model !== undefined) {
            console.log("-> Messages model: " + model);
        }

        var appCtrl = this.controllerFor("application");
        var tabs = appCtrl.get("tabs");
        var messagesTab = App.Tab.create({
            name: "Messages",
            target: "#messages"
        });

        var result = tabs.findBy("name", "Messages");
        if (result === undefined) {
            tabs.addObject(messagesTab);
        } else {
            appCtrl.send("setActiveMenu", "messages");
            appCtrl.send("setActiveTab", "Messages");
        }
    }
});
