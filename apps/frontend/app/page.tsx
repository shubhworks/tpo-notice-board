import NotificationManager from "@/components/NotificationManager";

// Mock data fetcher (Replace with real fetch from your Express API)
async function getNotices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices`, { cache: 'no-store' });
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.warn('Failed to fetch notices from backend:', error);
  }
  // Return dummy data if backend is not available
  return [
    { id: 1, title: "Google Hiring 2026", content: "Form link attached. CTC 25LPA. Deadline tomorrow.", date: "10 mins ago" },
    { id: 2, title: "TCS Ninja Results", content: "Check the attached PDF list for selected students.", date: "2 hours ago" },
  ];
}

export default async function Home() {
  const notices = await getNotices();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <NotificationManager />
      
      {/* Header */}
      <div className="bg-blue-600 px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">TPO Dashboard</h1>
            <p className="text-blue-100 text-sm mt-1">Updates for Shubhashish</p>
          </div>
          <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-white text-xl">🔔</span>
          </div>
        </div>
      </div>

      {/* Notice Feed */}
      <div className="px-5 mt-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Notices</h2>
        
        {notices.map((notice:any) => (
          <div key={notice.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-gray-900">{notice.title}</h3>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{notice.date}</span>
            </div>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {notice.content}
            </p>
            <button className="mt-4 w-full py-2.5 bg-gray-50 text-blue-600 text-sm font-semibold rounded-xl hover:bg-blue-50 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* iOS Install Prompt (Visible only if not installed) */}
      <div className="fixed bottom-6 left-4 right-4 bg-gray-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between text-sm ios-prompt hidden">
        <span>Install App for Notifications</span>
        <button className="px-3 py-1 bg-white text-black rounded-lg font-medium">Install</button>
      </div>
    </main>
  );
}