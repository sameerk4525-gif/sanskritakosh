"use client";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Words", value: 1240, color: "bg-blue-50" },
        { label: "Subhashits", value: 156, color: "bg-purple-50" },
        { label: "Stories", value: 42, color: "bg-green-50" },
        { label: "Active Users", value: 328, color: "bg-orange-50" },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className={`${stat.color} rounded-lg p-6`}>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <p className="text-gray-600">No recent activity</p>
            </div>
        </div>
    );
}
