const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();
router.use(authController.isLoggedIn);
router.get(
  '/',
  bookingController.createBookingCheckout,
  viewController.getOverview
);

router.get('/overview', viewController.getOverview);

router.get('/tours/:slug', viewController.getTour);

router.get('/login', viewController.getLoginForm);

router.get('/signup', viewController.getSignupForm);

router.get('/me', authController.protect, viewController.getProfile);

router.get('/my-tours', authController.protect, viewController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
