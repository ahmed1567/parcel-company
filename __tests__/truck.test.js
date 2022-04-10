const supertest=require("supertest");
const truck=require("../controllers/truckController")
var express = require('express');
const app=require("../app");
const mysql=require("mysql");
const {con}=require("../models/databaseModel")

jest.setTimeout(60000);



describe('truck controller', () => {
    
  test('responds to get /truck/add', async () => {
    const res = await supertest(app).get('/truck/add');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  })

  test('responds to get /truck/truck_driver', async () => {
    const res = await supertest(app).get('/truck/truck_driver');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  })
  test('responds to get /truck/all_trucks', async () => {
    const res = await supertest(app).get('/truck/all_trucks');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  })

  test('responds to get /truck/sign_out', async () => {
    const res = await supertest(app).get('/truck/sign_out');
    expect(res.redirect);
  })
});

describe('truck controller post request', () => {
    test('responds to post /truck/driver_sign_in', async () => {
        const res = await supertest(app).post('/truck/truck_driver').send({
            sign_in:'sign_in',
            truck_id:1544,
            password:'sdffsd'
          });
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
      })
    
    test('responds to post /truck/driver_sign_in not match', async () => {
        const res = await supertest(app).post('/truck/truck_driver').send({
            sign_in:'sign_in',
            truck_id:1544,
            password:'sdffssd'
          });
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
      })
    test('responds to post /truck/driver_sign_in not found the driver id in database', async () => {
        const res = await supertest(app).post('/truck/truck_driver').send({
            sign_in:'sign_in',
            truck_id:154,
            password:'sdffssd'
          });
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
      })

      //if we comment test from line 69 to 79 with change on truck_id we get the test
    
    // test('responds to post /truck/add', async () => {
    //     const res = await supertest(app).post('/truck/add').send({
    //         truck_id:1574,
    //         name:"dfklds",
    //         weight:"1255",
    //         password:"sdffsd",
    //         add:"ADD"
    //       });
    //     expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    //     expect(res.statusCode).toBe(200);
    //   })
});

describe('for truck view func', () => {
  test('responds to get parcel in truck for the admin', async () => {
    const res = await supertest(app).get('/truck/view_truck/?id=1544')
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  })
  test('responds to get parcel in truck for the driver', async () => {
    const res = await supertest(app).get('/truck/view_truck/?id=1544&parcel_id=14')
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  })

  
});



