import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

import fs from 'fs';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Wait to initialize Resend until requested, just in case API key is missing
  // to prevent server crashing on startup.
  const getResend = () => {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not configured.');
    return new Resend(key);
  };

  const getSupabase = () => {
    const defaultUrl = 'https://yyhwwfvjthdcvcwkjyvt.supabase.co';
    const defaultKey = 'sb_publishable_yGXqd3IZCyP0Dtr8utsqiQ_LHoq8YUV';
    
    const supabaseUrl = process.env.SUPABASE_URL || defaultUrl;
    const supabaseKey = process.env.SUPABASE_ANON_KEY || defaultKey;
    
    return createClient(supabaseUrl, supabaseKey);
  };

  const inMemoryBookings: Array<{date: string, time: string, stylistName: string}> = [];
  
  let stylistsDb = [
    { id: '1', name: 'Thiru', role: 'Master Stylist', available: true, leaves: [], blockedSlots: [] as {date: string, time: string}[] },
  ];

  try {
    if (fs.existsSync('stylists.json')) {
      stylistsDb = JSON.parse(fs.readFileSync('stylists.json', 'utf-8'));
    }
  } catch (e) {
    console.error('Failed to load stylistsDb', e);
  }

  app.get('/api/stylists', (req, res) => {
    res.json(stylistsDb);
  });

  app.post('/api/admin/stylists', (req, res) => {
    // Expecting the full updated array
    stylistsDb = req.body;
    try {
      fs.writeFileSync('stylists.json', JSON.stringify(stylistsDb, null, 2));
    } catch (e) {
      console.error('Failed to save stylistsDb', e);
    }
    res.json({ success: true });
  });

  app.get('/api/bookings', (req, res) => {
    const { date, formattedDate, stylistName } = req.query;
    if (!date || typeof date !== 'string' || !stylistName || typeof stylistName !== 'string') {
      return res.json([]);
    }
    
    const stylist = stylistsDb.find(s => s.name === stylistName);
    
    let bookedForDateStylist = inMemoryBookings
      .filter(b => b.date === date && b.stylistName === stylistName)
      .map(b => b.time);
      
    if (stylist) {
      const explicitBlocked = stylist.blockedSlots
        .filter(b => b.date === formattedDate || b.date === date)
        .map(b => b.time);
      bookedForDateStylist = [...bookedForDateStylist, ...explicitBlocked];
    }

    res.json(bookedForDateStylist);
  });

  app.post('/api/book', async (req, res) => {
    try {
      const {
        date,
        time,
        service,
        stylistName,
        customerName,
        customerPhone,
      } = req.body;

      // Use the email configured in project settings
      const ownerEmail = process.env.OWNER_EMAIL;

      if (!ownerEmail) {
        return res.status(500).json({ error: 'OWNER_EMAIL is not configured in Project Settings! Please add your new email there.' });
      }

      const resend = getResend();

      inMemoryBookings.push({ date, time, stylistName });

      let warnings: string[] = [];

      // Save to Supabase
      try {
        const supabase = getSupabase();
        const { error: dbError } = await supabase
          .from('bookings')
          .insert([
            {
              customer_name: customerName,
              customer_phone: customerPhone,
              service: service,
              stylist_name: stylistName,
              booking_date: date,
              booking_time: time,
            }
          ]);
        
        if (dbError) {
          console.error("Supabase Error:", dbError);
          warnings.push("Failed to save booking to database (Ensure 'bookings' table exists).");
        }
      } catch (dbErr) {
        console.error("Supabase Catch Error:", dbErr);
        warnings.push("Database connection error.");
      }

      // Safely get from email, ensuring it's an actual email address not an API key by mistake
      const configuredFromEmail = process.env.RESEND_FROM_EMAIL;
      const fromEmail = (configuredFromEmail && configuredFromEmail.includes('@')) 
        ? configuredFromEmail 
        : 'Stylish Stars Salon <onboarding@resend.dev>';

      // 1. Send Email to Owner (Salon)
      const ownerEmailResponse = await resend.emails.send({
        from: fromEmail,
        to: ownerEmail,
        subject: `New Booking: ${customerName} - ${service}`,
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
    <h1 style="margin: 0; color: #dab673; font-size: 24px;">Stylish Star Parlour</h1>
    <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 14px;">New Booking Alert</p>
  </div>
  
  <div style="padding: 30px; background-color: #fafafa;">
    <h2 style="margin-top: 0; color: #333333; font-size: 20px; border-bottom: 2px solid #dab673; padding-bottom: 10px; display: inline-block;">Booking Summary</h2>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold; width: 120px;">Customer</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #333333; font-weight: bold;">${customerName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">Phone</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #333333;">
          <a href="tel:${customerPhone}" style="color: #dab673; text-decoration: none;">${customerPhone}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">Service</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #333333;">${service}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">Stylist</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #333333;">${stylistName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">Date</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #333333;">${date}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">Time</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #333333;"><span style="background-color: #dab673; color: #1a1a1a; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 14px;">${time}</span></td>
      </tr>
    </table>
  </div>
  
  <div style="background-color: #f0f0f0; padding: 15px; text-align: center; color: #888888; font-size: 12px;">
    This is an automated notification from your booking system.
  </div>
</div>
        `,
      });

      if (ownerEmailResponse.error) {
        if (ownerEmailResponse.error.name === 'validation_error') {
          warnings.push("Note: Owner email wasn't sent because Resend test accounts can only send to verified emails.");
        } else {
          console.error('Owner Email Error:', ownerEmailResponse.error);
          warnings.push("Failed to send notification to owner.");
        }
      }

      const combinedWarning = warnings.length > 0 ? warnings.join(' ') : undefined;

      res.json({ 
        success: true, 
        message: 'Booking confirmed!',
        warning: combinedWarning 
      });
    } catch (err: any) {
      console.error('Booking API Error:', err);
      res.status(500).json({ error: err.message || 'An error occurred during booking.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
