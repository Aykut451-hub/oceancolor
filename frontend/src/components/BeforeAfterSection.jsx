import React from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { ScrollReveal } from '../hooks/useScrollReveal';

// Vorher-Nachher Projekte Data
const beforeAfterProjects = [
  {
    id: 1,
    title: 'Wandrenovierung Hamburg',
    description: 'Komplette Schimmelsanierung und Neugestaltung einer Wand in Hamburg-Altona',
    beforeImage: 'https://customer-assets.emergentagent.com/job_a8c20c05-0b9b-4f36-adbc-76387ff65258/artifacts/ykb0peqw_before.jpg',
    afterImage: 'https://customer-assets.emergentagent.com/job_a8c20c05-0b9b-4f36-adbc-76387ff65258/artifacts/zwy2cpm0_after.jpg',
    beforeAlt: 'Wand vor der Renovierung mit Schimmelbefall in Hamburg',
    afterAlt: 'Wand nach professioneller Sanierung durch Ocean Color Hamburg',
    category: 'Schimmelsanierung'
  }
];

const BeforeAfterSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50/30" data-testid="before-after-section">
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

        <div className="max-w-4xl mx-auto">
          {beforeAfterProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 150}>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8">
                {/* Project Info */}
                <div className="mb-6 text-center">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm max-w-lg mx-auto">
                    {project.description}
                  </p>
                </div>

                {/* Slider */}
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                  beforeAlt={project.beforeAlt}
                  afterAlt={project.afterAlt}
                  beforeLabel="Vorher"
                  afterLabel="Nachher"
                  className="max-w-2xl mx-auto"
                />

                {/* GEO Text for SEO */}
                <p className="mt-6 text-center text-sm text-gray-500 italic">
                  Ocean Color – Professionelle {project.category} in Hamburg und Umgebung
                </p>
              </div>
            </ScrollReveal>
          ))}
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
