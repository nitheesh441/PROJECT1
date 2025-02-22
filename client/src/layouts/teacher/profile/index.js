/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/teacher/profile/components/Header";
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { sroutes, troutes, proutes } from 'routes';
import brand from "assets/images/logo-ct.png";
import Sidenav from "examples/Sidenav";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
// Data


// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";

import team4 from "assets/images/team-4.jpg";
const API_URL = process.env.REACT_APP_SERVER_URL; 

function TProfile() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [profileData, setProfileData] = useState(null);
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {

        const decodedToken = jwtDecode(authToken);


        const { staffid, usertype } = decodedToken;
        

        const fetchProfile = async () => {
          try {
            const response = await axios.post(`${API_URL}/faculty/facultyget`, { staffid });
            console.log(response.data);
            setProfileData(response.data);
            
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        };

        fetchProfile();
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    } else {
      console.error('JWT token not found');
    }
  }, []);



  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };




  return (
    <DashboardLayout>
      <Sidenav
        color={sidenavColor}
        brand={brand}
        brandName="Exam Portal"
        routes={troutes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
         <Header
        fullName={profileData?.fullName}
        course={profileData?.dept}
        staffid={profileData?.staffid}
      />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={12} xl={12}>
            <ProfileInfoCard
              title="profile information"
              info={{
                fullName: profileData?.fullName || "",
                course: profileData?.dept || "",
                dob: formatDate(profileData?.dob) || "",
                fatherName: profileData?.fatherName || "",
              
                address: profileData?.address || "",
                mobile: profileData?.mobile || "",
                bloodgroup: profileData?.bloodGroup || "",
              }}

              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>

        </Grid>
      </SoftBox>


      <Footer />
    </DashboardLayout>
  );
}

export default TProfile;
