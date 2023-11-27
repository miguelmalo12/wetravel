import "./Plan.scss";
import axios from 'axios';

import { useState, useEffect, useRef } from 'react';
import { parseISO, format, isValid } from 'date-fns';

// recoil state
import { useRecoilState, useRecoilValue } from 'recoil';
import { tripInfoState } from '../../state/tripState';
import { viewTripState } from "../../state/viewTripState";

// components
import HeroForm from "../../components/HeroForm/HeroForm";
import TravelPlanner from '../../components/TravelPlanner/TravelPlanner';
import TravelPlannerView from '../../components/TravelPlanner/TravelPlannerView';
import UserTrips from '../../components/UserTrips/UserTrips';
import CTA from "../../components/CTA/CTA";
import { CopyrightFooter, Footer } from '../../components/Footer/Footer';

import heroImage from "../../assets/vector-illustrations/illustration_travel-planner.png";

// .env variables
const API_URL = process.env.REACT_APP_BACKEND_URL;

function Plan() {
  const [dayCount, setDayCount] = useState(0);
  const [showTravelPlanner, setShowTravelPlanner] = useState(false);
  const travelPlannerRef = useRef(null);
  const travelPlannerViewRef = useRef(null);

  const [tripInfo, setTripInfo] = useRecoilState(tripInfoState);
  const [viewTripDetails, setViewTripDetails] = useRecoilState(viewTripState);

  const handleFormSubmit = () => {
    setShowTravelPlanner(true);
    setViewTripDetails(null);
  };

  // Calculates the number of days between the start and end date for TravelPlanner
  useEffect(() => {
    if (tripInfo.startDate && tripInfo.endDate) {
      const date1 = new Date(tripInfo.startDate);
      const date2 = new Date(tripInfo.endDate);
      date2.setDate(date2.getDate() + 1); // add one day to toDate
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDayCount(diffDays);
    }
  }, [tripInfo.startDate, tripInfo.endDate]);

  // This handles the save click on the trip planner and creates a new trip on db
  const handleSaveTrip = async () => { 
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    const userId = userData ? userData.user_id : null;
    const { location, startDate, endDate, events } = tripInfo;
    const fromDate = parseISO(tripInfo.startDate);
    const toDate = parseISO(tripInfo.endDate);
    const formattedEvents = [];

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    if (!isValid(fromDate) || !isValid(toDate)) {
      console.error("Invalid startDate or endDate");
      return;
    }

    Object.entries(events).forEach(([key, dayEvents]) => {
      dayEvents.forEach((event) => {
        if (!isValid(new Date(key))) {
          console.error("Invalid event date", key);
          return;
        }

        // Convert event date to ISO format
        const eventDateISO = format(new Date(key), "yyyy-MM-dd");

        // Convert event time to 24-hour format
        const eventTime24Hour = convertTo24HourFormat(event.time);
    
        formattedEvents.push({
          date: eventDateISO,
          event_time: eventTime24Hour,
          event_type: event.type,
          event_description: event.title,
        });
      });
    });

    const tripData = {
      user_id: userId,
      destination: location,
      start_date: format(fromDate, "yyyy-MM-dd"),
      end_date: format(toDate, "yyyy-MM-dd"),
      events: formattedEvents,
    };
    console.log("tripData", tripData);
    try {
      await axios.post(`${API_URL}/plan`, tripData, {
        withCredentials: true,
      });
      console.log("Trip saved successfully!");
    } catch (error) {
      console.error("Error saving trip:", error.response ? error.response.data : error);
    }
  };

  // Helper function to convert 12-hour format to 24-hour format
  function convertTo24HourFormat(timeString) {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  }

  // Scroll to TravelPlanner or TravelPlannerView when become visible
  useEffect(() => {
    if (showTravelPlanner && travelPlannerRef.current) {
      travelPlannerRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (viewTripDetails && travelPlannerViewRef.current) {
      travelPlannerViewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showTravelPlanner, viewTripDetails, travelPlannerRef, travelPlannerViewRef]);

  // Check if viewTripDetails is valid
  const hasTripDetails = viewTripDetails && Array.isArray(viewTripDetails.events) && viewTripDetails.events.length > 0;


  return (
    <div>
      <main>
        <HeroForm
          subtitle={"Easily Plan Your Next Trip"}
          title={"Travel Planner"}
          image={heroImage}
          onFormSubmit={handleFormSubmit}
        />

        {/* User Trips - Work In Progress */}
        <UserTrips />

        {/* Only shows if form filled or view trip clicked */}
        {hasTripDetails ?
          <div ref={travelPlannerViewRef}>
            <TravelPlannerView
            tripDetails={viewTripDetails}
            onSave={handleSaveTrip}
            // other props
          />
          </div>
        :
          (showTravelPlanner && (
            <div ref={travelPlannerRef}>
              <TravelPlanner
                location={tripInfo.location}
                dayCount={dayCount}
                startDate={new Date(tripInfo.startDate)}
                onSave={handleSaveTrip}
              />
            </div>
          ))
        }

        <CTA
          title={"Need A Recommendation?"}
          text={"Your perfect destination, one click away"}
          buttonText={"Recommend Me"}
        />
      </main>
      <Footer />
      <CopyrightFooter />
    </div>
  );
}

export default Plan;
