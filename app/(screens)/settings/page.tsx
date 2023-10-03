export default function Settings() {
  return (
    <div className="w-1/2">
      <p className="text-2xl">Basic Information</p>
      <div className="basic mt-8 space-y-8">
        <div className="name flex flex-col space-y-2">
          <label className="text-xl font-semibold text-slate-800">Name</label>
          <span className="text-base">Hospital Management</span>
        </div>
        <div className="contact flex flex-col space-y-2">
          <label className="text-xl font-semibold text-slate-800">
            Contact
          </label>
          <span className="text-base">+27 15 234 5678</span>
        </div>
        <div className="conact flex flex-col space-y-2">
          <label className="text-xl font-semibold text-slate-800">
            Address
          </label>
          <span className="text-base"></span>
        </div>
        <div className="about flex flex-col space-y-2">
          <label className="text-xl font-semibold text-slate-800">About</label>
          <span className="text-base">
            Hospital management system: A software solution that helps hospitals
            manage all aspects of their operations, from patient care to
            financial management, to improve patient care, reduce costs, and
            increase revenue.
          </span>
        </div>
      </div>
    </div>
  )
}
