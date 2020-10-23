"use-strict";

const async = require("async");
const models = require("../models");

const createTask = (req, res) => {
  async.waterfall(
    [
      function validation(callback) {
        let valid = true;
        let dataValidator = [
          {
            name: "user_id",
            value: req.body.user_id
          },
          {
            name: "name",
            value: req.body.name
          },
          {
            name: "description",
            value: req.body.description
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
          user_id: req.body.user_id,
          name: req.body.name,
          description: req.body.description
        };

        models.tasks.create(request).then((result, err) => {
          if (err) return req.output(req, res, err, "error", 400);

          callback(null, {
            error: false,
            code: "00",
            message: "Success create assign",
            data: request
          });
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

const listTask = (req, res) => {
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
        models.tasks
          .findAll({
            raw: true,
            include: [
              {
                model: models.users,
                as: "users"
              }
            ],
            where: {
              "$users.email$": req.body.user
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

const updateTask = (req, res) => {
  async.waterfall(
    [
      function validation(callback) {
        let valid = true;
        let dataValidator = [
          {
            name: "status",
            value: req.body.status
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
      function getData(data, callback) {
        models.tasks
          .update(
            {
              status: req.body.status
            },
            {
              where: {
                id: req.params.id
              }
            }
          )
          .then((result, err) => {
            if (err) return req.output(req, res, err, "error", 400);

            callback(null, {
              error: false,
              code: "00",
              message: "Success update task",
              data: {}
            });
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

const deleteTask = (req, res) => {
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
        models.tasks
          .destroy({
            where: {
              id: req.params.id
            }
          })
          .then((result, err) => {
            if (err) return req.output(req, res, err, "error", 400);

            callback(null, {
              error: false,
              code: "00",
              message: "Success delete task",
              data: {}
            });
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

module.exports = { createTask, listTask, updateTask, deleteTask };
