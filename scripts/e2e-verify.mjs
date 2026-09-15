// End-to-End HTTP Integration Verification Script
import http from 'http';

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request(url, options = {}, postData = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(reqOptions, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body,
          text: () => body.toString('utf-8'),
          json: () => JSON.parse(body.toString('utf-8')),
        });
      });
    });

    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runE2E() {
  console.log('--- STARTING COMPLETE E2E VERIFICATION ON PORT 3000 ---');
  const baseUrl = 'http://localhost:3000';

  // Step 1: Health check / Homepage
  console.log('1. Testing GET / ...');
  const homeRes = await request(`${baseUrl}/`);
  if (homeRes.statusCode !== 200) {
    throw new Error(`Homepage returned status ${homeRes.statusCode}`);
  }
  console.log('   ✓ Homepage OK (200)');

  // Step 2: GET /create
  console.log('2. Testing GET /create ...');
  const createPageRes = await request(`${baseUrl}/create`);
  if (createPageRes.statusCode !== 200) {
    throw new Error(`/create returned status ${createPageRes.statusCode}`);
  }
  console.log('   ✓ /create Page OK (200)');

  // Step 3: POST /api/contracts
  console.log('3. Testing POST /api/contracts ...');
  const contractPayload = {
    freelancerName: 'David Miller',
    freelancerTaxId: 'US-EIN-99281',
    paymentUrl: 'https://buy.stripe.com/test_deposit_checkout',
    title: 'Custom E-Commerce Storefront',
    scopeSummary: 'Design and deploy responsive Shopify headless storefront with Tailwind and Algolia.',
    deliverables: [
      'Figma design system & interactive prototypes',
      'Headless Next.js storefront on Vercel',
      'Algolia instant search and filtering',
      'Stripe checkout payment pipeline',
    ],
    revisionLimit: 3,
    outOfScopeHourlyRate: 125,
    totalAmount: 6000,
    depositAmount: 3000,
    currency: 'USD',
  };

  const createRes = await request(
    `${baseUrl}/api/contracts`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    contractPayload
  );

  if (createRes.statusCode !== 201) {
    throw new Error(`Create contract failed with status ${createRes.statusCode}: ${createRes.text()}`);
  }

  const createdData = createRes.json();
  console.log('   ✓ Contract Created! ID:', createdData.contractId);
  console.log('   ✓ SHA-256 Hash:', createdData.termsHash);
  if (!createdData.contractId || createdData.contractId.length !== 12) {
    throw new Error(`Invalid contract ID generated: ${createdData.contractId}`);
  }

  const contractId = createdData.contractId;

  // Step 4: GET /p/[contractId]
  console.log(`4. Testing GET /p/${contractId} ...`);
  const proposalPageRes = await request(`${baseUrl}/p/${contractId}`);
  if (proposalPageRes.statusCode !== 200) {
    throw new Error(`Proposal page returned status ${proposalPageRes.statusCode}`);
  }
  const pageHtml = proposalPageRes.text();
  if (!pageHtml.includes('David Miller') && !pageHtml.includes(contractId)) {
    throw new Error('Proposal page HTML missing expected contract identifiers');
  }
  console.log('   ✓ Client Proposal Page Loaded (200)');

  // Step 5: POST /api/sign
  console.log('5. Testing POST /api/sign ...');
  const signPayload = {
    contractId,
    signerName: 'Sarah Jenkins',
    signerEmail: 'sarah.jenkins@acme.org',
    consentAccepted: true,
  };

  const signRes = await request(
    `${baseUrl}/api/sign`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'E2E-Automated-Verifier' },
    },
    signPayload
  );

  if (signRes.statusCode !== 200) {
    throw new Error(`Sign contract failed with status ${signRes.statusCode}: ${signRes.text()}`);
  }

  const signData = signRes.json();
  console.log('   ✓ Contract Ratified! Redirect URL:', signData.redirectUrl);
  if (signData.redirectUrl !== contractPayload.paymentUrl) {
    throw new Error(`Expected redirect URL ${contractPayload.paymentUrl}, got ${signData.redirectUrl}`);
  }

  // Step 6: GET /api/pdf/[contractId]
  console.log(`6. Testing GET /api/pdf/${contractId} ...`);
  const pdfRes = await request(`${baseUrl}/api/pdf/${contractId}`);
  if (pdfRes.statusCode !== 200) {
    throw new Error(`PDF generation returned status ${pdfRes.statusCode}: ${pdfRes.text()}`);
  }
  if (pdfRes.headers['content-type'] !== 'application/pdf') {
    throw new Error(`Expected application/pdf, got ${pdfRes.headers['content-type']}`);
  }
  const pdfHeader = pdfRes.body.slice(0, 5).toString('utf-8');
  if (pdfHeader !== '%PDF-') {
    throw new Error(`Invalid PDF header: ${pdfHeader}`);
  }
  console.log(`   ✓ Streamed Valid PDF (${pdfRes.body.length} bytes, header: ${pdfHeader})`);

  // Step 7: GET /p/[contractId]/success
  console.log(`7. Testing GET /p/${contractId}/success ...`);
  const successPageRes = await request(`${baseUrl}/p/${contractId}/success`);
  if (successPageRes.statusCode !== 200) {
    throw new Error(`Success page returned status ${successPageRes.statusCode}`);
  }
  console.log('   ✓ Success Page Loaded (200)');

  console.log('--- COMPLETE END-TO-END VERIFICATION SUCCEEDED WITH 100% PASSING CHECKS! ---');
}

runE2E().catch((err) => {
  console.error('E2E Verification Failed:', err);
  process.exit(1);
});
