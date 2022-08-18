/* eslint-disable no-undef */
import { login, logout, signup } from './auth';
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateSettingsForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
const bookTourBtn = document.querySelector('#book-tour');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = loginForm.querySelector('button');
    submitBtn.innerHTML = 'Logging in...';
    await login(email, password);
    submitBtn.innerHTML = 'Login';
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const submitBtn = signupForm.querySelector('button');
    submitBtn.innerHTML = 'Signing up...';
    await signup(email, name, password, passwordConfirm);
    submitBtn.innerHTML = 'Sign up';
  });
}

if (updateSettingsForm) {
  updateSettingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    const submitBtn = updateSettingsForm.querySelector('button');
    submitBtn.innerHTML = 'Updating...';
    await updateSettings(form, 'data');
    submitBtn.innerHTML = 'Save Settings';
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    const submitBtn = userPasswordForm.querySelector('button');
    submitBtn.innerHTML = 'Updating...';
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    submitBtn.innerHTML = 'Save Password';
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (bookTourBtn) {
  bookTourBtn.addEventListener('click', async (e) => {
    e.target.innerHTML = 'Processing...';
    const { tourId } = e.target.dataset;
    await bookTour(tourId);
    e.target.innerHTML = 'Book Tour';
  });
}
