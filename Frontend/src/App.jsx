import React from 'react'
import Sidebar from './components/Sidebar'
import TopNavbar from './components/TopNavbar'
import PageHeader from './components/PageHeader'

const App = () => {

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f4f5f7]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <TopNavbar />
        <main className="flex-1 p-8 overflow-y-auto">
          <PageHeader
            title="Dashboard"
            subtitle="Welcome back! Here's what's happening in your portal."
            date="Tuesday, June 9, 2026"
          />



        </main>
      </div>
    </div>
  )
}

export default App