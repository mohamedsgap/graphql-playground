import { Job, Company } from "./db.js";
export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    job: (_root, args) => Job.findById(args.id),
    company: (_root, args) => Company.findById(args.id),
  },
  Mutation: {
    createJob: (_root, { input }, user) => {
      console.log("khraaa123", user);
      if (!user) {
        console.log("khraaa", user);
        throw new Error("Unautharized");
      }
      return Job.create({
        ...input,
        companyId: user.companyId,
      });
    },
    deleteJob: (_root, { jobId }) => Job.delete(jobId),
    updateJob: (_root, { input }) => Job.update(input),
  },
  Job: {
    company: (job) => {
      return Company.findById(job.companyId);
    },
  },
  Company: {
    jobs: (company) => {
      return Job.findAll((job) => job.companyId == company.id);
    },
  },
};
