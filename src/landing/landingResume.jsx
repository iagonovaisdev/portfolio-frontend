import React, { useContext, useEffect, useState } from 'react';

import './styles/style.scss';

import { AppContext } from '../context/AppContext/AppContext';
import AppContextProvider from '../context/AppContext/AppContextProvider';

import LandingHome from './components/templates/landingHome';
import LandingHomeAnimatedResume from './components/templates/landingHomeAnimatedResume';
import LandingTop from './components/templates/landingTop';
import LandingAboutResume from './components/templates/landingAboutResume';
import LandingRoadmap from './components/templates/landingRoadmap';
import LandingExperienceResume from './components/templates/landingExperienceResume';
import LandingPractice from './components/templates/landingPractice';
import LandingNumbers from './components/templates/landingNumbers';
import LandingProjectsResume from './components/templates/landingProjectsResume';
import LandingMore from './components/templates/landingMore';
import LandingContactResume from './components/templates/landingContactResume';
import LandingRdp from './components/templates/landingRdp';

export default function LandingResume() {

    return(
        <>  
            <AppContextProvider>
                <LandingHomeAnimatedResume/>
                <LandingAboutResume/>
                <LandingExperienceResume/>
                <LandingNumbers/>
                <LandingProjectsResume/>
                <LandingContactResume/>
            </AppContextProvider>
        </>
    );

};