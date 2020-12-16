/**
 * ManageRestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  /**
   * `ManageRestaurantController.create()`
   */
  create: async function (req, res) {
    try {
     let param = req.allParams();
      console.log(param);
       if (!param.restname)
      return res.badRequest({ err: "restname is required field!" })

      const results = await ManageRestaurant.create({
        restname: param.restname,
        Timings: param.Timings,
        Lastupdatedtime:param.Lastupdatedtime
      });
      return res.ok(results);
    }
    catch (err) {
      return res.serverError(err);
    }
  },


  /**
   * `ManageRestaurantController.find()`
   */
  async find(req, res) {
    try {
      const restaurant = await ManageRestaurant.find();
      return res.ok(restaurant);
    }
    catch (err) {
      return res.serverError(res);
    }
  },

  /**
   * `ManageRestaurantController.update()`
   */
  async update(req, res) {
    try {
      let param = req.allParams();
      console.log(param);
      let attribute = {};
      if (param.restname)
        attribute.restname= param.restname;
      if (param.Timings)
        attribute.Timings = param.Timings;
      if (param.Lastupdatedtime)
        attribute.Lastupdatedtime = param.Lastupdatedtime;
     
      const result = await ManageRestaurant.update({ id: req.params.id }, attribute);
      console.log(result);
      return res.ok(result)

    }
    catch (err) {
      res.serverError(err);
    }
  },

  /**
   * `ManageRestaurantController.delete()`
   */
  async delete(req, res) {
    try {
      const results = await ManageRestaurant.destroy({
        id:req.params.id
      })
      res.ok(results);
    }
    catch (err) {
      res.serverError(err)


    }
  }

};

