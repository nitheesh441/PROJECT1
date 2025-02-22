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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import ivancik from "assets/images/ivancik.jpg";
import bg1 from "assets/images/bg1.jpg";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_SERVER_URL; 

function ExamInfo() {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    const fetchexam = async () => {
      try {
        const response = await axios.get(`${API_URL}/dash/upexam`);
        if (response.data) {
          setNotices(response.data);
         
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchexam();
  }, []);
  return (
    <Card sx={{ height: "50%" }}>
      <SoftBox position="relative" height="100%" p={2}>
        <SoftBox
          display="flex"
          flexDirection="column"
          height="100%"
          py={2}
          px={2}
          borderRadius="lg"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${bg1})`,
            backgroundSize: "cover",
          }}
        >
          <SoftBox mb={3} pt={1}>
            <SoftTypography variant="h3" color="white" fontWeight="bold">
             Upcoming Exams
            </SoftTypography>
          </SoftBox>
          {notices.length > 0 ? (
        notices.map((notice) => (
          <SoftBox key={notice._id} mb={2}>
            <SoftTypography variant="body2" color="white">
           <b> {notice.examName}</b>   is Scheduled in the Timetable.
            </SoftTypography>
          </SoftBox>
        ))
      ) : (
        <SoftBox  mb={2}>
        <SoftTypography variant="body2" color="white">
         No Exams Scheduled at this time.
        </SoftTypography>
      </SoftBox>
      )}
          <SoftTypography
          
          component={Link} to="/pexams"
          
            variant="button"
            color="white"
            fontWeight="medium"
           
            sx={{
              mt: "auto",
              mr: "auto",
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",

              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translate(2px, -0.5px)`,
                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
              },

              "&:hover .material-icons-round, &:focus  .material-icons-round": {
                transform: `translate(6px, -0.5px)`,
              },
            }}
          >
            Read More
            <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </Card>
    
  );
}

export default ExamInfo;
