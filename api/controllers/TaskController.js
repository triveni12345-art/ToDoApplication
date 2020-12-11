/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const User = require("../models/User");

// const Task = require("../models/Task");

module.exports = {


  /**
   * `TaskController.create()`
   */
  async create(req, res) {
    try {
      let param = req.allParams();
      console.log(param);
      if (!param.title)
        return res.badRequest({ err: "title is required field!" })
      const results = await Task.create({
        title: param.title,
        descriptio: param.descriptio,
        status: param.status,
        user: param.user,
      });
      return res.ok(results);
    }
    catch (err) {
      return res.serverError(err);
    }
  },


  async find(req, res) {
    try {
      const user = await Task.find();
      return res.ok(user);
    }
    catch (err) {
      return res.serverError(res);
    }
  },


  async findOne(req, res) {
    try {

      const user = await Task.findOne({
        id: req.params.id
      });
      return res.ok(user);
    }
    catch (err) {
      return res.serverError(err);
    }
  },

  /**
   * `TaskController.update()`
   */
  async update(req, res) {
    try {
      let param = req.allParams();
      let attribute = {};
      if (param.title)
        attribute.title = param.title;
      if (param.descriptio)
        attribute.descriptio = param.descriptio;
      if (param.status)
        attribute.status = param.status;
      const result = await Task.update({ id: req.params.id }, attribute);
      return res.ok(result)

    }
    catch (err) {
      res.serverError(err);
    }
  },


  /**
   * `TaskController.delete()`
   */
  async delete(req, res) {
    try {
      const results = await Task.destroy({
        id: req.params.id
      })
      res.ok(results);
    }
    catch (err) {
      res.serverError(err)


    }
  }

};

