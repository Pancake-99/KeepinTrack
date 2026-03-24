import { useState } from 'react';
import { scheduleData } from '../data/routineData';
import DayPanel from './DayPanel';

export default function Schedule() {
  const [activeTab, setActiveTab] = useState('mon');

  const tabs = [
    { id: 'mon', label: 'MON' },
    { id: 'tue', label: 'TUE' },
    { id: 'wed', label: 'WED' },
    { id: 'fri', label: 'FRI' },
    { id: 'sat', label: 'SAT' }
  ];

  return (
    <>
      <div className="schedule-label">Weekly Schedule</div>
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="day-dot"></span>{tab.label}
          </button>
        ))}
      </div>

      {tabs.map(tab => (
        <DayPanel 
          key={tab.id} 
          dayData={scheduleData[tab.id]} 
          isActive={activeTab === tab.id} 
        />
      ))}
    </>
  );
}
