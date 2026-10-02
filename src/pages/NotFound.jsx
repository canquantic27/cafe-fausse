import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import usePageTitle from "../components/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className="page-section center">
      <PageHeading eyebrow="Oops" title="This table is empty">
        We couldn't find the page you were looking for. Let's get you back to something delicious.
      </PageHeading>
      <Link to="/" className="btn btn-primary">Back to the home page</Link>
    </section>
  );
}
