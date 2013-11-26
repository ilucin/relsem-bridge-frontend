define(['backbone'], function(Backbone) {
  'use strict';

  var List = Backbone.View.extend({
    className: 'list ',

    constructor: function ListView(options) {
      options = options || {};

      this.setupListView(options);
      this.setupListeners();
      //super call - default Backbone magic
      Backbone.View.call(this, options);
    },

    setupListView: function(options) {
      this.items = [];
      this.itemView = this.itemView || options.itemView || new Backbone.View();
      this.collection = this.collection || options.collection || new Backbone.Collection();
      this.$emptyListEl = this.$emptyListEl || options.$emptyListEl || $('<div>').addClass('empty-list-el').html('There are no items here.');
    },

    setupListeners: function() {
      this.listenTo(this.collection, 'add', this.addSingleItem, this);
      this.listenTo(this.collection, 'reset', this.addAll, this);
      this.listenTo(this.collection, 'remove', this.removeSingleItem, this);
      this.listenTo(this.collection, 'fetch:start', this.onFetchStart, this);
      this.listenTo(this.collection, 'fetch:complete', this.onFetchComplete, this);
    },

    render: function() {
      this.$el.append(this.$emptyListEl.addClass('hide'));
      this.addAll();
      return this;
    },

    onFetchComplete: function() {
      this.$('.load-mask').remove();
    },

    onFetchStart: function(options) {
      options = options || {};
      if (!options.silent) {
        this.$el.append($('<div>').addClass('load-mask'));
      }
    },

    addAll: function() {
      //remove previous items if present
      if (this.items.length >= 0) {
        this.removeAllItems();
      }
      //add new items
      this.collection.each(function(model) {
        this.addSingleItem(model);
      }, this);

      this.checkIfListEmpty();
    },

    addSingleItem: function(model) {
      var viewItem = new this.itemView({
        model: model
      });
      this.items.push(viewItem);
      this.addListItemListeners(viewItem);

      viewItem.render();
      this.$el.append(viewItem.el);
      this.checkIfListEmpty();
      return viewItem;
    },

    removeSingleItem: function(model) {
      var view = this.getViewByModel(model);
      this.removeSingleView(view);
      this.checkIfListEmpty();
    },

    removeSingleView: function(view) {
      var index;
      //remove listeners
      this.stopListening(view);

      if (view) {
        this.stopListening(view.model);
        view.remove();
        index = this.items.indexOf(view);
        //remove view from items
        this.items.splice(index, 1);
      }
    },

    checkIfListEmpty: function() {
      if (this.collection.length === 0) {
        this.$emptyListEl.removeClass('hide');
      } else {
        this.$emptyListEl.addClass('hide');
      }
    },

    //propagate list item events through parent list view
    //propagates the single listview and any additional parameters to the listview
    addListItemListeners: function(view) {
      this.listenTo(view, 'all', function() {
        var eventName = 'item:' + arguments[0];
        var params = _.toArray(arguments);
        params.splice(0, 1);
        params.unshift(eventName, view);
        this.trigger.apply(this, params);
      });

      this.listenTo(view.model, 'change', function() {
        view.render();
      });
    },

    getViewByModel: function(model) {
      return _.find(this.items, function(item, index) {
        return item.model === model;
      });
    },

    removeAllItems: function() {
      _.each(this.items, function(item) {
        this.stopListening(item);
        this.stopListening(item.model);
        item.remove();
      }, this);
      this.item = [];
      this.checkIfListEmpty();
    },

    remove: function() {
      //do the default Backbone remove logic 
      Backbone.View.prototype.remove.call(this, arguments);
      //extra remove our items - one by one
      this.removeAllItems();
    }
  });

  Backbone.ListView = List;

  return List;
});