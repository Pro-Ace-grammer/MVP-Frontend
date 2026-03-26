import { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export default function FranchiseTabs({ franchiseData }) {
  const [activeTab, setActiveTab] = useState("Business Overview");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    if (activeTab !== "Business Overview") return;
    if (!chartRef.current) return;
    
    const ctx = chartRef.current.getContext("2d");
 
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Sales",
            data: [5000, 7000, 12000, 18000, 23000, 26000],
            borderWidth: 3,
            borderColor: "#2563eb",
            tension: 0.4,
          },
          {
            label: "Expenses",
            data: [3000, 4000, 6000, 9000, 14000, 17000],
            borderWidth: 3,
            borderColor: "#10b981",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#444" },
          },
        },
        scales: {
          x: { ticks: { color: "#444" } },
          y: { ticks: { color: "#444" } },
        },
      },
    });
 
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [activeTab]);

  return (
    <div className="w-full rounded-3xl p-8 flex flex-col bg-white">

      {/* ================= TABS HEADER ================= */}
      <div className="flex text-xl font-semibold text-gray-700">
        {["Business Overview", "Investment requirement", "Operation"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 w-1/3 rounded-t-2xl transition-all
                ${
                  activeTab === tab
                    ? "bg-blue-50 text-[#268BFF]"
                    : "bg-white text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="bg-blue-50 p-8 rounded-b-2xl">

        {/* ================================================= */}
        {/* =============== BUSINESS OVERVIEW =============== */}
        {/* ================================================= */}
        {activeTab === "Operation" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Left */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg">Sector</h3>
                <p className="text-gray-700 mt-2">
                  {typeof franchiseData?.data?.operation?.sector === "string" ? franchiseData.data.operation.sector : "Not specified"}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg">Service</h3>
                {Array.isArray(franchiseData?.data?.operation?.service) && franchiseData.data.operation.service.length > 0 ? (
                  <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
                    {franchiseData.data.operation.service.map((service, index) => (
                      <li key={index}>{typeof service === "string" ? service : ""}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 mt-2">
                    {typeof franchiseData?.data?.operation?.required_property === "string" ? franchiseData.data.operation.required_property : "Not specified"}
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-bold text-lg">Qualifications Required</h3>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  {typeof franchiseData?.data?.operation?.qualification_required === "string" ? franchiseData.data.operation.qualification_required : "Not specified"}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg">Staff Required</h3>
                <p className="text-gray-700 mt-2">
                  {franchiseData?.data?.operation?.staff_required && typeof franchiseData.data.operation.staff_required === "object"
                    ? `${franchiseData.data.operation.staff_required.min || 0} – ${franchiseData.data.operation.staff_required.max || 0} staff members`
                    : "Not specified"}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg">
                  Is absentee ownership allowed?
                </h3>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  {typeof franchiseData?.data?.operation?.is_absentee_ownership_allowed === "string" ? franchiseData.data.operation.is_absentee_ownership_allowed : "Not specified"}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Can this franchise be run from home/mobile?
                </h3>
                <p className="text-gray-700 mt-2">
                  {typeof franchiseData?.data?.operation?.can_be_run_from_home_or_mobile === "string" ? franchiseData.data.operation.can_be_run_from_home_or_mobile : "Not specified"}
                </p>
              </div>


            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* ============ INVESTMENT REQUIREMENT ============= */}
        {/* ================================================= */}
        {activeTab === "Investment requirement" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Left */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg">Initial Investment</h3>
                <p className="text-gray-700 mt-2">
                  {franchiseData?.data?.investment_details?.initial_investment 
                    ? (typeof franchiseData.data.investment_details.initial_investment === 'object'
                        ? `₹${franchiseData.data.investment_details.initial_investment.min || 0} – ₹${franchiseData.data.investment_details.initial_investment.max || 0} ${franchiseData.data.investment_details.initial_investment.unit || ""}`
                        : franchiseData.data.investment_details.initial_investment)
                    : "Not specified"}
                </p>
                {franchiseData?.data?.investment_details?.initial_investment?.notes && (
                  <p className="text-gray-600 text-sm mt-1">
                    {typeof franchiseData.data.investment_details.initial_investment.notes === 'string' ? franchiseData.data.investment_details.initial_investment.notes : ""}
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-bold text-lg">Investment Breakdown</h3>
                <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
                  {(franchiseData?.data?.investment_details?.investment_breakdown || []).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg">Franchise Fee</h3>
                <p className="text-gray-700 mt-2">
                  {franchiseData?.data?.investment_details?.franchise_fee 
                    ? (typeof franchiseData.data.investment_details.franchise_fee === 'object'
                        ? `₹${franchiseData.data.investment_details.franchise_fee.min || 0} to ₹${franchiseData.data.investment_details.franchise_fee.max || 0} ${franchiseData.data.investment_details.franchise_fee.unit || ""}`
                        : franchiseData.data.investment_details.franchise_fee)
                    : "Not specified"}
                </p>
              </div>


            </div>

            {/* Right */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg">Required Property Location</h3>
                <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
                  {(franchiseData?.data?.investment_details?.required_property_location || []).map((location, index) => (
                    <li key={index}>{location}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Floor Area (Single Unit)
                </h3>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  {franchiseData?.data?.investment_details?.floor_area 
                    ? (typeof franchiseData.data.investment_details.floor_area === 'object'
                        ? `${franchiseData.data.investment_details.floor_area.min || 0} – ${franchiseData.data.investment_details.floor_area.max || 0} ${franchiseData.data.investment_details.floor_area.unit || ""}`
                        : franchiseData.data.investment_details.floor_area)
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* =================== OPERATION =================== */}
        {/* ================================================= */}
        {activeTab === "Business Overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Left */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg">Products</h3>
                <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
                  {Array.isArray(franchiseData?.data?.business_overview?.products) && (franchiseData?.data?.business_overview?.products || []).map((product, index) => (
                    <li key={index}>{typeof product === "string" ? product : ""}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg">Services</h3>
                <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
                  {Array.isArray(franchiseData?.data?.business_overview?.services) && (franchiseData?.data?.business_overview?.services || []).map((service, index) => (
                    <li key={index}>{typeof service === "string" ? service : ""}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg">Training & Support</h3>
              <div className="text-gray-700 leading-relaxed space-y-2">
                {franchiseData?.data?.business_overview?.training_and_support ? (
                  <>
                    {franchiseData.data.business_overview.training_and_support.franchisee_training_program && (
                      <p>✓ Franchisee Training Program</p>
                    )}
                    {franchiseData.data.business_overview.training_and_support.classroom_training && (
                      <p>✓ Classroom Training</p>
                    )}
                    {franchiseData.data.business_overview.training_and_support.on_the_job_training && (
                      <p>✓ On-the-Job Training</p>
                    )}
                    {franchiseData.data.business_overview.training_and_support.field_assistance && (
                      <p>✓ Field Assistance</p>
                    )}
                    {franchiseData.data.business_overview.training_and_support.marketing_support && (
                      <p>✓ Marketing Support</p>
                    )}
                    {franchiseData.data.business_overview.training_and_support.ongoing_support && (
                      <p>✓ Ongoing Support</p>
                    )}
                  </>
                ) : (
                  <p>Training and support information not available.</p>
                )}
              </div>

              {/* <div className="bg-white rounded-2xl shadow p-6 w-full h-[20rem]">
                <canvas ref={chartRef}></canvas>
              </div> */}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
