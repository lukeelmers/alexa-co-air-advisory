## alexa-co-air-advisory

### Overview
An Alexa skill that checks the current Denver Metro area air quality advisories,
including any indoor burning restrictions.

### Usage
1. Create your Alexa skill in the [Alexa developer console](https://developer.amazon.com/alexa),
including choosing an invocation name.
2. This webtask supports 2 intents:
  - `forecast`: A summary of today's
  [Denver Metro air quality advisories](https://www.colorado.gov/airquality/advisory.aspx)
  - `burn_restrictions`: A summary of today's indoor burning restrictions.
> __Important__: Both can be named whatever you want in the developer console, just be sure
to set the values by copying `.secrets-template` as `.secrets` and filling in the values.
3. Create your interaction model in the console, taking care to include sample utterances
for each of the intents.
4. Deploy Webtask with `npm run create`.
5. Point Alexa to your webtask endpoint using the developer console, and click to build
the skill.
6. Enable testing in the console; now you can use your skill on any Alexa-enabled devices
that are using your Amazon account.
