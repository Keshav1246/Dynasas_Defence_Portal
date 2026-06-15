import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import ServiceStatsRow from '../components/services/ServiceStatsRow';
import ServiceToolbar from '../components/services/ServiceToolbar';
import ServicesTable from '../components/services/ServicesTable';
import Pagination from '../components/ui/Pagination';
import ServiceFormModal from '../components/services/ServiceFormModal';
import DeleteConfirmationModal from '../components/services/DeleteConfirmationModal';
import { getServices, deleteService, createService, updateService } from '../services/services.service';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, archived: 0 });

  // Fetch Services
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getServices({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          search: searchQuery,
          status: statusFilter
        });

        const newTotalPages = response.pagination?.totalPages || 1;

        if (currentPage > newTotalPages && response.pagination?.total > 0) {
          setCurrentPage(newTotalPages);
          return;
        }

        setServices(response.data || []);
        setTotalServices(response.pagination?.total || 0);
        setTotalPages(newTotalPages);
        if (response.stats) {
          setStats(response.stats);
        }
      } catch (err) {
        console.error("Failed to load services:", err);
        setError("Failed to load services. Please try again.");
        toast.error("Failed to load services");
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const delayDebounceFn = setTimeout(() => {
      fetchServices();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchQuery, statusFilter, refreshTrigger]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Handlers
  const handleAddClick = () => {
    setSelectedService(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (service) => {
    setSelectedService(service);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const handleViewClick = (service) => {
    handleEditClick(service);
  };

  const handleSaveService = async (data) => {
    try {
      if (selectedService) {
        await updateService(selectedService.id, data);
        toast.success("Service updated successfully");
      } else {
        await createService(data);
        toast.success("Service created successfully");
      }
      setRefreshTrigger(prev => prev + 1);
      setIsFormModalOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      toast.error(err.message || "Failed to save service");
      throw err; // Re-throw to let the modal handle loading state if needed
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteService(selectedService.id);
      toast.success("Service deleted successfully");
      setRefreshTrigger(prev => prev + 1);
      setIsDeleteModalOpen(false);
      setSelectedService(null);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.message || "Failed to delete service");
    }
  };

  return (
    <>
      <PageHeader
        title="Services"
        subtitle="Manage all services and capabilities offered by the company."
      />

      {isLoading && services.length === 0 ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-10 bg-white rounded-xl border border-red-100 shadow-sm mt-6 text-red-500">
          {error}
        </div>
      ) : (
        <>
          <ServiceStatsRow
            total={stats.total}
            published={stats.published}
            draft={stats.draft}
            archived={stats.archived}
          />

          <ServiceToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onAddClick={handleAddClick}
          />

          <ServicesTable
            services={services}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onView={handleViewClick}
          />

          {services.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-b-xl border-x border-b border-gray-100 -mt-2">
              <div className="text-gray-400 mb-2">No services found</div>
              <button
                onClick={handleAddClick}
                className="text-orange-500 hover:text-orange-600 font-medium text-sm"
              >
                Add your first service
              </button>
            </div>
          )}

          {totalServices > 0 && (
            <div className="mt-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}

      <ServiceFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveService}
        service={selectedService}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        serviceTitle={selectedService?.title}
      />
    </>
  );
};

export default ServicesPage;
