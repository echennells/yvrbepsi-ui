import type { NextApiRequest, NextApiResponse } from 'next';

interface BTCPayInvoice {
  invoiceId: string;
  address: string;
  due: string;
  status: string;
  paymentMethodCurrency: string;
  itemDesc: string;
  invoiceBitcoinUrl: string;
  invoiceBitcoinUrlQR: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BTCPayInvoice | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { choiceKey } = req.body;

  if (!choiceKey) {
    return res.status(400).json({ error: 'choiceKey is required' });
  }

  const posUrl = process.env.NEXT_PUBLIC_BTCPAY_POS_URL;
  const baseUrl = process.env.NEXT_PUBLIC_BTCPAY_BASE_URL;

  if (!posUrl || !baseUrl) {
    console.error('[Ark API] Missing environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    console.log('[Ark API] Creating invoice for', choiceKey);

    // Step 1: POST to BTCPay POS endpoint
    const createResponse = await fetch(posUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `choiceKey=${choiceKey}`,
      redirect: 'manual',
    });

    console.log('[Ark API] Response status:', createResponse.status);

    // Step 2: Extract invoice ID from Location header
    const location = createResponse.headers.get('location');
    if (!location) {
      console.error('[Ark API] No location header found');
      return res.status(500).json({ error: 'Failed to create invoice' });
    }

    const invoiceId = location.split('/').pop();
    console.log('[Ark API] Invoice ID:', invoiceId);

    // Step 3: Get invoice details
    const statusUrl = `${baseUrl}/invoice/status?invoiceId=${invoiceId}`;
    console.log('[Ark API] Fetching status from:', statusUrl);

    const statusResponse = await fetch(statusUrl);
    const invoiceData: BTCPayInvoice = await statusResponse.json();

    console.log('[Ark API] Invoice created successfully');
    return res.status(200).json(invoiceData);
  } catch (error) {
    console.error('[Ark API] Error creating invoice:', error);
    return res.status(500).json({ error: 'Failed to create invoice' });
  }
}
