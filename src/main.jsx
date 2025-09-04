import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Landing from './landing/landing';
import Panel from './panel/panel';
import PanelLogin from './panel/panelLogin';

import PanelStackCategory from './panel/pages/stackCategory/panelStackCategory';
import PanelStackCategoryAdd from './panel/pages/stackCategory/panelStackCategoryAdd';
import PanelStackCategoryEdit from './panel/pages/stackCategory/panelStackCategoryEdit';

import PanelStack from './panel/pages/stack/panelStack';
import PanelStackAdd from './panel/pages/stack/panelStackAdd';
import PanelStackEdit from './panel/pages/stack/panelStackEdit';

import PanelTrajectory from './panel/pages/trajectory/panelTrajectory';
import PanelTrajectoryAdd from './panel/pages/trajectory/panelTrajectoryAdd';
import PanelTrajectoryEdit from './panel/pages/trajectory/panelTrajectoryEdit';

import PanelExperience from './panel/pages/experience/panelExperience';
import PanelExperienceAdd from './panel/pages/experience/panelExperienceAdd';
import PanelExperienceEdit from './panel/pages/experience/panelExperienceEdit';

import PanelCertificates from './panel/pages/certificates/panelCertificates';
import PanelCertificatesAdd from './panel/pages/certificates/panelCertificatesAdd';
import PanelCertificatesEdit from './panel/pages/certificates/panelCertificatesEdit';

import PanelProjects from './panel/pages/projects/panelProjects';
import PanelProjectsAdd from './panel/pages/projects/panelProjectsAdd';
import PanelProjectsEdit from './panel/pages/projects/panelProjectsEdit';

import PanelProjectsCategories from './panel/pages/projectsCategories/panelProjectsCategories';
import PanelProjectsCategoriesAdd from './panel/pages/projectsCategories/panelProjectsCategoriesAdd';
import PanelProjectsCategoriesEdit from './panel/pages/projectsCategories/panelProjectsCategoriesEdit';

import PanelProfile from './panel/pages/profile/panelProfile';
import PanelIntro from './panel/pages/intro/panelIntro';
import PanelSeo from './panel/pages/seo/panelSeo';
import PanelNumbers from './panel/pages/numbers/panelNumbers';
import PanelPractice from './panel/pages/practice/panelPractice';

import PanelHomeComponent from './panel/pages/home/panelHomeComponent';

const router = createBrowserRouter([
  { 'path':'/', 'element': <Landing/> },
  { 'path':'login', 'element': <PanelLogin/> },
  { 
    'path':'/panel', 
    'element': <Panel/>,
    'children': [
      { 'path':'', 'element': <PanelHomeComponent/> },
      { 'path':'profile', 'element': <PanelProfile/> },
      { 'path':'intro', 'element': <PanelIntro/> },
      { 'path':'seo', 'element': <PanelSeo/> },
      { 'path':'numbers', 'element': <PanelNumbers/> },
      { 'path':'practice', 'element': <PanelPractice/> },
      { 'path':'stack/category', 'element': <PanelStackCategory/> },
      { 'path':'stack/category/add', 'element': <PanelStackCategoryAdd/> },
      { 'path':'stack/category/edit/:id', 'element': <PanelStackCategoryEdit/> },
      { 'path':'stack', 'element': <PanelStack/> },
      { 'path':'stack/add', 'element': <PanelStackAdd/> },
      { 'path':'stack/edit/:id', 'element': <PanelStackEdit/> },
      { 'path':'trajectory', 'element': <PanelTrajectory/> },
      { 'path':'trajectory/add', 'element': <PanelTrajectoryAdd/> },
      { 'path':'trajectory/edit/:id', 'element': <PanelTrajectoryEdit/> },
      { 'path':'experience', 'element': <PanelExperience/> },
      { 'path':'experience/add', 'element': <PanelExperienceAdd/> },
      { 'path':'experience/edit/:id', 'element': <PanelExperienceEdit/> },
      { 'path':'certificates', 'element': <PanelCertificates/> },
      { 'path':'certificates/add', 'element': <PanelCertificatesAdd/> },
      { 'path':'certificates/edit/:id', 'element': <PanelCertificatesEdit/> },
      { 'path':'projects', 'element': <PanelProjects/> },
      { 'path':'projects/add', 'element': <PanelProjectsAdd/> },
      { 'path':'projects/edit/:id', 'element': <PanelProjectsEdit/> },
      { 'path':'projects/categories', 'element': <PanelProjectsCategories/> },
      { 'path':'projects/categories/add', 'element': <PanelProjectsCategoriesAdd/> },
      { 'path':'projects/categories/edit/:id', 'element': <PanelProjectsCategoriesEdit/> }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </HelmetProvider>
)
