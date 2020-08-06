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
import Notifications from 'views/Notifications.js';
import Icons from 'views/Icons.js';
import Create from 'views/Create.js';
import Typography from 'views/Typography.js';
import TableList from 'views/Tables.js';
import Join from 'views/Join.js';
import Edit from 'views/Edit.js';
import UserPage from 'views/User.js';
import UpgradeToPro from 'views/Upgrade.js';

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
    path: '/icons',
    name: 'Icons',
    icon: 'nc-icon nc-palette',
    component: Icons,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/join',
    name: 'Join',
    icon: 'nc-icon nc-watch-time',
    component: Join,
    layout: '/admin',
  },
  {
    path: '/edit/:_id',
    name: 'Edit',
    component: Edit,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'nc-icon nc-bell-55',
    component: Notifications,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/user-page',
    name: 'User Profile',
    icon: 'nc-icon nc-single-02',
    component: UserPage,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/tables',
    name: 'Table List',
    icon: 'nc-icon nc-tile-56',
    component: TableList,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: 'nc-icon nc-caps-small',
    component: Typography,
    layout: '/admin',
    invisible: true,
  },
  {
    pro: true,
    path: '/upgrade',
    name: 'Upgrade to PRO',
    icon: 'nc-icon nc-spaceship',
    component: UpgradeToPro,
    layout: '/admin',
    invisible: true,
  },
];
export default routes;
