import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const RouteChangeTracker = () => {
  const location = useLocation();
  // const [initialized, setInitialized] = useState(false);
  const ga4TrackingId = process.env.REACT_APP_GA4_TRACKING_ID;
  // useEffect(() => {
  //   if (!window.location.href.includes('localhost')) {
  //     ReactGA.initialize(ga4TrackingId);
  //     setInitialized(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (initialized) {
  //     ReactGA.set({ page: location.pathname });
  //     ReactGA.send('pageview');
  //   }
  // }, [initialized, location]);

  useEffect(() => {
    ReactGA.initialize(ga4TrackingId);
    // ReactGA.set({ page: location.pathname });
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
      title: 'Poodaeng',
    });
  }, [location]);
};

export default RouteChangeTracker;
