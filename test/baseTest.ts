import * as chai from 'chai';
const chaiHttp = require('chai-http');

import app from '../src/app';

export default class BaseTest {
  chai: any;
  should: any;
  baseRoute: string;
  server: any;

  constructor(baseRoute: string) {
      this.server = app;
      this.baseRoute = baseRoute;
      this.chai = chai;
      this.chai.use(chaiHttp);
      this.should = chai.should();
  }
}