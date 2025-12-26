import React, { useContext, useEffect, useState } from 'react';
import './styles/style.scss';

import { AppContext } from '../context/AppContext/AppContext';
import AppContextProvider from '../context/AppContext/AppContextProvider';

import LandingHome from './components/templates/landingHome';
import LandingHomeAnimated from './components/templates/landingHomeAnimated';
import LandingTop from './components/templates/landingTop';
import LandingAbout from './components/templates/landingAbout';
import LandingRoadmap from './components/templates/landingRoadmap';
import LandingExperience from './components/templates/landingExperience';
import LandingPractice from './components/templates/landingPractice';
import LandingNumbers from './components/templates/landingNumbers';
import LandingProjects from './components/templates/landingProjects';
import LandingMore from './components/templates/landingMore';
import LandingContact from './components/templates/landingContact';
import LandingRdp from './components/templates/landingRdp';

export default function Blank() {

    return(
        <>  
        </>
    );

};