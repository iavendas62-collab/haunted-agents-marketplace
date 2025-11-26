#!/usr/bin/env node

/**
 * End-to-End CLI Test Script
 * 
 * Tests the CLI functionality by directly importing and executing commands
 */

const path = require('path');
const fs = require('fs-extra');

// Import CLI commands
const { ValidateCommand } = require('./skeleton/cli/src/commands/validate.ts');
const { ListCommand } = require('./skeleton/cli/src/commands/list.ts');

async function testCLI() {
  console.log('🧪 Testing CLI End-to-End\n');
  
  // Test 1: Validate a bundle
  console.log('Test 1: Validating react-supabase-expert bundle...');
  try {
    const validateCmd = new ValidateCommand();
    await validateCmd.execute(['app1-kiro-marketplace/bundles/react-supabase-expert'], {});
    console.log('✅ Validation test passed\n');
  } catch (error) {
    console.error('❌ Validation test failed:', error.message);
  }
  
  // Test 2: Validate another bundle
  console.log('Test 2: Validating cicd-pipeline-template bundle...');
  try {
    const validateCmd = new ValidateCommand();
    await validateCmd.execute(['app2-devops-hub/bundles/cicd-pipeline-template'], {});
    console.log('✅ Validation test passed\n');
  } catch (error) {
    console.error('❌ Validation test failed:', error.message);
  }
  
  // Test 3: List installed bundles
  console.log('Test 3: Listing installed bundles...');
  try {
    const listCmd = new ListCommand();
    await listCmd.execute([], {});
    console.log('✅ List test passed\n');
  } catch (error) {
    console.error('❌ List test failed:', error.message);
  }
  
  console.log('🎉 CLI End-to-End tests complete!');
}

testCLI().catch(console.error);
