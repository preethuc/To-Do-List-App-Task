"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _userController = require("./../controller/userController");

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.route("/signup").post(_userController2.default.register);
// router.route("/allUser").get(userController.getUser);
// router
//   .route("/:id")
//   .put(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;