import AcceptedJobs from "./applied-jobs/AcceptedJobs"
import RejectedJobs from "./applied-jobs/RejectedJobs"
import InterviewJobs from "./applied-jobs/InterviewJobs"
import PendingJobs from "./applied-jobs/PendingJobs"

const AppliedJobs = () => {
  return (
    <div>
      <AcceptedJobs />
      <InterviewJobs />
      <RejectedJobs />
      <PendingJobs />
    </div>
  )
}

export default AppliedJobs
