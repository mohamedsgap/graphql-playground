import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getJobId } from "../graphql/query";
import { useJob } from "../graphql/hooks";
function JobDetail() {
  const { jobId } = useParams();
  // const [job, setJob] = React.useState({});
  // React.useEffect(() => {
  //   getJobId(jobId).then((data) => setJob(data.job));
  // }, [jobId]);
  const { job } = useJob(jobId);
  return (
    <div>
      <h1 className="title">{job?.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job?.company?.id}`}>{job?.company?.name}</Link>
      </h2>
      <div className="box">{job?.description}</div>
    </div>
  );
}

export default JobDetail;
