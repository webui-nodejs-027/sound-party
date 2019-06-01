const { container } = require('../../ioc');
const { TYPES } = require('../../constants');
const { AppError } = require('../ErrorHandlers');

const roleService = container.get(TYPES.RoleService);

const checkAccess = (...roles) => async (req, res, next) => {
  const { user } = req;
  const userRole = await roleService.getById(user.roleId);
  let notRole = 0;
  roles.forEach((role) => {
    if (role !== userRole.name) {
      notRole += 1;
    }
  });
  if (notRole === roles.length) {
    next(new AppError('You dont have access', 400));
  }
  return next();
};

module.exports = checkAccess;
