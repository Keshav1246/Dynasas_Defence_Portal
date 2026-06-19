const fs = require('fs');
const path = './Viewer/src/pages/ServicesPage.jsx';

let content = fs.readFileSync(path, 'utf8');

// Find the start of the return statement
const startMatch = "              return (\n                <motion.div\n                  key={service.id || index}\n                  id={`service-${slug}`}";
const startIdx = content.indexOf(startMatch);

// Find the end of the return statement
const endMatch = "                </motion.div>\n              );\n            })}\n          </div>\n        )}\n      </main>";
const endIdx = content.indexOf(endMatch);

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `              return (
                <motion.div
                  key={service.id || index}
                  id={\`service-\${slug}\`}
                  onViewportEnter={() => setActiveServiceId(slug)}
                  viewport={{ margin: "-50% 0px -50% 0px" }} // Triggers when element is perfectly at center of viewport
                  className="py-24 lg:py-32 relative overflow-visible"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">

                    {/* Left Side: Numbering UI, Faded Background Title, and Larger Floating Image */}
                    <div className="relative w-full aspect-square lg:aspect-[4/3] flex items-center justify-center pl-16 xl:pl-20">

                      {/* Left-edge specific numbering UI - Start exactly at the top */}
                      <div className="absolute left-0 top-0 h-full flex flex-col items-center justify-start z-20 pointer-events-none opacity-90 pt-8 lg:pt-12" style={{ width: '40px' }}>
                        <span className="text-brand-primary font-heading font-bold text-2xl leading-none mb-6">
                          {numberStr}
                        </span>
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: '45%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                          className="w-[2px] bg-brand-primary/80 my-2"
                        />
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.0, duration: 0.5 }}
                          className="w-3 h-3 rounded-full border-2 border-brand-primary bg-brand-black mt-2"
                        />
                      </div>

                      {/* Image Wrapper */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative z-[1] w-full h-full xl:w-[115%] xl:-ml-4 flex flex-col items-center justify-center overflow-visible"
                      >
                        {/* Top Watermark = 1 */}
                        {topWord && (
                          <div className="absolute top-0 -translate-y-[45%] w-full flex justify-center pointer-events-none z-[1] select-none">
                            <h2
                              className="font-heading font-black uppercase m-0 p-0 text-center"
                              style={{
                                fontSize: 'clamp(80px, 8vw, 140px)',
                                lineHeight: '0.85',
                                letterSpacing: '-4px',
                                opacity: 0.08,
                                color: '#202020',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {topWord}
                            </h2>
                          </div>
                        )}

                        {/* Grid/Glow Base (simulate 3D floating effect underneath the image) */}
                        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-3/4 aspect-[2/1] rounded-full border border-brand-primary/20 bg-brand-primary/5 blur-[2px] z-[1]" style={{ transform: 'translateX(-50%) perspective(500px) rotateX(75deg)' }}>
                          <div className="absolute inset-4 rounded-full border border-brand-primary/30" />
                          <div className="absolute inset-8 rounded-full border border-brand-primary/40" />
                        </div>

                        {/* Actual Image = 2 */}
                        <img
                          src={imagePath}
                          alt={service.title}
                          className="relative z-[2] w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />

                        {/* Bottom Watermark = 1 */}
                        {bottomWords && (
                          <div className="absolute bottom-[5%] translate-y-[60%] w-full flex justify-center pointer-events-none z-[1] select-none">
                            <h2
                              className="font-heading font-black uppercase m-0 p-0 text-center"
                              style={{
                                fontSize: 'clamp(80px, 8vw, 140px)',
                                lineHeight: '0.85',
                                letterSpacing: '-4px',
                                opacity: 0.08,
                                color: '#202020',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {bottomWords}
                            </h2>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Right Side: Dynamic Info Card = 3 */}
                    <div className="relative z-[3]">
                      <motion.div
                        id={\`service-card-\${slug}\`}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="group relative bg-[#0c0c0e] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 lg:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:bg-[#0f0f11] transition-all duration-500 overflow-hidden"
                      >
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 blur-[60px] group-hover:bg-brand-primary/15 transition-colors duration-500 rounded-full pointer-events-none" />

                        {/* Tactical Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-[rgba(255,255,255,0.06)]" />
                        <div className="absolute top-0 left-0 w-0 h-[2px] bg-brand-primary group-hover:w-full transition-all duration-700 ease-out" />

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-primary/30 group-hover:border-brand-primary transition-colors" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-primary/30 group-hover:border-brand-primary transition-colors" />

                        <div className="relative z-10">
                          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4 text-brand-white group-hover:text-brand-primary transition-colors duration-300">
                            {service.title}
                          </h2>

                          {service.subtitle && (
                            <h3 className="text-lg text-brand-white/80 font-heading mb-6">
                              {service.subtitle}
                            </h3>
                          )}

                          <p className="text-brand-white/60 leading-relaxed mb-10 text-[15px] group-hover:text-brand-white/80 transition-colors duration-300">
                            {service.description}
                          </p>

                          {service.features && service.features.length > 0 && (
                            <div className="mb-10 space-y-8 border-t border-[rgba(255,255,255,0.06)] pt-10 group-hover:border-[rgba(255,255,255,0.1)] transition-colors duration-300">
                              {service.features.map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-center gap-6">
                                  <div className="shrink-0 p-2.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                                    {getFeatureIcon(fIndex)}
                                  </div>
                                  {renderFeatureText(feature)}
                                </div>
                              ))}
                            </div>
                          )}

                          {(service.ctaText || service.ctaLink) && (
                            <div className="mt-8">
                              <a
                                href={service.ctaLink || '/contact'}
                                className="inline-flex items-center gap-3 text-brand-primary font-heading text-[13px] font-bold tracking-widest uppercase hover:text-brand-white transition-colors duration-300 group/btn"
                              >
                                {service.ctaText || 'Explore Service'}
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                              </a>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                  </div>

                  {/* Subservices Navigator directly underneath */}
                  {service.hasSubservices === true && Array.isArray(service.subservices) && service.subservices.length > 0 && (
                    <div className="mt-32 flex flex-col items-center">
                      <div className="w-full mb-12">
                        {/* Subservice Navigator Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {service.subservices.map((sub, subIdx) => {
                             const isActive = (activeSubserviceIndexes[service.id] || 0) === subIdx;
                             return (
                               <button
                                 key={subIdx}
                                 onClick={() => setActiveSubserviceIndexes({ ...activeSubserviceIndexes, [service.id]: subIdx })}
                                 className={\`p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between group overflow-hidden relative \${isActive ? 'bg-brand-primary/10 border-brand-primary shadow-[0_0_15px_rgba(255,106,0,0.3)]' : 'bg-brand-black/40 border-brand-white/10 hover:border-brand-primary/50 hover:bg-brand-primary/5'}\`}
                               >
                                  {/* Hover active accent */}
                                  <div className={\`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 \${isActive ? 'bg-brand-primary' : 'bg-transparent group-hover:bg-brand-primary/50'}\`}></div>
                                  
                                  <span className={\`font-heading font-semibold text-sm pl-2 transition-colors \${isActive ? 'text-brand-white drop-shadow-md' : 'text-brand-white/60 group-hover:text-brand-white'}\`}>
                                    {sub.title}
                                  </span>
                                  <div className={\`w-2 h-2 rounded-full transition-colors \${isActive ? 'bg-brand-primary shadow-[0_0_8px_rgba(255,106,0,0.8)]' : 'bg-brand-white/20 group-hover:bg-brand-primary/50'}\`}></div>
                               </button>
                             );
                          })}
                        </div>
                      </div>
                      
                      <div className="w-full max-w-4xl mx-auto mt-8">
                         {(() => {
                            const subIdx = activeSubserviceIndexes[service.id] || 0;
                            const activeSubservice = service.subservices[subIdx];
                            return (
                              <motion.div
                                key={activeSubservice.title} // Re-animate when changed
                                id={\`subservice-card-\${slug}\`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="group relative bg-[#0c0c0e] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 lg:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:bg-[#0f0f11] transition-all duration-500 overflow-hidden"
                              >
                                {/* Glow Effect */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 blur-[60px] group-hover:bg-brand-primary/15 transition-colors duration-500 rounded-full pointer-events-none" />

                                {/* Tactical Top Accent Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-[rgba(255,255,255,0.06)]" />
                                <div className="absolute top-0 left-0 w-0 h-[2px] bg-brand-primary group-hover:w-full transition-all duration-700 ease-out" />

                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-primary/30 group-hover:border-brand-primary transition-colors" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-primary/30 group-hover:border-brand-primary transition-colors" />

                                <div className="relative z-10">
                                  {activeSubservice.image && (
                                     <div className="mb-8 w-full max-w-[200px] aspect-video relative flex items-center justify-start overflow-hidden rounded-lg opacity-80 group-hover:opacity-100 transition-opacity">
                                       <img src={activeSubservice.image} alt={activeSubservice.title} className="w-full h-full object-contain filter drop-shadow-xl" />
                                     </div>
                                  )}
                                  
                                  <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4 text-brand-white group-hover:text-brand-primary transition-colors duration-300">
                                    {activeSubservice.title}
                                  </h2>

                                  {activeSubservice.subtitle && (
                                    <h3 className="text-lg text-brand-white/80 font-heading mb-6">
                                      {activeSubservice.subtitle}
                                    </h3>
                                  )}

                                  <p className="text-brand-white/60 leading-relaxed mb-10 text-[15px] group-hover:text-brand-white/80 transition-colors duration-300">
                                    {activeSubservice.description}
                                  </p>

                                  {activeSubservice.features && activeSubservice.features.length > 0 && (
                                    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[rgba(255,255,255,0.06)] pt-10 group-hover:border-[rgba(255,255,255,0.1)] transition-colors duration-300">
                                      {activeSubservice.features.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex items-start gap-4">
                                          <div className="shrink-0 p-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mt-1">
                                            {getFeatureIcon(fIndex)}
                                          </div>
                                          {renderFeatureText(feature)}
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {(activeSubservice.ctaText || activeSubservice.ctaLink) && (
                                    <div className="mt-8">
                                      <a
                                        href={activeSubservice.ctaLink || '/contact'}
                                        className="inline-flex items-center gap-3 text-brand-primary font-heading text-[13px] font-bold tracking-widest uppercase hover:text-brand-white transition-colors duration-300 group/btn"
                                      >
                                        {activeSubservice.ctaText || 'Explore Service'}
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            );
                         })()}
                      </div>
                    </div>
                  )}
\n`;

  const newContent = content.substring(0, startIdx) + replacement + content.substring(endIdx);
  fs.writeFileSync(path, newContent);
  console.log('Successfully updated ServicesPage.jsx');
} else {
  console.log('Could not find boundaries.');
}
