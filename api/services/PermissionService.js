// api/services/PermissionService.js

var _ = require('lodash');
var _super = require('sails-permissions/api/services/PermissionService');

function PermissionService() {}

PermissionService.prototype = Object.create(_super);

PermissionService.prototype.addRole = function(userName, roleName) {
  User.findOne({
      username: userName
    })
    .then(function(user) {
      return Role.findOne({
          name: roleName
        })
        .populate('users')
        .then(function(role) {
            console.log('hrm?', role);
          if (role) {
            role.users.push(user);
            console.log(role.users);
            return Role.update({
              name: roleName
            }, {
              users: role.users
            })
          } else {
            return Role.create({
              name: roleName,
              users: [user.id]
            });

          }
        });
    })
    .then(function(role) {
      console.log(role);
    })
    .catch(function(error) {
      console.error(error);
    });

};

/**
 * modelNames is an string
 * roleName is a string
 */
PermissionService.prototype.addPermission = function(roleName, modelName, type, relation, criteria) {
  relation = relation && relation.toLowerCase() === 'owner' ? 'owner' : 'role';

  Promise.bind({}, Role.findOne({
      name: roleName
    })
    .then(function(role) {
      this.role = role;
      return Model.findOne({
        name: modelName
      });
    })
    .then(function(model) {
      return Permission.create({
        model: model.id,
        action: type,
        role: this.role.id,
        createdBy: 1,
        relation: relation,
        where: criteria
      });
    })
    .then(function(newPermission) {
      sails.log('new ' + type + ' permission', newPermission);
    })
    .catch(sails.log.error));

};

module.exports = new PermissionService();
