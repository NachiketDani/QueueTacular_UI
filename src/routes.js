/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from 'views/Dashboard.js';
import Create from 'views/Create.js';
import Join from 'views/Join.js';
import Edit from 'views/Edit.js';
import About from 'views/About.js';

var routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-layout-11',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/create',
    name: 'Create',
    icon: 'nc-icon nc-simple-add',
    component: Create,
    layout: '/admin',
  },
  {
    path: '/join',
    name: 'Join',
    icon: 'nc-icon nc-watch-time',
    component: Join,
    layout: '/admin',
  },
  {
    path: '/edit/',
    name: 'Edit',
    component: Edit,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    layout: '/admin',
    invisible: true,
  },
];
export default routes;
