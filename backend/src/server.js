const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const redis = require('ioredis');
const kafka = require('kafka-node');
const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');

// Create HTTP server
const server = http.createServer(app);

// WebSocket setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Redis Connection
const redisClient = new redis(process.env.REDIS_URL);
redisClient.on('connect', () => console.log('✅ Redis connected'));
redisClient.on('error', (err) => console.error('❌ Redis error:', err));

// Kafka Connection
const kafkaClient = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKERS });
const producer = new kafka.Producer(kafkaClient);

producer.on('ready', () => {
  console.log('✅ Kafka Producer is ready');
});

producer.on('error', (err) => {
  console.error('❌ Kafka Producer error:', err);
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
