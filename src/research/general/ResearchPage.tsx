import MeesPage from "../mees/MeesPage";

// General research-application page (route: /research). Renders the same page
// as the Mees application but in its variant="general" form: every professor-,
// class-, and Spring-2026-specific line is removed, leaving Tommaso's journey,
// the ETH Robotics Club pipeline, the deployed policies, the academic record,
// and general research interests. Shareable with any research lab.
export default function ResearchPage() {
  return <MeesPage variant="general" />;
}
