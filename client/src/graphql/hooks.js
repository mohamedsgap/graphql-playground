import { useMutation, useQuery } from "@apollo/client";
import {
  JOBS_QUERY,
  JOB_QUERY,
  COMPANY_QUERY,
  CREATE_JOB_MUTATION,
} from "./query";
import { getAccessToken } from "../auth";

export function useJobs() {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: "network-only",
  });
  return {
    jobs: data?.jobs,
    loading,
    error: Boolean(error),
  };
}

export function useJob(id) {
  const { data, loading, error } = useQuery(JOB_QUERY, {
    fetchPolicy: "network-only",
    variables: { id },
  });
  return {
    job: data?.job,
    loading,
    error: Boolean(error),
  };
}

export function useCompany(id) {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });
  console.log("useComapny", data, loading, error, id);
  return {
    company: data?.company,
    loading,
    error: Boolean(error),
  };
}

export function useCreateJob(title, description) {
  const headers = { Authorization: "Bearer " + getAccessToken() };
  const [mutate] = useMutation(CREATE_JOB_MUTATION);
  console.log("useCreateJob", title, description);
  return {
    createJob: async (title, description) => {
      const {
        data: { job },
      } = await mutate({
        variables: { input: { title, description } },
        context: { headers },
        update: (cache, { data: { job } }) => {
          cache.writeQuery({
            query: JOB_QUERY,
            variables: { id: job.id },
            data: { job },
          });
        },
      });
      return job;
    },
  };
}
