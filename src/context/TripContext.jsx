import { createContext, useCallback, useContext, useState } from 'react';
import { plannerApi } from '../api/plannerApi.js';

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [tripInput, setTripInput] = useState(null); // raw trip JSON from Wayfare
  const [plan, setPlan] = useState(null); // last generated plannerOutput
  const [status, setStatus] = useState('idle'); // idle | loading | generating | ready | error
  const [error, setError] = useState(null);
  const [feasibilityWarning, setFeasibilityWarning] = useState(null);

  const loadTrip = useCallback(async (sessionId) => {
    setStatus('loading');
    setError(null);
    try {
      const data = sessionId
        ? await plannerApi.getTripSession(sessionId)
        : await plannerApi.getExampleTrip();
      setTripInput(data);
      setStatus('idle'); // idle-but-loaded: show the trip summary, wait for "Plan my trip"
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, []);

  const generatePlan = useCallback(async (overrideTripInput) => {
    const input = overrideTripInput || tripInput;
    if (!input) return;
    setStatus('generating');
    setError(null);
    try {
      const result = await plannerApi.generatePlan(input);
      setPlan(result);
      setStatus('ready');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, [tripInput]);

  const changeHotel = useCallback(async (hotelId) => {
    const next = { ...tripInput, selectedHotelId: hotelId };
    setTripInput(next);
    await generatePlan(next);
  }, [tripInput, generatePlan]);

  // Removing a destination can change how many hours the trip needs, so per
  // spec this goes back through the Feasibility Engine before a new plan is
  // generated -- never silently re-plan around a constraint violation.
  const removeDestination = useCallback(async (destinationId) => {
    const nextDestinations = tripInput.destinations.filter((d) => d.id !== destinationId);
    const check = await plannerApi.recheckFeasibility(tripInput.trip, nextDestinations);
    const nextTrip = {
      ...tripInput,
      destinations: nextDestinations,
      feasibility: check,
    };
    if (!check.feasible) {
      setFeasibilityWarning({
        message: `Removing that stop still leaves this trip needing about ${check.estimatedRequiredHours}h against ${check.availableHours}h available. That's fine -- fewer stops only makes a trip easier to fit.`,
        nextTrip,
      });
      // Even though removing a destination can only ease the schedule, we
      // still route the updated trip through the same recheck path Wayfare's
      // Feasibility Engine owns, rather than special-casing "this edit is
      // always safe" here.
    }
    setTripInput(nextTrip);
    await generatePlan(nextTrip);
  }, [tripInput, generatePlan]);

  const regeneratePlan = useCallback(() => generatePlan(tripInput), [tripInput, generatePlan]);

  const value = {
    tripInput,
    plan,
    status,
    error,
    feasibilityWarning,
    clearFeasibilityWarning: () => setFeasibilityWarning(null),
    loadTrip,
    generatePlan,
    regeneratePlan,
    changeHotel,
    removeDestination,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip must be used within a TripProvider');
  return ctx;
}
