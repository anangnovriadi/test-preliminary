"use-strict";

const async = require("async");
const models = require("../models");
const md5 = require("md5");
const jwt = require("../utils/jwt");

const login = (req, res) => {
  let query = "";
  async.waterfall(
    [
      function validation(callback) {
        let valid = true;
        let dataValidator = [
          {
            name: "email",
            value: req.body.email
          },
          {
            name: "password",
            value: req.body.password
          }
        ];

        req.validation.validate(dataValidator, err => {
          if (err) {
            valid = false;
            return req.output(req, res, err, "error", 400);
          }
        });

        if (!valid) return;
        callback(null, {});
      },
      function checkUser(data, callback) {
        query =
          "select * from users where email = '" +
          req.body.email +
          "' and  password = '" +
          md5(req.body.password) +
          "'";

        models.sequelize.query(query).then((result, err) => {
          if (err) return req.output(req, res, err, "error", 400);
          if (result[0].length < 1)
            return req.output(
              req,
              res,
              {
                error: true,
                code: "01",
                message: "Username or password is wrong",
                data: {}
              },
              "error",
              200
            );

          let token = jwt.generateAccessToken(req.body);
          result[0][0].token = token;

          callback(null, {
            error: false,
            code: "00",
            message: "Success login",
            data: result[0][0]
          });
        });
      }
    ],
    (err, result) => {
      if (err) {
        return req.output(req, res, err, "error", 400);
      }

      return req.output(req, res, result, "info", 200);
    }
  );
};

const createUser = (req, res) => {
  async.waterfall(
    [
      function validation(callback) {
        let valid = true;
        let dataValidator = [
          {
            name: "email",
            value: req.body.email
          },
          {
            name: "password",
            value: req.body.password
          },
          {
            name: "name",
            value: req.body.name
          }
        ];

        req.validation.validate(dataValidator, err => {
          if (err) {
            valid = false;
            return req.output(req, res, err, "error", 400);
          }
        });

        if (!valid) return;
        callback(null, {});
      },
      function createData(data, callback) {
        let request = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role_id: 2
        };

        models.users
          .create(request)
          .then((result, err) => {
            if (err) return req.output(req, res, err, "error", 400);

            callback(null, {
              error: false,
              code: "00",
              message: "Success create user",
              data: request
            });
          })
          .catch(err => {
            let error = {};
            console.log(err);
            error.error = true;
            error.message =
              err.name == "SequelizeUniqueConstraintError"
                ? err.errors[0].message + ", already in use"
                : err.errors[0].message;
            callback(error);
          });
      }
    ],
    (err, result) => {
      if (err) {
        return req.output(req, res, err, "error", 400);
      }

      return req.output(req, res, result, "info", 204);
    }
  );
};

const listUser = (req, res) => {
  async.waterfall(
    [
      function validation(callback) {
        let valid = true;
        let dataValidator = [];

        req.validation.validate(dataValidator, err => {
          if (err) {
            valid = false;
            return req.output(req, res, err, "error", 400);
          }
        });

        if (!valid) return;
        callback(null, {});
      },
      function getData(data, callback) {
        let request = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role_id: 2
        };

        models.users
          .findAll({
            where: {
              role_id: 2
            }
          })
          .then((result, err) => {
            if (err) return req.output(req, res, err, "error", 400);
            if (result.length < 1)
              return req.output(
                req,
                res,
                {
                  error: true,
                  message: "Not found",
                  data: {}
                },
                "error",
                400
              );

            callback(null, {
              error: false,
              message: "Found",
              data: result,
              count: result.length
            });
          })
          .catch(err => {
            callback(null, err);
          });
      }
    ],
    (err, result) => {
      if (err) {
        return req.output(req, res, err, "error", 400);
      }

      return req.output(req, res, result, "info", 200);
    }
  );
};

module.exports = { login, createUser, listUser };
