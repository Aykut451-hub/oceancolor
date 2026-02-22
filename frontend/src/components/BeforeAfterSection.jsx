import React, { useState, useRef, useEffect, useCallback } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { ScrollReveal } from '../hooks/useScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Vorher-Nachher Projekte Data
const beforeAfterProjects = [
  {
    id: 1,
    title: 'Schimmelsanierung in Hamburg',
    description: 'Komplette Schimmelsanierung und Neugestaltung einer Wand in Hamburg-Altona',
    beforeImage: 'https://customer-assets.emergentagent.com/job_a8c20c05-0b9b-4f36-adbc-76387ff65258/artifacts/ykb0peqw_before.jpg',
    afterImage: 'https://customer-assets.emergentagent.com/job_a8c20c05-0b9b-4f36-adbc-76387ff65258/artifacts/zwy2cpm0_after.jpg',
    beforeAlt: 'Wand vor der Renovierung mit Schimmelbefall in Hamburg',
    afterAlt: 'Wand nach professioneller Sanierung durch Ocean Color Hamburg',
    category: 'Schimmelsanierung',
    link: '/leistungen/schimmelsanierung'
  },
  {
    id: 2,
    title: 'Badsanierung in Hamburg',
    description: 'Komplette Badmodernisierung vom Rückbau bis zur hochwertigen Neugestaltung',
    beforeImage: 'https://customer-assets.emergentagent.com/job_c75bc87b-67d3-488f-a48f-6666b0075614/artifacts/503og5yz_bad_before.JPG',
    afterImage: 'https://customer-assets.emergentagent.com/job_c75bc87b-67d3-488f-a48f-6666b0075614/artifacts/pk55vtsy_Bad_after.png',
    beforeAlt: 'Altes Badezimmer vor der Sanierung in Hamburg',
    afterAlt: 'Modernes Badezimmer nach der Sanierung durch Ocean Color',
    category: 'Badsanierung',
    link: '/badsanierung'
  },
  {
    id: 3,
    title: 'Wandrenovierung nach Graffiti in Hamburg',
    description: 'Diese Wand wurde nach Graffiti-Beschädigung fachgerecht mit isolierender Spezialfarbe von Brillux (Aqualoma) behandelt und neu beschichtet, um ein dauerhaft sauberes Erscheinungsbild sicherzustellen.',
    beforeImage: 'https://customer-assets.emergentagent.com/job_c75bc87b-67d3-488f-a48f-6666b0075614/artifacts/ckl3ok7v_IMG_5557.JPG',
    afterImage: 'https://customer-assets.emergentagent.com/job_c75bc87b-67d3-488f-a48f-6666b0075614/artifacts/6d22q4zk_IMG_5916%201.JPG',
    beforeAlt: 'Wand mit Graffiti-Beschädigung vor der Behandlung',
    afterAlt: 'Saubere Wand nach Graffiti-Entfernung und Neubeschichtung',
    category: 'Graffiti-Entfernung',
    link: '/leistungen/waende-decken'
  }
];

const BeforeAfterSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const goToProject = useCallback((index) => {
    if (index >= 0 && index < beforeAfterProjects.length) {
      setCurrentIndex(index);
    }
  }, []);

  const goToPrevious = useCallback(() => {
    goToProject(currentIndex > 0 ? currentIndex - 1 : beforeAfterProjects.length - 1);
  }, [currentIndex, goToProject]);

  const goToNext = useCallback(() => {
    goToProject(currentIndex < beforeAfterProjects.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, goToProject]);

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  const currentProject = beforeAfterProjects[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" data-testid="before-after-section">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block bg-[#1e328b]/10 text-[#1e328b] px-4 py-2 rounded-full text-sm font-medium mb-4">
              Unsere Arbeit in Bildern
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Vorher & Nachher Projekte
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Überzeugen Sie sich selbst von der Qualität unserer Arbeit. 
              Ziehen Sie den Slider, um den Unterschied zu sehen.
            </p>
          </div>
        </ScrollReveal>

        {/* Project Gallery */}
        <div className="max-w-4xl mx-auto">
          <div 
            ref={sliderRef}
            className="relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 
                         w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center
                         hover:bg-gray-50 hover:shadow-xl transition-all duration-200
                         border border-gray-200 hover:border-[#1e328b]"
              aria-label="Vorheriges Projekt"
              data-testid="prev-project-btn"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 
                         w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center
                         hover:bg-gray-50 hover:shadow-xl transition-all duration-200
                         border border-gray-200 hover:border-[#1e328b]"
              aria-label="Nächstes Projekt"
              data-testid="next-project-btn"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Project Card */}
            <div 
              className="bg-white rounded-3xl shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8 transition-all duration-500"
              key={currentProject.id}
            >
              {/* Project Info */}
              <div className="mb-6 text-center">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-2">
                  {currentProject.category}
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                  {currentProject.title}
                </h3>
                <p className="text-gray-600 text-sm max-w-lg mx-auto">
                  {currentProject.description}
                </p>
              </div>

              {/* Slider */}
              <BeforeAfterSlider
                beforeImage={currentProject.beforeImage}
                afterImage={currentProject.afterImage}
                beforeAlt={currentProject.beforeAlt}
                afterAlt={currentProject.afterAlt}
                beforeLabel="Vorher"
                afterLabel="Nachher"
                className="max-w-2xl mx-auto"
              />

              {/* GEO Text for SEO */}
              <p className="mt-6 text-center text-sm text-gray-500 italic">
                Ocean Color – Professionelle {currentProject.category} in Hamburg und Umgebung
              </p>
            </div>

            {/* Project Indicators */}
            <div className="flex justify-center items-center gap-3 mt-6">
              {beforeAfterProjects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => goToProject(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 h-2 bg-[#1e328b] rounded-full' 
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 rounded-full'
                  }`}
                  aria-label={`Zu Projekt ${index + 1}: ${project.title}`}
                  data-testid={`project-indicator-${index}`}
                />
              ))}
            </div>

            {/* Project Counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                Projekt {currentIndex + 1} von {beforeAfterProjects.length}
              </span>
            </div>

            {/* Swipe Hint (Mobile) */}
            <div className="md:hidden text-center mt-4">
              <span className="text-xs text-gray-400 flex items-center justify-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Wischen für mehr Projekte
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal delay={300}>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Haben Sie ein ähnliches Projekt? Wir beraten Sie gerne!
            </p>
            <a 
              href="/kontakt" 
              className="inline-flex items-center px-6 py-3 bg-[#1e328b] hover:bg-[#162567] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 btn-shine"
              data-testid="before-after-cta"
            >
              Kostenloses Angebot anfordern
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
