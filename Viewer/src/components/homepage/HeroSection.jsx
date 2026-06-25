import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ImagePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = ({ data }) => {
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [data?.backgroundImage]);

  if (!data) return null;

  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Media */}
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)'
        }}
      >
        {data.backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={data.backgroundVideo} type="video/mp4" />
          </video>
        ) : !imgError ? (
          <img
            src={data.backgroundImage}
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-brand-dark flex flex-col items-center justify-center text-white/30">
            <ImagePlus size={32} className="mb-2 opacity-50" />
            <span className="text-sm font-semibold tracking-widest uppercase">Add image</span>
          </div>
        )}
        {/* Subtle Readability Overlay */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-[2]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-block"
        >

          {data.heroTitle && (
            <span className="px-4 py-1 border border-white/10 rounded-full text-xs uppercase tracking-[0.2em] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] bg-black/20">
              {data.heroTitle}
            </span>
          )}

        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 tracking-tight max-w-4xl leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          {data.heroSubtitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mb-12 font-body font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          {data.heroDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto font-heading relative z-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {data.primaryCTA?.text && (
            <Link
              to={data.primaryCTA.link}
              className="group bg-brand-primary text-white px-8 py-4 font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-3 hover:bg-brand-primary-hover hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
            >
              {data.primaryCTA.text}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          {data.secondaryCTA?.text && (
            <Link
              to={data.secondaryCTA.link}
              className="px-8 py-4 font-semibold uppercase tracking-wider text-sm border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.4)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
            >
              {data.secondaryCTA.text}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
