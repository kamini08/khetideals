import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';
import { NextResponse } from 'next/server';

const pipeline = promisify(stream.pipeline);
const url = 'https://w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

const handler = async (req:Request) => {
  const response = await fetch(url); // replace this with your API call & options
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  await pipeline(response.body);
  return NextResponse.json({
    status: 200,
    message: 'File downloaded successfully',

  },
  { headers: {
    
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=dummy.pdf',

  },
    
  }
)
  
};

export default handler;