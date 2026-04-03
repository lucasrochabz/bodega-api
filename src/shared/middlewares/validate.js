export const validate = (schemas) => {
  const options = { abortEarly: false };

  return (req, res, next) => {
    if (schemas.body) {
      const { error, value } = schemas.body.validate(req.body, options);

      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ success: false, message: errors });
      }

      req.body = value;
    }

    if (schemas.params) {
      const { error, value } = schemas.params.validate(req.params, options);

      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ success: false, message: errors });
      }

      req.params = value;
    }

    if (schemas.query) {
      const { error, value } = schemas.query.validate(req.query, options);

      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ success: false, message: errors });
      }

      req.query = value;
    }

    next();
  };
};
