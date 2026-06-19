import { useEffect } from 'react';

const SEOManager = ({ seoData }) => {
  useEffect(() => {
    if (!seoData) return;

    if (seoData.title) {
      document.title = seoData.title;
    }

    if (seoData.description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = seoData.description;
    }

    if (seoData.favicon) {
      let linkFavicon = document.querySelector('link[rel="icon"]');
      if (!linkFavicon) {
        linkFavicon = document.createElement('link');
        linkFavicon.rel = 'icon';
        document.head.appendChild(linkFavicon);
      }
      linkFavicon.href = `${seoData.favicon}?v=${new Date().getTime()}`;
    }

    if (seoData.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = seoData.keywords;
    }

    if (seoData.ogImage) {
      let metaOgImage = document.querySelector('meta[property="og:image"]');
      if (!metaOgImage) {
        metaOgImage = document.createElement('meta');
        metaOgImage.setAttribute('property', 'og:image');
        document.head.appendChild(metaOgImage);
      }
      metaOgImage.content = seoData.ogImage;
    }

    if (seoData.twitterImage) {
      let metaTwitterImage = document.querySelector('meta[name="twitter:image"]');
      if (!metaTwitterImage) {
        metaTwitterImage = document.createElement('meta');
        metaTwitterImage.name = 'twitter:image';
        document.head.appendChild(metaTwitterImage);
      }
      metaTwitterImage.content = seoData.twitterImage;
    }
  }, [seoData]);

  return null;
};

export default SEOManager;
