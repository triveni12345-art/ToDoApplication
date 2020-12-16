/**
 * RestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  /**
   * `RestaurantController.create()`
   */
  create: async function (req, res) {
    try {
     let param = req.allParams();
      console.log(param);
       if (!param.restname)
      return res.badRequest({ err: "restname is required field!" })
      if (!param.address)
      return res.badRequest({ err: "address is required field!" })
      if (!param.ContactNo)
      return res.badRequest({ err: "contact no is required field!" })
      if (!param.Timings)
      return res.badRequest({ err: "Timings  is required field!" })

      const results = await Restaurant.create({
        restname: param.restname,
        address: param.address,
        ContactNo: param.ContactNo,
        Timings: param.Timings,
        isActive:param.isActive
      });
      return res.ok(results);
    }
    catch (err) {
      return res.serverError(err);
    }
  },

  /**
   * `RestaurantController.find()`
   */
  async find(req, res) {
    try {
      const restaurant = await Restaurant.find();
      return res.ok(restaurant);
    }
    catch (err) {
      return res.serverError(res);
    }
  },

  /**
   * `RestaurantController.update()`
   */
  async update(req, res) {
    try {
      let param = req.allParams();
      console.log(param);
      let attribute = {};
      if (param.restname)
        attribute.restname= param.restname;
      if (param.address)
        attribute.address = param.address;
      if (param.ContactNo)
        attribute.ContactNo = param.ContactNo;
      if (param.Timings)
        attribute.Timings = param.Timings;
      if(param.isActive)
        attribute.isActive=param.isActive;
        else
        attribute.isActive=param.isActive;

      const result = await Restaurant.update({ id: req.params.id }, attribute);
      console.log(result);
      return res.ok(result)

    }
    catch (err) {
      res.serverError(err);
    }
  },
  /**
   * `RestaurantController.delete()`
   */
  async delete(req, res) {
    try {
      const results = await Restaurant.destroy({
        id:req.params.id
      })
      res.ok(results);
    }
    catch (err) {
      res.serverError(err)


    }
  }

};

