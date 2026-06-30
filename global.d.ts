import enCommon from './lang/en/common.json';
import enHome from './lang/en/home.json';
import enMeta from './lang/en/meta.json';
import enAuth from './lang/en/auth.json';
import enBusiness from './lang/en/business.json';
import enAbout from './lang/en/about.json';
import enCoverage from './lang/en/coverage.json';
import enContact from './lang/en/contact.json';
import enLegal from './lang/en/legal.json';
import enFleets from './lang/en/fleets.json';
import enHelp from './lang/en/help.json';
import enServices from './lang/en/services.json';
import enAirports from './lang/en/airports.json';
import enBooking from './lang/en/booking.json';

type Messages = {
  common: typeof enCommon;
  home: typeof enHome;
  meta: typeof enMeta;
  auth: typeof enAuth;
  business: typeof enBusiness;
  about: typeof enAbout;
  coverage: typeof enCoverage;
  contact: typeof enContact;
  legal: typeof enLegal;
  fleets: typeof enFleets;
  help: typeof enHelp;
  services: typeof enServices;
  airports: typeof enAirports;
  booking: typeof enBooking;
};

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
