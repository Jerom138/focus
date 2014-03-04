// Generated by CoffeeScript 1.6.2
(function() {
  var AboutView, ContactView, FooterView, HomeView, Pret, PretSearchView, References, ReferencesView, Router, SigninView, VirtualMachine, VirtualMachineSaveTemplateView, VirtualMachineSaveView, VirtualMachineSearch, VirtualMachineSearchTemplateView, VirtualMachineSearchView, VirtualMachineTemplateView, VirtualMachineView, application, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  application = require('application');

  FooterView = require('views/footer-view');

  HomeView = require('views/home-view');

  AboutView = require('views/about-view');

  ContactView = require('views/contact-view');

  SigninView = require('views/signin-view');

  VirtualMachineSearch = require('models/virtualMachineSearch');

  VirtualMachineSearchView = require('views/virtualMachine-search-view');

  VirtualMachineSearchTemplateView = require('views/search-template-view');

  VirtualMachine = require('models/virtualMachine');

  VirtualMachineView = require('views/virtualMachine-view');

  VirtualMachineTemplateView = require('views/detail-consult-template-view');

  VirtualMachineSaveView = require('views/virtualMachine-save-view');

  VirtualMachineSaveTemplateView = require('views/detail-edit-template-view');

  References = require('../models/references');

  ReferencesView = require('../views/references-view');

  Pret = require('../models/nantissement/pret');

  PretSearchView = require('../views/nantissement/pret-search-view');

  module.exports = Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      this.edit = __bind(this.edit, this);
      this.show = __bind(this.show, this);
      this.list = __bind(this.list, this);
      this.create = __bind(this.create, this);
      this.search = __bind(this.search, this);
      this.reference = __bind(this.reference, this);
      this.updateVirtualMachine = __bind(this.updateVirtualMachine, this);
      this.newVirtualMachine = __bind(this.newVirtualMachine, this);
      this.virtualMachine = __bind(this.virtualMachine, this);
      this.searchVirtualMachine = __bind(this.searchVirtualMachine, this);
      this.signin = __bind(this.signin, this);
      this.contact = __bind(this.contact, this);
      this.about = __bind(this.about, this);
      this.home = __bind(this.home, this);
      this.searchPret = __bind(this.searchPret, this);      _ref = Router.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Router.prototype.routes = {
      '': 'home',
      'about': 'about',
      'contact': 'contact',
      'signin': 'signin',
      'virtualMachine/search': 'searchVirtualMachine',
      'virtualMachine/create': 'newVirtualMachine',
      'virtualMachine/:id': 'virtualMachine',
      'virtualMachine/edit/:id': 'updateVirtualMachine',
      'reference': 'reference',
      'test/:modelName/search': 'search',
      'test/:modelName/create': 'create',
      'test/:modelName/:id': 'list',
      'test/:modelName/show/:id': 'show',
      'test/:modelName/edit/:id': 'edit',
      'nantissement/pret/search': 'searchPret'
    };

    Router.prototype.searchPret = function() {
      application.layout.setActiveMenu('nantissement');
      return application.layout.content.show(new PretSearchView({
        model: new Pret()
      }));
    };

    Router.prototype.home = function() {
      var view;

      view = new HomeView();
      application.layout.setActiveMenu('refinancement');
      application.layout.content.show(view);
      return application.layout.footer.show(new FooterView({
        model: new Backbone.Model({
          name: 'home',
          time: moment().format('MMMM Do YYYY, h:mm:ss a')
        })
      }));
    };

    Router.prototype.about = function() {
      var view;

      view = new AboutView();
      application.layout.content.show(view);
      return application.layout.footer.show(new FooterView({
        model: new Backbone.Model({
          name: 'about',
          time: moment().format('MMMM Do YYYY, h:mm:ss a')
        })
      }));
    };

    Router.prototype.contact = function() {
      var view;

      view = new ContactView();
      application.layout.content.show(view);
      return application.layout.footer.show(new FooterView({
        model: new Backbone.Model({
          name: 'contact',
          time: moment().format('MMMM Do YYYY, h:mm:ss a')
        })
      }));
    };

    Router.prototype.signin = function() {
      var view;

      view = new SigninView();
      application.layout.content.show(view);
      return application.layout.footer.show(new FooterView({
        model: new Backbone.Model({
          name: 'signin',
          time: moment().format('MMMM Do YYYY, h:mm:ss a')
        })
      }));
    };

    Router.prototype.searchVirtualMachine = function() {
      var model, view;

      model = new VirtualMachineSearch();
      view = new VirtualMachineSearchTemplateView({
        model: model
      });
      return application.layout.content.show(view);
    };

    Router.prototype.virtualMachine = function(id) {
      var model, view;

      model = new VirtualMachine({
        id: id
      });
      view = new VirtualMachineTemplateView({
        model: model
      });
      return application.layout.content.show(view);
    };

    Router.prototype.newVirtualMachine = function() {
      var model, view;

      model = new VirtualMachine({
        isEdit: true,
        isCreate: true
      });
      view = new VirtualMachineSaveTemplateView({
        model: model
      });
      return application.layout.content.show(view);
    };

    Router.prototype.updateVirtualMachine = function(id) {
      var model, view;

      model = new VirtualMachine({
        id: id,
        isEdit: true
      });
      view = new VirtualMachineSaveTemplateView({
        model: model
      });
      return application.layout.content.show(view);
    };

    Router.prototype.reference = function() {
      var model, view;

      model = new References();
      view = new ReferencesView({
        model: model
      });
      return application.layout.content.show(view);
    };

    Router.prototype.search = function(modelName) {
      /*Model = require("../models/#{modelName}")
      #View = #require("../models/#{modelName}-search")
      model = new Model()
      view =  new VirtualMachineSearchTemplateView({model: model}) 
      #view = new VirtualMachineSearchView({model: model})
      application.layout.content.show(view)
      */
      return console.log("search", modelName);
    };

    Router.prototype.create = function(modelName) {
      return console.log("create", modelName);
    };

    Router.prototype.list = function(modelName, id) {
      return console.log("list", modelName);
    };

    Router.prototype.show = function(modelName, id) {
      return console.log("show", modelName);
    };

    Router.prototype.edit = function(modelName, id) {
      return console.log("edit", modelName);
    };

    return Router;

  })(Backbone.Router);

}).call(this);