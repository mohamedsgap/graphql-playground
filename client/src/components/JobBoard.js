import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import JobList from "./JobList";
// import { jobs } from "../fake-data";
// import { getJobs } from "../graphql/query";
import { useJobs } from "../graphql/hooks";
function JobBoard() {
  // old way of uing apoolo client
  // const [jobs, setJobs] = useState([]);
  // const [err, setErr] = useState(false);
  // useEffect(() => {
  //   getJobs()
  //     .then((data) => setJobs(data.jobs))
  //     .catch((error) => setErr(true));
  // }, []);
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>sorry, something went wrong</p>;
  }
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
