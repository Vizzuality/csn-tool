import React from 'react';
import { Link } from 'react-scroll';
import { StickyContainer, Sticky } from 'react-sticky';

class GuidancePage extends React.Component {
  render() {
    return (
      <div className="l-about">
        <StickyContainer>
          <div className="row">
            <div className="column small-12 medium-3">
              <Sticky topOffset={-50} activeClass="stickyMenu">
                <div className="c-side-menu">
                  <Link activeClass="active" to="guidance" spy={true} smooth={true} offset={-70} duration={500}>
                    Guidance
                  </Link>
                  <Link activeClass="active" to="wetland-waterbird" spy={true} smooth={true} offset={-70} duration={500}>
                    Guidance for wetland and waterbird management
                  </Link>
                  <Link activeClass="active" to="climate-change" spy={true} smooth={true} offset={-70} duration={500}>
                    Guidance on climate change adaptation
                  </Link>
                  <Link activeClass="active" to="user-guide" spy={true} smooth={true} offset={-70} duration={500}>
                    User Guide - Examples
                  </Link>
                </div>
              </Sticky>
            </div>
            <div className="column small-12 medium-8">
              <div name="guidance" className="about-section">
                <h2>Guidance</h2>
                <div className="text">
                  <h3>Species specific management guidelines</h3>
                  <p>
                    Information on the ecology (behaviour throughout the species’ annual cycle, its habitat requirements, diet, breeding sites and management) as well as on threats affecting the species are available on the ‘Text account’ tab of the BirdLife Species Fact Sheets. These can be accessed either by clicking on the link box following the species name on CSN Tool 2.0 or directly on the BirdLife International <a target="_blank" href="http://datazone.birdlife.org/species/search">Data Zone</a>.
                  </p>
                  <p>
                    Flyway species action or management plans are available on the <a target="_blank" href="http://www.unep-aewa.org/en/species/other_species_info">AEWA website</a> which also provides access to the International Species Working Groups and International Species Expert Groups.
                  </p>
                  <p>
                    The European Union website also provides access to <a target="_blank" href="http://ec.europa.eu/environment/nature/conservation/wildbirds/action_plans/index_en.htm">species action plans</a> and <a target="_blank" href="http://ec.europa.eu/environment/nature/conservation/wildbirds/hunting/managt_plans_en.htm">management plans</a>.
                  </p>
                  <p>
                    Information on action plans under development and on the implementation of existing action plans in Europe can be found on the <a target="_blank" href="http://www.trackingactionplans.org/SAPTT/main_guest">Species Action Plan Tracking Tool</a>.
                  </p>
                  <p>
                    Expert advice on additional species can be obtained from the <a target="_blank" href="https://www.wetlands.org/our-network/specialist-groups/">Species Specialist Groups</a> associated with Wetlands International and the IUCN Species Survival Commission.
                  </p>
                </div>
                <div name="wetland-waterbird" className="text -with-links">
                  <h3>Generic guidance for wetland and waterbird management</h3>
                  <p className="links">
                    <a target="_blank" href="http://www.unep-aewa.org/publications/technical-publications?field_publication_type_tid=369">
                      AEWA Conservation Guidelines series
                    </a>
                    <a target="_blank" href="https://www.ramsar.org/resources/ramsar-handbooks">
                      Ramsar Handbooks
                    </a>
                    <a target="_blank" href="https://www.ramsar.org/resources/ramsar-policy-briefs">
                      Ramsar Policy Briefs
                    </a>
                    <a target="_blank" href="http://www.ramsar.org/resources/ramsar-briefing-notes">
                      Ramsar Briefing Notes
                    </a>
                    <a className="no-break" target="_blank" href="http://ec.europa.eu/environment/nature/conservation/wildbirds/action_plans/guidance_en.htm">
                      EU Guidance under the Birds Directive
                    </a>
                    &nbsp;and on&nbsp;
                    <a className="no-break" target="_blank" href="http://ec.europa.eu/environment/nature/natura2000/management/guidance_en.htm">
                      management of Natura 2000 sites
                    </a>
                  </p>
                </div>
                <div name="climate-change" className="text -with-links">
                  <h3>Guidance on climate change adaptation</h3>
                  <p className="links">
                    <a target="_blank" href="http://www.unep-aewa.org/en/document/updated-advice-climate-change-adaptation-measures-waterbirds-0">
                      AEWA Advice on Climate Change Adaptation Measures for Waterbirds
                    </a>
                    <a target="_blank" href="https://portals.iucn.org/library/sites/library/files/documents/SSC-OP-059.pdf">
                      IUCN SSC Guidelines for Assessing Species’ Vulnerability to Climate Change
                    </a>
                    <a target="_blank" href="https://www.nwf.org/-/media/PDFs/Global-Warming/2014/Climate-Smart-Conservation-Final_06-06-2014.ashx">
                      Climate-Smart Conservation: Putting Adaptation Principles into Practice
                    </a>
                    <a target="_blank" href="https://www.cbd.int/climate/">
                      CBD Climate Change Resources
                    </a>
                  </p>
                </div>
                <div name="user-guide" className="text -with-links">
                  <h3>User Guide - Examples for AEWA and Ramsar National Focal Points</h3>
                  <div>
                    <h3>What are the AEWA waterbird populations in this country?</h3>
                    <p>
                      Go to the <strong>Countries</strong> menu, select the country you are interested in. Select the <strong>Populations</strong> tab.  Download the table. Double click or import the csv file you downloaded into Excel. (To import, open a new workbook in Excel, Data \ Get external data \ Import text file … \ Delimited \ Tick the checkbox next to Comma \ Click Finish \ Click OK. Insert a column into Column E. Type “Table 1” in Cell E1. Type in the following function into cell E2: =IF(AND(ISBLANK(F2), ISBLANK(G2), ISBLANK(H2)),"Not on Table1", "On Table 1"). Copy this function into all other cells of column E. Select Data \ Filter or use the Filter icon in row 1. Open the filter in Column E and select “On Table 1”.
                    </p>
                  </div>
                  <div>
                    <h3>What huntable species have look-alike species with populations listed on Column A of AEWA in a selected country? (This is the most efficient if you have only a few huntable waterbird species)</h3>
                    <p>
                     Go to the <strong>Countries</strong> menu, select the <strong>Look-alike species</strong> tab. Find the huntable species on the list. If necessary filter the list by typing in (part of) the name of the huntable species into the <strong>FILTER BY</strong> box, but note you can only filter one expression at a time. Check the number in the <strong>No. of look-alike species populations in Col A</strong> column. If it is 0, no population of a species listed in Column A of AEWA Table 1 occurs in your country. If the number is not zero, click on the arrow at the right end of the row and you can check with which Column A listed population the huntable species’ population overlaps. You can list only the Column A populations by selecting the filter next to the letter <strong>A</strong> under the <strong>AEWA Table 1 Column</strong> heading. Select 1 to list all populations listed on Column A. If you are interested in a special category within Column A, e.g. globally threatened species (listed in Category 1b) you select 1b in the filter. By clicking on the right arrow at the end of the row, you can check up the flyway delineation of the look alike population. If you want to check another population, click on the {'<'} BACK in the top left corner of the page under the Critical Siten Network logo.
                    </p>
                  </div>
                  <div>
                    <h3>What are the look-alike species populations for selected Column A populations? (This is more efficient, when you are interested in a particular Column A population)</h3>
                    <p>
                      Go to the <strong>Countries</strong> menu, select the <strong>Look-alike species</strong> tab. If you are interested in a particular species, type (part of) its name into the <strong>FILTER BY</strong> box and click on the right arrow at the end of the row of the species.
                    </p>
                  </div>
								  <div>
                    <h3>What are the most important but insufficiently protected Critical Sites for a population (in a country)?</h3>
                    <p>
                    Select the <strong>SPECIES</strong> menu. Click on the right arrow at the end of the row for the species. Select the <strong>CSN</strong> tab. Sort the sites by protected area coverage by clicking on arrows next to the <strong>Protected</strong> column heading. If you are interested in a single country, type (part of) the country’s name into the <strong>FILTER BY</strong> box. If there are many sites in the insufficiently protected categories, download the data and sort them by the <strong>Geometric Mean</strong> column (Data \ Sort) in Excel. Set filter on the first row and select the relevant categories in the <strong>Protected</strong> column. (You can also add additional filters by season).
                    </p>
                  </div>
                  <div>
                    <h3>What are the 1% thresholds at a certain location for the application of Ramsar Criterion 6?</h3>
                    <p>
                      Go to the Tools menu, select Threshold Look Up, select the location on the map, scroll down the screen with the mouse wheel or on the right side bar or just type (part of) the name of the species you are interested in the <strong>FILTER BY</strong> box.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StickyContainer>
      </div>
    );
  }
}

export default GuidancePage;
