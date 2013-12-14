define([
  'models/base'
], function(
  BaseModel
) {
  'use strict';

  var AttributeModel = BaseModel.extend({
    definition: {
      'uri': 'string',
      'name': 'string',
      'type': 'string',
      'length': 'int',
      'notnull': 'bool',
      'default': 'string',
    },
    defaults: {
      'type': 'string',
      'length': 100,
      'notnull': false,
      'default': '',
      'name': '',
      'uri': ''
    },
    removable: true,
    Types: ['STRING', 'INT', 'REAL'],

    validate: function(attrs, options) {
      var errors = [];
      if (this.get('name') !== attrs.name) {
        if (attrs.name.length <= 0) {
          errors.push({
            property: 'name',
            message: 'Name cant be empty'
          });
        }
      } else if (this.get('type') !== attrs.type) {
        if (this.Types.indexOf(attrs.type) === -1) {
          errors.push({
            property: 'type',
            message: 'Invalid attribute type'
          });
        }
      } else if (this.get('length') !== attrs.length) {
        if (!_.isNumber(parseInt(attrs.length, 10))) {
          errors.push({
            property: 'length',
            message: 'Attribute length must be a number'
          });
        } else if (attrs.length <= 0) {
          errors.push({
            property: 'length',
            message: 'Attribute length must be positive number'
          });
        }
      }
      if (errors.length > 0) {
        return errors;
      }
    }

  });

  return AttributeModel;
});