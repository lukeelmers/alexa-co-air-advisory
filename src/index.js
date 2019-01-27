'use latest';

const { get } = require('lodash');
const { fetchCurrentAdvisory } = require('./services/advisories');

module.exports = async (ctx, cb) => {

  try {
    const forecast_intent_name = get(ctx, 'secrets.INTENT_NAME_ADVISORY_FORECAST', 'forecast');
    const burn_restrictions_intent_name = get(ctx, 'secrets.INTENT_NAME_ADVISORY_BURN_RESTRICTIONS', 'burn_restrictions');
    const additional_text = {
      forecast: get(ctx, 'secrets.FORECAST_ADDITIONAL_TEXT', ''),
      burn_restrictions: get(ctx, 'secrets.BURN_RESTRICTIONS_ADDITIONAL_TEXT', ''),
      no_burn_restrictions: get(ctx, 'secrets.NO_BURN_RESTRICTIONS_ADDITIONAL_TEXT', '')
    }

    const intent = get(ctx, 'body.request.intent.name', forecast_intent_name);
    const current = await fetchCurrentAdvisory();

    let responseText = current.headline;
    if (intent === burn_restrictions_intent_name) {
      const text = current.summary_restrictions.includes('No Indoor Burning Restrictions')
        ? additional_text.no_burn_restrictions
        : additional_text.burn_restrictions;
      responseText += ` ${text} ${current.summary_advisory}. ${current.summary_restrictions}.`;
    } else {
      responseText += ` ${additional_text.forecast} ${current.detail}`;
    }

    cb(null, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: {
          type: 'PlainText',
          text: responseText
        }
      }
    });
  } catch(err) {
    cb(err);
  }

};
