#!/usr/bin/env node
// Setup script for initializing the StyleHub admin dashboard

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n===================================');
console.log('StyleHub Admin Dashboard Setup');
console.log('===================================\n');

console.log('This script will:');
console.log('1. Generate Prisma client');
console.log('2. Run database migrations');
console.log('3. Seed the database with admin user and sample products\n');

rl.question('Do you want to continue? (y/n): ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    try {
      console.log('\n➤ Step 1: Generating Prisma client...');
      execSync('npx prisma generate', { stdio: 'inherit' });
      
      console.log('\n➤ Step 2: Running database migrations...');
      execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
      
      console.log('\n➤ Step 3: Seeding database...');
      execSync('npx prisma db seed', { stdio: 'inherit' });
      
      console.log('\n✅ Setup completed successfully!');
      console.log('\nAdmin credentials:');
      console.log('  Email: admin@stylehub.com');
      console.log('  Password: admin123');
      
      console.log('\nYou can now start the application with:');
      console.log('  npm run dev');
      console.log('\nThen visit:');
      console.log('  http://localhost:3000/admin/login');
    } catch (error) {
      console.error('\n❌ Setup failed:', error.message);
      console.error('Please check the error above and try again.');
    }
  } else {
    console.log('\nSetup cancelled.');
  }
  
  rl.close();
}); 