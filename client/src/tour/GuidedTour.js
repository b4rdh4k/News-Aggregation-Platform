// src/Tour.js
import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'

export const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    },
    classes: 'shepherd-theme-arrows',
    scrollTo: { behavior: 'smooth', block: 'center' }
  }
})

tour.addStep({
  id: 'login-button',
  text: 'Click here to log in to your account.',
  attachTo: {
    element: '.login-button',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
})

tour.addStep({
  id: 'tabs',
  text: 'Here are the different tabs you can navigate through.',
  attachTo: {
    element: '.tabs-home',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
})

tour.addStep({
  id: 'tabs',
  text: 'This is the home page, you can quickly get informed.',
  attachTo: {
    element: '.tabs-home',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
})

tour.addStep({
  id: 'tabs',
  text: 'This is the personalized page, made just for you',
  attachTo: {
    element: '.tabs-foryou',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
})

tour.addStep({
  id: 'tabs',
  text: 'This is the category page, where you can browse through all the categories',
  attachTo: {
    element: '.tabs-categories',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
})
tour.addStep({
  id: 'tabs',
  text: 'Get the weather, in your location, with just one click',
  attachTo: {
    element: '.weather-button',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
})

tour.addStep({
  id: 'tabs',
  text: 'Subscribe to our plan, to get the best experience',
  attachTo: {
    element: '.subcribe-button',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
})

tour.addStep({
  id: 'tabs',
  text: 'If you ever get confused, find your way on the map',
  attachTo: {
    element: '.footer-button',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
})

tour.addStep({
  id: 'tabs',
  text: 'You are all set. Happy reading and have a great day!',
  attachTo: {
    element: '.finish-button',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Finish',
      action: tour.complete
    }
  ]
})
