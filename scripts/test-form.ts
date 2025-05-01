import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function test() {
  try {
    // Clean up any existing test data
    await prisma.wholesaleForm.deleteMany({
      where: {
        email: 'test@example.com'
      }
    })

    // Test Step 1: Contact Information
    console.log('Testing Step 1...')
    const step1 = await prisma.wholesaleForm.create({
      data: {
        firstName: 'Test',
        lastName: 'User',
        mobileNumber: '1234567890',
        email: 'test@example.com',
        businessName: 'Test Business',
        step: 1
      }
    })
    console.log('Step 1 Success:', JSON.stringify(step1, null, 2))

    // Test Step 2: Address
    console.log('\nTesting Step 2...')
    const step2 = await prisma.wholesaleForm.update({
      where: { id: step1.id },
      data: {
        street1: '123 Test St',
        city: 'Test City',
        state: 'CA',
        postalCode: '12345',
        country: 'USA',
        step: 2
      }
    })
    console.log('Step 2 Success:', JSON.stringify(step2, null, 2))

    // Test Step 3: Interest
    console.log('\nTesting Step 3...')
    const step3 = await prisma.wholesaleForm.update({
      where: { id: step1.id },
      data: {
        interest: 'READY_TO_BUY',
        step: 3,
        completed: true
      }
    })
    console.log('Step 3 Success:', JSON.stringify(step3, null, 2))

    // Verify final state
    const finalState = await prisma.wholesaleForm.findUnique({
      where: { id: step1.id }
    })
    console.log('\nFinal Form State:', JSON.stringify(finalState, null, 2))

  } catch (error) {
    console.error('Test failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

console.log('Starting test...\n')
test().then(() => {
  console.log('\nTest completed successfully')
  process.exit(0)
})
