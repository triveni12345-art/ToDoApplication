/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// const Joi = require("joi");
// const User = require("../models/User");

// const User = require("../models/User");

module.exports = {


  /**
   * `UserController.create`
   */
  create: async function (req, res) {
    try {
     let param = req.allParams();
      console.log(param);
       if (!param.fname)
      
         return res.badRequest({ err: "name is required field!" })
      const results = await User.create({
        fname: param.fname,
        lname: param.lname,
        gender: param.gender,
        email: param.email,
        password: param.password
      });
      return res.ok(results);
    }
    catch (err) {
      return res.serverError(err);
    }
  },

  async update(req, res) {
    try {
      let param = req.allParams();
      console.log(param);
      let attribute = {};
      if (param.fname)
        attribute.fname= param.fname;
      if (param.lname)
        attribute.lname = param.lname;
      if (param.gender)
        attribute.gender = param.gender;
      if (param.email)
        attribute.email = param.email;
      if (param.password)
        attribute.password = param.password; 
      const result = await User.update({ id: req.params.id }, attribute);
      console.log(result);
      return res.ok(result)

    }
    catch (err) {
      res.serverError(err);
    }
  },
 async find(req, res) {
    try {
      const user = await User.find();
      return res.ok(user);
    }
    catch (err) {
      return res.serverError(res);
    }
  },

  async delete(req, res) {
    try {
      const results = await User.destroy({
        id:req.params.id
      })
      res.ok(results);
    }
    catch (err) {
      res.serverError(err)


    }
  }

};



