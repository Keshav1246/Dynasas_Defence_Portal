import React, { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import ServiceStatsRow from '../components/services/ServiceStatsRow';
import ServiceToolbar from '../components/services/ServiceToolbar';
import ServicesTable from '../components/services/ServicesTable';
import Pagination from '../components/ui/Pagination';
import ServiceFormModal from '../components/services/ServiceFormModal';
import DeleteConfirmationModal from '../components/services/DeleteConfirmationModal';
import { mockServices } from '../data/mockServices';

const ITEMS_PER_PAGE = 5;

const ServicesPage = () => {
  const [services, setServices] = useState(mockServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Derived stats
  const totalServices = services.length;
  const publishedServices = services.filter(s => s.status === 'published').length;
  const draftServices = services.filter(s => s.status === 'draft').length;
  // Note: Archived is not in our schema, but we pass it as 0

  // Filter and Search logic
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || 
                            (statusFilter === 'Published' && service.status === 'published') ||
                            (statusFilter === 'Draft' && service.status === 'draft');
      
      return matchesSearch && matchesStatus;
    });
  }, [services, searchQuery, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE) || 1;
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset pagination when filters change
  React.useEffect(() => {
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
    // In a real app, this might open a detailed view or navigate
    console.log("Viewing service:", service.title);
  };

  const handleSaveService = async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (selectedService) {
      // Edit existing
      setServices(services.map(s => s.id === selectedService.id ? { ...s, ...data } : s));
    } else {
      // Add new
      const newService = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      setServices([newService, ...services]);
    }
  };

  const handleConfirmDelete = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setServices(services.filter(s => s.id !== selectedService.id));
    setIsDeleteModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <PageHeader
        title="Services"
        subtitle="Manage all services and capabilities offered by the company."
      />

      <ServiceStatsRow 
        total={totalServices}
        published={publishedServices}
        draft={draftServices}
        archived={0}
      />

      <ServiceToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onAddClick={handleAddClick}
      />

      <ServicesTable
        services={paginatedServices}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onView={handleViewClick}
      />

      {filteredServices.length > 0 && (
        <div className="mt-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
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
