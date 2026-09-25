import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TripProvider, useTrip } from '../context/TripContext.jsx';
import { plannerApi } from '../api/plannerApi.js';
import TripSummaryCard from '../components/TripSummaryCard.jsx';
import HotelRecommendationCard from '../components/HotelRecommendationCard.jsx';
import HotelPickerList from '../components/HotelPickerList.jsx';
import DayTabs from '../components/DayTabs.jsx';
import ControlsBar from '../components/ControlsBar.jsx';
import WarningBanner from '../components/WarningBanner.jsx';
import LoadingState from '../components/LoadingState.jsx';

export default function PlannerPage() {
  return (
    <TripProvider>
      <PlannerPageInner />
    </TripProvider>
  );
}

function PlannerPageInner() {
  const { sessionId } = useParams();
  const {
    tripInput,
    plan,
    status,
    error,
    feasibilityWarning,
    clearFeasibilityWarning,
    loadTrip,
    generatePlan,
    regeneratePlan,
    changeHotel,
    removeDestination,
  } = useTrip();

  const [showHotelPicker, setShowHotelPicker] = useState(false);
  const [hotelOptions, setHotelOptions] = useState(null);

  useEffect(() => {
    loadTrip(sessionId);
  }, [sessionId, loadTrip]);

  async function openHotelPicker() {
    const { hotels } = await plannerApi.rankHotels(tripInput);
    setHotelOptions(hotels);
    setShowHotelPicker(true);
  }

  async function handleSelectHotel(hotelId) {
    setShowHotelPicker(false);
    await changeHotel(hotelId);
  }

  if (status === 'loading' || !tripInput) {
    return (
      <Shell>
        <LoadingState label="Loading your trip…" />
      </Shell>
    );
  }

  if (status === 'error' && !plan) {
    return (
      <Shell>
        <WarningBanner messages={[error || 'Something went wrong loading this trip.']} />
      </Shell>
    );
  }

  return (
    <Shell>
      <TripSummaryCard
        trip={{ ...tripInput.trip, budget: plan?.tripSummary?.budget }}
        destinationCount={tripInput.destinations.length}
        intro={plan?.tripSummary?.intro}
      />

      {plan?.tripSummary?.warnings?.length > 0 && (
        <WarningBanner messages={plan.tripSummary.warnings} />
      )}
      {feasibilityWarning && (
        <WarningBanner messages={[feasibilityWarning.message]} onDismiss={clearFeasibilityWarning} />
      )}

      {!plan ? (
        <div className="text-center py-6">
          <button
            type="button"
            onClick={() => generatePlan()}
            disabled={status === 'generating'}
            className="px-6 py-3 rounded-ticket bg-stamp text-paper font-display font-semibold hover:bg-stamp/90 disabled:opacity-50"
          >
            {status === 'generating' ? 'Planning your trip…' : 'Plan my trip'}
          </button>
        </div>
      ) : (
        <>
          <ControlsBar
            onRegenerate={regeneratePlan}
            onChangeHotel={openHotelPicker}
            regenerating={status === 'generating'}
          />

          {showHotelPicker && hotelOptions && (
            <HotelPickerList
              hotels={hotelOptions}
              currentHotelId={plan.hotelRecommendation.hotelId}
              onSelect={handleSelectHotel}
              onClose={() => setShowHotelPicker(false)}
            />
          )}

          <HotelRecommendationCard hotel={plan.hotelRecommendation} onChangeHotel={openHotelPicker} />

          {status === 'generating' ? (
            <LoadingState label="Rebuilding your timeline…" />
          ) : (
            <DayTabs days={plan.days} onRemoveDestination={removeDestination} />
          )}
        </>
      )}
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-rule bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2">
          <span className="font-display text-lg font-bold text-stamp">Wayfare</span>
          <span className="text-inkfade text-sm">AI trip planner</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">{children}</main>
    </div>
  );
}
