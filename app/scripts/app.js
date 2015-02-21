App = window.App = Ember.Application.create({
    // LOG_TRANSITIONS: true
});

App.RenderModuleView = Ember.View.extend({
    classNames: ['tab-pane', 'fade'],
    attributeBindings: ['id', 'role'],
    id: null,
    role: "tabpanel",
    template: null,
    initialize: function() {
        var module = this.get("module");
        var name = module.name.decamelize();

        this.set("id", name);
        if (name === "home") {
            this.classNames.push("in active");
        }

        if (!this.container.lookup("view:" + name)) {
            name = "home";
            this.set("id", "home");
        }

        this.set("template", Ember.Handlebars.compile('{{render "' + name + '" view.module}}'));
    }.on("init")
});

App.ApplicationController = Ember.Controller.extend({
    appName: "Tabbed UI",
    appCite: "with Ember.js and Bootstrap",
    tabs: null,
    isModuleLoaded: function(moduleName) {
        var tabs = this.get("tabs");
        if (tabs !== null) {
            var target = tabs.findBy("name", moduleName);
            return target !== undefined;
        }

        return undefined;
    },
    actions: {
        setActiveTab: function(tabName) {
            if (this.tabs.get("content").length > 0) {
                for (i = 0; i < this.tabs.get("content").length; i++) {
                    var item = this.tabs.objectAt(i);
                    item.set("isActive", false);
                }

                var target = this.tabs.findBy("name", tabName);
                if (target !== undefined) {
                    target.set("isActive", true);

                    $(".tab-content div.active").removeClass("in active");
                    $(".tab-content div#" + tabName.decamelize()).addClass("in active");
                }
            }
        },
        closeTab: function(tabItem) {
            var self = this;
            var target = this.tabs.findBy("name", tabItem.name);
            if (target !== undefined) {
                this.tabs.removeObject(target);
                this.send("setActiveTab", "Home");
            } else {
                console.log("tab item not defined!");
            }
        },
        setActiveMenu: function(target) {
            $(".nav.navbar-nav li").each(function() {
                $(this).removeClass("active");
            });

            var $target = $(".nav.navbar-nav li#" + target);
            $target.addClass("active");
        }
    }
});

App.ApplicationView = Ember.View.extend({
    didInsertElement: function() {
        var controller = this.get("controller");

        $("#dashboard-tabs").on("show.bs.tab", function(e) {
            var moduleName = $(e.target).attr("data-module");
            var routeName = moduleName.decamelize();

            controller.transitionToRoute(routeName);

            // console.log(e.target);  // newly activated tab
            // console.log(e.relatedTarget);   // previous active tab
        });
    }
});

App.ProfileController = Ember.Controller.extend({
    needs: ["application"],
    user: null,
    actions: {
        sayHi: function() {
            console.log("Oh hi! I'm the Profile controller");
        }
    }
});

App.ProfileView = Ember.View.extend({
    didInsertElement: function() {
        var controller = this.get("controller.controllers.application");

        controller.send("setActiveTab", "Profile");
        controller.send("setActiveMenu", "profile");

        // this.get("controller").send("sayHi");

        var ctrl = this.get("controller");
        var user = ctrl.get("user");
        console.log(user);
    }
});

App.MessagesController = Ember.Controller.extend({
    needs: ["application"],
    actions: {
        sayHi: function() {
            console.log("Oh hi! I'm the message inbox controller");
        }
    }
});

App.MessagesView = Ember.View.extend({
    didInsertElement: function() {
        var controller = this.get("controller.controllers.application");

        controller.send("setActiveTab", "Messages");
        controller.send("setActiveMenu", "messages");

        // this.get("controller").send("sayHi");
    }
});
