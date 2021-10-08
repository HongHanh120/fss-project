const url = 'http://localhost:8000';

const supertest = require('supertest')(url);
const amqp = require('amqplib');
require('should');