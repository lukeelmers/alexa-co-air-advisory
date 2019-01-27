const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { advisories } = require('../settings');

async function fetchCurrentAdvisory() {
  try {
    const response = await fetch(`${advisories.baseUrl}/advisory.aspx`);
    const html = await response.text();
    const document = new JSDOM(html).window.document;

    // ['No Advisories in Effect', 'No Indoor Burning Restrictions']
    const summary = document.querySelector('#pTitle').innerHTML.split('<br>');
    // 'This is the Denver Metro Air Pollution Forecast effective 4PM on Friday, January 25, 2019:'
    const headline = document.querySelectorAll('#divForecast p')[0].textContent;
    // Text paragraph
    const detail = document.querySelectorAll('#divForecast p')[1].textContent;

    return {
      headline,
      summary_advisory: summary[0],
      summary_restrictions: summary[1],
      detail
    };
  } catch(err) {
    throw err;
  }
}

module.exports = {
  fetchCurrentAdvisory
};
