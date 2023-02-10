import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { getAccessToken } from "../auth";
const GRAPHQL_URL = "http://localhost:9000/graphql";

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  //   defaultOptions: {
  //     query: {
  //       fetchPolicy: "network-only",
  //     },
  //     mutate: {
  //       fetchPolicy: "network-only",
  //     },
  //     watchQuery: {
  //       fetchPolicy: "network-only",
  //     },
  //   },
});

export const JOBS_QUERY = gql`
  query {
    jobs {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
`;

const JOB_DETAIL_FRAGMENT = gql`
  fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

export const JOB_QUERY = gql`
  query ($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

export const COMPANY_QUERY = gql`
  query companyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
`;

export const CREATE_JOB_MUTATION = gql`
  mutation CreateJobMutation($input: CreateJobInput!) {
    job: createJob(input: $input) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }
`;

export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        title
        description
        company {
          id
          name
        }
      }
    }
  `;
  const { data } = await client.query({ query });
  return data;
}

export async function getJobId(jobId) {
  const query = gql`
    query ($id: ID!) {
      job(id: $id) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;
  const variables = { id: jobId };
  const { data } = await client.query({ query, variables });
  return data;
}

export async function getCompanyById(compId) {
  const query = gql`
    query ($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }
  `;
  const variables = { id: compId };
  const { data } = await client.query({ query, variables });

  return data;
}

export async function createJob(input) {
  const mutation = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;
  const variables = { input };
  const headers = { Authorization: "Bearer " + getAccessToken() };
  const context = { headers };
  const {
    data: { job },
  } = await client.mutate({
    mutation,
    variables,
    context,
    update: (cache, { data: { job } }) => {
      console.log("test", cache, { data: { job } });
      cache.writeQuery({
        query: JOB_QUERY,
        variables: { id: job.id },
        data: { job },
      });
    },
  });
  console.log("createjob", job);
  return job;
}
