const supertest=require("supertest");
const parcel=require("../controllers/parcelController")
var express = require('express');
const app=require("../app")
const {con}=require('../models/databaseModel')

jest.setTimeout(60000);



describe('parcel controller test', () => {

  test('responds to /add', async () => {
    const res = await supertest(app).get('/parcel/add');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to post /add', async () => {
    const res = await supertest(app).post('/parcel/add').send({
      add:"ADD",
      truck:"ahmed",
      name:"dsfhja",
      weight:"125",
      details:"sdfkjhdsjmhjkfdsh"
    });
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /all_parcel', async () => {
    const res = await supertest(app).get('/parcel/all_parcels')
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);

  });
});



  
