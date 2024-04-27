import "./Plan.scss";
import axios from 'axios';

import { useState, useEffect, useRef } from 'react';
import { parseISO, format, isValid } from 'date-fns';

// recoil state
import { useRecoilState } from 'recoil';
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
  const userTripsRef = useRef(null);

  const [tripInfo, setTripInfo] = useRecoilState(tripInfoState);
  const [viewTripDetails, setViewTripDetails] = useRecoilState(viewTripState);
  const [userTripsUpdate, setUserTripsUpdate] = useState(0); // To trigger re-render of UserTrips
  const [viewTripClicked, setViewTripClicked] = useState(false); // Used for scroll behaviour
  const [updateFeedback, setUpdateFeedback] = useState({ message: '', type: '' });

  const [isLoading, setIsLoading] = useState();

  // This handles the form submit on the hero form
  const handleFormSubmit = () => {
    setShowTravelPlanner(true);
    setViewTripDetails(null);
    setTripInfo(prevState => ({
      ...prevState,
      events: {},
      notes: null
    }));
  };

  const handleNotesUpdate = (newNotes) => {
    setTripInfo(prevState => ({ ...prevState, notes: newNotes }));
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

  // POST This handles the save click on the trip planner and creates a new trip on db
  const handleSaveTrip = async () => { 
    setIsLoading(true);
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    const userId = userData ? userData.user_id : null;

    const { location, notes, events } = tripInfo;
    const fromDate = parseISO(tripInfo.startDate);
    const toDate = parseISO(tripInfo.endDate);

    if (!userId) {
      console.error("User ID is missing");
      setIsLoading(false);
      return;
    }

    if (!isValid(fromDate) || !isValid(toDate)) {
      console.error("Invalid startDate or endDate");
      setIsLoading(false);
      return;
    }
    
    const formattedEvents = [];
    Object.entries(events).forEach(([date, dayEvents]) => {
      dayEvents.forEach(event => {
        formattedEvents.push({
          date: date,
          event_time: event.time,
          event_type: event.type,
          event_description: event.title,
        });
      });
    });

    const tripData = {
      user_id: userId,
      destination: location,
      start_date: format(parseISO(tripInfo.startDate), "yyyy-MM-dd"),
      end_date: format(parseISO(tripInfo.endDate), "yyyy-MM-dd"),
      notes: notes,
      events: formattedEvents,
    };  

    try {
      await axios.post(`${API_URL}/plan`, tripData, { withCredentials: true });
      console.log("Trip saved successfully!");
      localStorage.setItem('hasTrips', 'true');
      setShowTravelPlanner(false);
      setUserTripsUpdate(prev => prev + 1); // Triggers re-render of UserTrips
      userTripsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error("Error saving trip:", error.response ? error.response.data : error);
    } finally {
      setIsLoading(false);
    }
  };

  // PUT This handles the update click on the trip planner and updates the trip on db
  const handleUpdateTrip = async () => {  
    setIsLoading(true);
    // Only filter out events that have been deleted (those without event_id and tempId)
    const filteredEvents = viewTripDetails.events.filter(event => event.event_id || event.tempId);

    const updatedTripDetails = {
      ...viewTripDetails,
      events: filteredEvents.map(event => {
        const { tempId, ...eventData } = event;
        return eventData;
      }),
      notes: viewTripDetails.notes,
    };

    try {
      const response = await axios.put(`${API_URL}/plan/${viewTripDetails.trip_id}`, updatedTripDetails);
      console.log("Trip updated successfully:", response.data);
      setUpdateFeedback({ message: 'Trip updated!', type: 'success' });
    } catch (error) {
      console.error("Error updating trip:", error);
      setUpdateFeedback({ message: 'Error updating trip.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to TravelPlanner or TravelPlannerView when become visible
  useEffect(() => {
    if (showTravelPlanner && travelPlannerRef.current) {
      travelPlannerRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (viewTripDetails && travelPlannerViewRef.current) {
      travelPlannerViewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line
  }, [showTravelPlanner, viewTripClicked, travelPlannerRef, travelPlannerViewRef]);

  // Check if viewTripDetails is valid
  const hasTripDetails = viewTripDetails && Array.isArray(viewTripDetails.events) && viewTripDetails.events.length > 0;

  // Resets feedback message after 3 seconds
  useEffect(() => {
    if (updateFeedback.message) {
      const timer = setTimeout(() => {
        setUpdateFeedback({ message: '', type: '' });
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [updateFeedback]);

  return (
    <div className="plan-page">
      <main>
        <HeroForm
          subtitle={"Easily Plan Your Next Trip"}
          title={"Travel Planner"}
          image={heroImage}
          onFormSubmit={handleFormSubmit}
        />

        {/* User Trips */}
        <div ref={userTripsRef}>
          <UserTrips key={userTripsUpdate} setViewTripClicked={setViewTripClicked} />
        </div>

        {/* Only shows if form filled or view trip clicked */}
        {hasTripDetails ?
          <div ref={travelPlannerViewRef}>
            <TravelPlannerView
            onUpdate={handleUpdateTrip}
            updateFeedback={updateFeedback}
            isLoading={isLoading}
          />
          </div>
        :
          (showTravelPlanner && (
            <div ref={travelPlannerRef}>
              <TravelPlanner
                dayCount={dayCount}
                notes={tripInfo.notes}
                onNotesChange={handleNotesUpdate}
                onSave={handleSaveTrip}
                isLoading={isLoading}
              />
            </div>
          ))
        }

        <CTA
          title={"Need A Recommendation?"}
          text={"Your perfect destination, one click away"}
          buttonText={"Recommend Me"}
          to='/recommend'
        />
      </main>
      <Footer />
      <CopyrightFooter />
    </div>
  );
}

export default Plan;
