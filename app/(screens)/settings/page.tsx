export default function Settings() {
  return (
    <div className="w-1/2">
      <p className="text-2xl">Profile Information</p>
      <div className="basic mt-8 space-y-8">
        <div className="name grid grid-cols-2">
          <label className="text-lg font-semibold text-slate-800">Name</label>
          <span className="text-base">Hospital Management</span>
        </div>
        <div className="contact grid grid-cols-2">
          <label className="text-lg font-semibold text-slate-800">
            Telephone
          </label>
          <span className="text-base">+27 15 234 5678</span>
        </div>
        <div className="conact grid grid-cols-2">
          <label className="text-lg font-semibold text-slate-800">
            Address
          </label>
          <div className="address text-base">
            <div className="street">Tzaneen Road and University Street</div>
            <div className="city-state-zip">
              Mankweng Township, Polokwane, Limpopo Province
            </div>
            <div className="university">
              University of Limpopo, Turfloop Campus
            </div>
            <div className="postal-code">Sovenga, 0727</div>
          </div>
        </div>
        <div className="about grid grid-cols-2">
          <label className="text-lg font-semibold text-slate-800">About</label>
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
