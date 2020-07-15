const mysql = require('mysql')
const { promisify } = require('util')

function promisifyPool(pool) {
	pool.query = promisify(pool.query)
	pool.getConnection = promisify(pool.getConnection)
	pool.end = promisify(pool.end)

	return pool
}

function promisifyConnection(connection) {
	connection.query = promisify(connection.query)
	connection.connect = promisify(connection.connect)
	connection.end = promisify(connection.end)
	connection.ping = promisify(connection.ping)

	return connection
}

function promisifyPoolCluster(poolCluster) {
	poolCluster.getConnection = promisify(poolCluster.getConnection)
	poolCluster.of = function() {
		return promisifyPool(poolCluster.of(...arguments))
	}

	return poolCluster
}

module.exports = {
	...mysql,
	createConnection() {
		return promisifyConnection(mysql.createConnection(...arguments))
	},
	createPool() {
		return promisifyPool(mysql.createPool(...arguments))
	},
	createPoolCluster() {
		return promisifyPoolCluster(mysql.createPoolCluster(...arguments))
	},
}
