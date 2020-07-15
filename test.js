const mysql = require('./index.js')
const { test } = require('uvu')
const assert = require('uvu/assert')

const { parsed: dbConfig } = require('dotenv').config()

test('pool.query ', async() => {
	const pool = mysql.createPool(dbConfig)

	const res = await pool.query('SELECT 1')
	assert.type(res, 'object')
	await pool.end()
})

test('pool.getConnection ', async() => {
	const pool = mysql.createPool(dbConfig)

	const res = await pool.getConnection()
	assert.type(res, 'object')
	await pool.end()
})

test('pool.end', async() => {
	const pool = mysql.createPool(dbConfig)

	const res = await pool.end()
	assert.type(res, 'undefined')
	await pool.end()
})

test('connection.query', async() => {
	const connection = mysql.createConnection(dbConfig)

	const res = await connection.query('SELECT 1')
	assert.type(res, 'object')
	await connection.end()
})

test('connection.connect', async() => {
	const connection = mysql.createConnection(dbConfig)

	const res = await connection.connect()
	assert.type(res, 'object')
	await connection.end()
})

test('connection.end', async() => {
	const connection = mysql.createConnection(dbConfig)

	const res = await connection.end()
	assert.type(res, 'undefined')
})

test('connection.ping', async() => {
	const connection = mysql.createConnection(dbConfig)

	const res = await connection.ping()
	assert.type(res, 'object')
	await connection.end()
})

test.run()
