import "./Plan.scss";

import { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';

import HeroForm from "../../components/HeroForm/HeroForm";
import TravelPlanner from '../../components/TravelPlanner/TravelPlanner';
import CTA from "../../components/CTA/CTA";
import Header from '../../components/Header/Header';
import { CopyrightFooter, Footer } from '../../components/Footer/Footer';

import heroImage from "../../assets/vector-illustrations/illustration_travel-planner.png";

function Plan() {
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dayCount, setDayCount] = useState(0);

  const [showTravelPlanner, setShowTravelPlanner] = useState(false);

  const handleSubmitClick = (location, fromDate, toDate) => {
    setLocation(location);
    setFromDate(parseISO(fromDate));
    setToDate(parseISO(toDate));
    setShowTravelPlanner(true);
  };

  useEffect(() => {
    if (fromDate && toDate) {
      const date1 = new Date(fromDate);
      const date2 = new Date(toDate);
      date2.setDate(date2.getDate() + 1); // add one day to toDate
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDayCount(diffDays);
    }
  }, [fromDate, toDate]);

  return (
    <div>
      <main>
        <HeroForm
          subtitle={"Easily Plan Your Next Trip"}
          title={"Travel Planner"}
          image={heroImage}
          onSubmitClick={handleSubmitClick}
        />

        {/* Only shows when click on submit: */}
        {showTravelPlanner && <TravelPlanner location={location} dayCount={dayCount} startDate={new Date(fromDate)} />}

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
