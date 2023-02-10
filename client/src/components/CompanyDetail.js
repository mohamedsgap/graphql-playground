import React from "react";
import { useParams } from "react-router";
import { useCompany } from "../graphql/hooks";
import { getCompanyById } from "../graphql/query";
import JobList from "./JobList";
function CompanyDetail() {
  const { companyId } = useParams();
  // const [company, setCompany] = React.useState({});
  // React.useEffect(() => {
  //   getCompanyById(companyId).then((data) => setCompany(data.company));
  // }, [companyId]);
  const { company } = useCompany(companyId);
  console.log("useCompany", company);
  return (
    <div>
      <h1 className="title">{company?.name}</h1>
      <div className="box">{company?.description}</div>
      <h5 className="title is-5"> Jobs at {company?.name}</h5>
      <JobList jobs={company?.jobs} />
    </div>
  );
}

export default CompanyDetail;
