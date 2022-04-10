const supertest = require("supertest");
const home= require("../controllers/homeController");
var express = require("express");
const app = require("../app");
const sinon = require('sinon');


describe('home controller test', () => {

  test('responds to /', async () => {
    const res = await supertest(app).get('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
 

  })



  test('responds to sign in /admin', async () => {
    const res = await supertest(app).get('/admin');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to real post /admin', async () => {
    const res = await supertest(app).post('/admin').send({
      email: "admin@gmail.com",
      password:"qwert"
    });
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to fake post /admin', async () => {
    const res = await supertest(app).post('/admin').send({
      email: 'a@gmail',
      password:"sfdsdl"
    });
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
  
});

