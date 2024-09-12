import clientPromise from '@/lib/mongodb';
import SharecropperModel from '@/models/shareCropper';
import { NextResponse } from 'next/server';

export async function GET() {
    await clientPromise ();
   try {
     // Fetch all landholders from the database
     const landholders = await SharecropperModel.find({});
     
     // Return the landholders as a JSON response
     return NextResponse.json(landholders, { status: 200 });
   } catch (error:any) {
     // Return an error message as a JSON response
     return NextResponse.json({ message: error.message }, { status: 500 });
   }
 }
 
