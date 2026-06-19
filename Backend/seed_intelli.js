require('dotenv').config();
const prisma = require('./src/config/db');

const seedIntelli = async () => {
  try {
    const services = await prisma.service.findMany();
    const intelliService = services.find(s => s.title.toLowerCase() === 'intell(i)');

    if (!intelliService) {
      console.log('Intell(i) service not found in the database. Please ensure it is created.');
      return;
    }

    const subservices = [
      {
        title: '(i)Intercept',
        subtitle: 'Advanced Communications Intelligence & Interception',
        description: '(i)Intercept is an intelligence platform designed to support highly complex investigations by collecting, correlating, and analyzing information from multiple communication channels. It enables nationwide interception capabilities across diverse telecommunication networks and service providers, delivering actionable intelligence for defence and homeland security operations.',
        features: [
          'Communications interception',
          'Mobile location tracking',
          'Web intelligence gathering',
          'Service provider compliance',
          'Integrated video monitoring',
          'Fusion and data management'
        ],
        ctaText: 'Explore Platform',
        ctaLink: '',
        image: '',
        displayOrder: 1
      },
      {
        title: '(i)Case Management',
        subtitle: 'Centralized Investigation & Evidence Management',
        description: '(i)Case Management provides comprehensive workflows for capturing, tracking, and managing investigations throughout their entire lifecycle. The platform enables secure record keeping, evidence management, incident reporting, and procedural enforcement to improve operational efficiency.',
        features: [
          'Property & evidence management',
          'Incident reporting',
          'Investigative case management',
          'Traffic accident reporting',
          'Workflow allocation',
          'Civil process management'
        ],
        ctaText: 'Explore Platform',
        ctaLink: '',
        image: '',
        displayOrder: 2
      },
      {
        title: '(i)Contact Management',
        subtitle: 'Secure Collaboration & Contact Intelligence',
        description: '(i)Contact Management provides a secure environment for managing operational contacts, informers, and field assets across the INTELL(I) ecosystem. It delivers encrypted communications, contact visualization, and advanced authentication to maintain reliable information sharing.',
        features: [
          'Unified collaboration suite',
          'Encrypted communications',
          'Informer & asset management',
          'GIS-based contact tracking',
          'Multi-level authentication',
          'Automated status monitoring'
        ],
        ctaText: 'Explore Platform',
        ctaLink: '',
        image: '',
        displayOrder: 3
      },
      {
        title: '(i)Secure',
        subtitle: 'Multi-Layered Security & Identity Protection',
        description: '(i)Secure delivers enterprise-grade security capabilities designed to protect mission-critical systems, users, and operational data. The platform combines advanced authentication, intrusion prevention, and access control mechanisms to maintain secure environments.',
        features: [
          'Intrusion prevention system',
          'Biometric authentication',
          'Facial recognition access',
          'Public key infrastructure',
          'Token verification',
          'Multi-factor authentication'
        ],
        ctaText: 'Explore Platform',
        ctaLink: '',
        image: '',
        displayOrder: 4
      },
      {
        title: '(i)City',
        subtitle: '3D Geospatial Visualization & Smart City Intelligence',
        description: '(i)City provides immersive 3D visualization technologies that support urban planning, operational awareness, and simulation environments. It enables organizations to analyze real-world scenarios through advanced mapping and interactive digital environments.',
        features: [
          'Advanced 3D visualization',
          'Orthorectified satellite imagery',
          '360° situational awareness',
          'Asset tracking',
          'Disaster response planning',
          'Training & simulation'
        ],
        ctaText: 'Explore Platform',
        ctaLink: '',
        image: '',
        displayOrder: 5
      },
      {
        title: '(i)Map',
        subtitle: 'Geospatial Intelligence & Mission Planning',
        description: '(i)Map delivers geospatial intelligence capabilities that support command and control, mission planning, and operational monitoring. It combines GIS technologies, advanced analytics, and real-time visualization to enhance decision-making in defence environments.',
        features: [
          'Geospatial intelligence',
          'Command & control support',
          'Terrain analysis',
          'Mission planning',
          'Real-time asset tracking',
          'Disaster recovery planning'
        ],
        ctaText: 'Explore Platform',
        ctaLink: '',
        image: '',
        displayOrder: 6
      }
    ];

    await prisma.service.update({
      where: { id: intelliService.id },
      data: { subservices }
    });

    console.log('Successfully seeded subservices to Intell(i).');
  } catch (error) {
    console.error('Error seeding Intell(i) subservices:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedIntelli();
