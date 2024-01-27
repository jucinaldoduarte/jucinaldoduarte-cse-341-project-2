const validator = require('../helpers/validate');

const saveTemples = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    status: 'required|string',
    location: 'required|string',
    dedication: 'required|string'    
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveTemples
};
