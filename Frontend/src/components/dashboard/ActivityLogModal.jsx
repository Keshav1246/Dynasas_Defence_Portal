import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Layers3, Handshake, MessageSquare, Image as ImageIcon, Globe, LayoutPanelTop, Building2, UserPlus, Info, Search, Filter, X, ChevronDown, Loader2 } from 'lucide-react';
import { getActivityLogs } from '../../services/activityLog.service';

const getIconForActivity = (activity) => {
  const type = activity.entityType?.toLowerCase() || '';
  if (type === 'service') return Layers3;
  if (type === 'partner') return Handshake;
  if (type === 'media') return ImageIcon;
  if (type === 'inquiry') return MessageSquare;
  if (type.includes('user') || type.includes('admin')) return UserPlus;
  if (type === 'homepagecontent') return Globe;
  if (type === 'footercontent') return LayoutPanelTop;
  if (type === 'companyprofile') return Building2;
  return Info;
};

const getBgColorForActivity = (activity) => {
  const action = activity.action || '';
  if (action.includes('Created') || action.includes('Uploaded')) return 'bg-green-100';
  if (action.includes('Deleted')) return 'bg-red-100';
  if (action.includes('Updated')) return 'bg-orange-100';
  return 'bg-blue-100';
};

const getIconColorForActivity = (activity) => {
  const action = activity.action || '';
  if (action.includes('Created') || action.includes('Uploaded')) return 'text-green-600';
  if (action.includes('Deleted')) return 'text-red-600';
  if (action.includes('Updated')) return 'text-orange-600';
  return 'text-blue-600';
};

const formatTimeAgo = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const timeDiffMs = now - date;
  const diffHours = Math.floor(timeDiffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(timeDiffMs / (1000 * 60));
  
  if (diffHours > 24) return `${Math.floor(diffHours / 24)} days ago`;
  if (diffHours > 0) return `${diffHours} hours ago`;
  return `${diffMins} min ago`;
};

const getDateGroup = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'TODAY';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'YESTERDAY';
  } else {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
  }
};

const ENTITY_TYPES = ['All', 'Service', 'Partner', 'Inquiry', 'Media', 'HomepageContent', 'FooterContent', 'CompanyProfile', 'User'];
const DATE_FILTERS = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' }
];

const ActivityLogModal = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [entityType, setEntityType] = useState('All');
  const [dateFilter, setDateFilter] = useState('all');

  const fetchLogs = useCallback(async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await getActivityLogs({
        page: isLoadMore ? page + 1 : 1,
        limit: 20,
        search: searchQuery,
        entityType,
        dateRange: dateFilter
      });

      if (isLoadMore) {
        setLogs(prev => [...prev, ...response.data]);
        setPage(prev => prev + 1);
      } else {
        setLogs(response.data);
        setPage(1);
        setTotalPages(response.pagination.totalPages);
        setTotalItems(response.pagination.total);
      }
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [page, searchQuery, entityType, dateFilter]);

  useEffect(() => {
    if (isOpen) {
      // Reset logs and page to avoid merging previous results before new fetch
      setLogs([]);
      setPage(1);
      
      const delayDebounce = setTimeout(() => {
        fetchLogs(false);
      }, 300);
      return () => clearTimeout(delayDebounce);
    }
  }, [isOpen, searchQuery, entityType, dateFilter]); // remove fetchLogs from dependency to avoid loop, it's memoized safely.

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Activity Logs</h2>
            <p className="text-sm text-gray-500 mt-1">Complete history of actions across the portal</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search actions or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-40">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-xl text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer transition-all"
              >
                {DATE_FILTERS.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={entityType}
                onChange={(e) => setEntityType(e.target.value)}
                className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-xl text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer transition-all"
              >
                {ENTITY_TYPES.map(type => (
                  <option key={type} value={type}>{type === 'All' ? 'All Modules' : type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading activities...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-gray-900 font-medium mb-1">No activities found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {logs.map((activity, index) => {
                const currentGroup = getDateGroup(activity.createdAt);
                const previousGroup = index > 0 ? getDateGroup(logs[index - 1].createdAt) : null;
                const showHeader = currentGroup !== previousGroup;

                const nextGroup = index < logs.length - 1 ? getDateGroup(logs[index + 1].createdAt) : null;
                const isLastInGroup = currentGroup !== nextGroup;

                const Icon = getIconForActivity(activity);
                const bgColor = getBgColorForActivity(activity);
                const iconColor = getIconColorForActivity(activity);

                return (
                  <React.Fragment key={activity.id}>
                    {showHeader && (
                      <h3 className={`text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 sticky top-0 bg-white py-1 ${index > 0 ? 'mt-8' : ''}`}>
                        {currentGroup}
                      </h3>
                    )}
                    <div className={`flex items-start py-4 ${!isLastInGroup ? 'border-b border-gray-50' : ''}`}>
                      <div className={`p-2.5 rounded-full mr-4 shrink-0 ${bgColor}`}>
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-gray-900">{activity.action}</p>
                        {activity.details && (
                          <p className="text-[13px] text-gray-500 mt-0.5 truncate">{activity.details}</p>
                        )}
                        <div className="flex items-center text-gray-400 mt-1.5 space-x-2">
                          <span className="text-[12px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">{activity.entityType}</span>
                          <span className="text-[12px]">&bull;</span>
                          <span className="text-[12px]">{formatTimeAgo(activity.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}

              {/* Load More Section */}
              <div className="pt-6 pb-2 border-t border-gray-100 flex flex-col items-center justify-center">
                <p className="text-sm text-gray-500 font-medium mb-4">
                  Showing {logs.length} of {totalItems} activities
                </p>
                {page < totalPages && (
                  <button
                    onClick={() => fetchLogs(true)}
                    disabled={loadingMore}
                    className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center shadow-sm"
                  >
                    {loadingMore && <Loader2 className="w-4 h-4 mr-2 animate-spin text-gray-500" />}
                    Load More
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogModal;
