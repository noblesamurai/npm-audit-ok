#!/usr/bin/env node

const { spawn } = require('child_process');

async function run () {
  const audit = spawn('npm', ['audit', '--json']);
  const output = JSON.parse(await require('get-stream')(audit.stdout));
  const critical = output.metadata.vulnerabilities.critical;
  if (critical > 0) {
    console.error('There are critical security vulnerabilities, please resolve these in your package-lock.json.');
    process.exit(1);
  }
}

run();
