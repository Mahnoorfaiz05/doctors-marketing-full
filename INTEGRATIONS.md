# Integration handoff

The public site, tools, authentication screens and portal are frontend interfaces. They do not claim live persistence.

Connect the typed boundary in `lib/api/client.ts` to a reviewed backend for contact, audit, calculator, assistant, booking, authentication and portal data. Configure environment values from `.env.example` in the deployment environment; never commit secrets.

Before production launch:

- review legal policy wording and final legal entity/contact details;
- replace verification placeholders only with approved sources;
- connect consent-aware analytics and booking;
- complete authentication, authorization, token refresh and organization permissions;
- validate data retention and sensitive-information boundaries;
- add monitoring, rate limiting, abuse prevention and server-side validation.

