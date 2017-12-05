/* eslint-disable arrow-body-style */

import React from 'react';
import { Link } from 'react-scroll';
import { StickyContainer, Sticky } from 'react-sticky';

const AboutPage = () => {
  return (
    <div className="l-about">
      <StickyContainer>
        <div className="row">
          <div className="column small-12 medium-3">
            <Sticky topOffset={-50} activeClass="stickyMenu">
              <div className="c-side-menu">
                <Link activeClass="active" to="about" spy smooth offset={-70} duration={500}>
                  About
                </Link>
                <Link activeClass="active" to="contacts" spy smooth offset={-70} duration={500}>
                  Contacts
                </Link>
                <Link activeClass="active" to="terms" spy smooth offset={-70} duration={500}>
                  Terms of Use
                </Link>
                <Link activeClass="active" to="data" spy smooth offset={-70} duration={500}>
                  Data
                </Link>
              </div>
            </Sticky>
          </div>
          <div className="column small-12 medium-8">
            <div name="about" className="about-section">
              <h2>About</h2>
              <p className="text">
                The Critical Site Network Tool 2.0 was developed under the framework of the <a target="_blank" href="https://www.wetlands.org/casestudy/creating-climate-resilient-wetlands-for-waterbirds-and-communities-across-the-african-eurasian-flyway/">Climate Resilient Site Network in the African-Eurasian Flyway project</a>. This project is supported by the <a target="_blank" href="https://www.international-climate-initiative.com/">International Climate Initiative</a> on the basis of a decision adopted by the German Bundestag. The original version of the Critical Site Network Tool was developed under the <a target="_blank" href="http://www.wingsoverwetlands.org/">Wings over Wetlands</a> project by <a target="_blank" href="http://www.birdlife.org/">BirdLife International</a>, <a target="_blank" href="https://www.wetlands.org/">Wetlands International</a> an UNEP-WCMC to support the implementation of the <a target="_blank" href="http://www.unep-aewa.org/en">African-Eurasian Migratory Waterbird Agreement</a> (AEWA) and the <a target="_blank" href="https://www.ramsar.org/">Ramsar Convention on Wetlands</a>.
              </p>
            </div>
            <div name="contacts" className="about-section">
              <h2>Contacts</h2>
              <div className="row">
                <div className="column small-12 medium-6">
                  <div className="text">
                    <h3>Wetlands International</h3>
                    <address>
                      Lammert Hilarides<br />
                      PO Box 471<br />
                      6700 AL Wageningen<br />
                      The Netherlands<br />
                      <a target="_blank" href="mailto:Lammert.Hilarides@wetlands.org">Lammert.Hilarides@wetlands.org</a>
                    </address>
                  </div>
                </div>
                <div className="column small-12 medium-6">
                  <div className="text">
                    <h3>BirdLife International</h3>
                    <address>
                      The David Attenborough Building<br />
                      Pembroke Street<br />
                      Cambridge<br />
                      CB2 3QZ<br />
                      United Kingdom<br />
                      <a target="_blank" href="mailto:science@birdlife.org">science@birdlife.org</a>
                    </address>
                  </div>
                </div>
              </div>
            </div>
            <div name="terms" className="about-section">
              <h2>Terms of Use</h2>
              <p className="text">
                The data providers make no warranties or representations, express or implied, regarding the use of the material appearing in this dataset with regard to their correctness, reliability, accuracy, or otherwise. The material and geographic designations in this dataset do not imply the expressions of any opinion whatsoever on the part of the data providers concerning the legal status of any country, territory or area, nor concerning the delimitation of its frontiers or boundaries. Neither the data providers nor their affiliated or related entities or its content providers shall be responsible or liable to any person, firm or corporation for any loss, damage, injury, claim or liability of any kind or character based on or resulting from any information contained in the dataset. The data providers may update or make changes to the data provided at any time without notice; however, they make no commitment to update the information contained therein.
              </p>
            </div>
            <div name="data" className="about-section">
              <h2>Data</h2>
              <div className="text">
                <p>
                  <b>Critical Sites</b> were identified under the Wings over Wetlands project using Important  Bird and Biodiversity Area data from the BirdLife database and International Waterbird Census data available in 2007 and were not re-assessed since then. Critical Sites were identified using two criteria:
                </p>
                <ul>
                  <li><b>1:</b> The site is known or thought regularly or predictably to hold significant numbers of a population of a globally threatened waterbird species.</li>
                  <li><b>2:</b> The site is known or thought regularly or predictably to hold >1% of a flyway or other distinct population of a waterbird species. (1% thresholds applied to identify Critical Sites are based on the <a target="_blank" href="http://wpe.wetlands.org/search?form%5Bspecies%5D=&form%5Bpopulation%5D=&form%5Bpublication%5D=4">4th edition of the Waterbird Population Estimates)</a>.</li>
                </ul>
                <p>
                  <a target="_blank" href="http://www.birdlife.org/worldwide/programmes/sites-habitats-ibas-and-kbas">Important Bird and Biodiversity Areas</a> were identified by the BirdLife International Partnership using global and regional criteria. All IBAs qualify as Key Biodiversity Areas (KBAs, <a target="_blank" href="http://www.birdlife.org/worldwide/partnership/birdlife-partners">http://www.keybiodiversityareas.org/</a>). The IBA dataset presented on the CSN Tool is the most recent available in December 2016. The most recent IBA data are available on the <a target="_blank" href="http://datazone.birdlife.org/home">BirdLife Data Zone</a>.
                </p>
                <p>
                  Species data from December 2016 are provided by BirdLife International as the global IUCN Red List authority for birds.The most recent Red List data are available  on the <a target="_blank" href="http://datazone.birdlife.org/home">BirdLife Data Zone</a>.
                </p>
                <p>
                  <b>Population data</b> are provided by Wetlands International. In the case of waterbird species listed on Annex 2 of the African-Eurasian Migratory Waterbird Agreement, the data presented here are based on the <a target="_blank" href="http://wpe.wetlands.org/search?form%5Bspecies%5D=&form%5Bpopulation%5D=&form%5Bpublication%5D=8">6th edition of the AEWA Conservation Status Report</a>, for other species they are based on the <a target="_blank" href="http://wpe.wetlands.org/search?form%5Bspecies%5D=&form%5Bpopulation%5D=&form%5Bpublication%5D=5">5th edition of the Waterbird Population Estimates</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </StickyContainer>
    </div>
  );
};

export default AboutPage;
