/**
 * CounterSection — legacy component from the old Inspire PC site.
 *
 * Previously rendered four animated stat counters with hardcoded numbers
 * ("150+ Builds Completed", "100% Client Satisfaction", etc.) — those
 * were inherited from the PC-build era and didn't survive the brand
 * pivot. The component is no longer imported anywhere; this stub exists
 * only so the file can be deleted in a future cleanup without a build
 * regression.
 *
 * If counters come back, they should be data-driven (from the portfolio
 * catalog or a real Postgres query), not hardcoded.
 */
export default function CounterSection() {
  return null;
}
