import "./Plan.scss";
import axios from 'axios';

import { useState, useEffect } from 'react';
import { parseISO, format, isValid } from 'date-fns';

// recoil state
import { useRecoilState } from 'recoil';
import { tripInfoState } from '../../state/tripState';

// components
import HeroForm from "../../components/HeroForm/HeroForm";
import TravelPlanner from '../../components/TravelPlanner/TravelPlanner';
import UserTrips from '../../components/UserTrips/UserTrips';
import CTA from "../../components/CTA/CTA";
import { CopyrightFooter, Footer } from '../../components/Footer/Footer';

import heroImage from "../../assets/vector-illustrations/illustration_travel-planner.png";

// .env variables
const API_URL = process.env.REACT_APP_BACKEND_URL;

function Plan() {
  const [dayCount, setDayCount] = useState(0);
  const [showTravelPlanner, setShowTravelPlanner] = useState(false);

  const [tripInfo, setTripInfo] = useRecoilState(tripInfoState);

  const handleFormSubmit = () => {
    setShowTravelPlanner(true);
  };

  // This opens the trip planner with empty days to be able to create a new trip
  const handleSubmitClick = () => {
    const fromDate = parseISO(tripInfo.startDate);
    const toDate = parseISO(tripInfo.endDate);

    if (!isValid(fromDate) || !isValid(toDate)) {
      console.error("Invalid fromDate or toDate");
      return;
    }

    setShowTravelPlanner(true);
  };

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
    const { location, startDate, endDate, events } = tripInfo;
    const fromDate = parseISO(tripInfo.startDate);
    const toDate = parseISO(tripInfo.endDate);
    const formattedEvents = [];

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
        formattedEvents.push({
          date: key,
          event_time: event.time,
          event_type: event.type,
          event_description: event.title,
        });
      });
    });

    const tripData = {
      destination: location,
      start_date: format(fromDate, "yyyy-MM-dd"),
      end_date: format(toDate, "yyyy-MM-dd"),
      events: formattedEvents,
    };

    const response = await axios.post(`${API_URL}/plan`, tripData);

    if (response.status === 200) {
      console.log("Trip saved successfully!");
    }
  };

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

        {/* Only shows when click on submit: */}
        {showTravelPlanner && (
          <TravelPlanner
            location={tripInfo.location}
            dayCount={dayCount}
            startDate={new Date(tripInfo.startDate)}
            onSave={handleSaveTrip}
          />
        )}

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
