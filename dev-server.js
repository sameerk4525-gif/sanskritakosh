// Simple server starter for development
require('dotenv').config();
const Module = require('module');
const path = require('path');

// Add TypeScript support
require('tsx/cjs');

// Set correct cwd for module resolution
process.chdir(path.join(__dirname, 'apps/api'));

// Now import and run the Express app
const { createServer } = require('./apps/api/src/index.ts');
