'use server';

import { z } from 'zod';

// Define schemas for each step
const step1Schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

const step2Schema = z.object({
  email: z.string().email(), // Email is needed to find and update the contact
  childs_name: z.string(),
  grade_applying_for: z.string(),
});

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY || 'your-hubspot-private-app-token';

// This function creates or updates a contact.
async function upsertHubspotContact(email: string, propertiesToUpdate: { property: string; value: any }[]) {
  if (HUBSPOT_API_KEY === 'your-hubspot-private-app-token' || !HUBSPOT_API_KEY) {
    console.warn("HubSpot API Key is not set. Skipping contact sync.");
    // In production, we don't want to block the user flow if the API key is missing.
    // In development, this message is a helpful reminder.
    return { success: true, message: "Contact sync skipped (API key not set)." };
  }

  // HubSpot's V3 API requires a different structure.
  const hubspotApiUrl = `https://api.hubapi.com/crm/v3/objects/contacts`;
  
  const propertiesObject = propertiesToUpdate.reduce((obj, item) => {
    obj[item.property] = item.value;
    return obj;
  }, {} as Record<string, any>);

  try {
    // First, search for the contact by email to see if it exists
    const searchUrl = `${hubspotApiUrl}/search`;
    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: email
          }]
        }]
      })
    });

    if (!searchResponse.ok) {
      const errorBody = await searchResponse.text();
      console.error('HubSpot Search API Error:', errorBody);
      // Fail silently in production
      return { 
        success: process.env.NODE_ENV !== 'production', 
        message: `Failed to search contact in HubSpot. Response: ${errorBody}` 
      };
    }

    const searchData = await searchResponse.json();

    if (searchData.results && searchData.results.length > 0) {
      // Contact exists, update it using PATCH and its ID
      const contactId = searchData.results[0].id;
      const updateUrl = `${hubspotApiUrl}/${contactId}`;
      const updateResponse = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({ properties: propertiesObject }),
      });
      
      if (updateResponse.ok) {
        return { success: true, message: 'Contact updated successfully.' };
      } else {
        const errorBody = await updateResponse.text();
        console.error('HubSpot Update API Error:', errorBody);
        return { 
          success: process.env.NODE_ENV !== 'production', 
          message: `Failed to update contact. Response: ${errorBody}` 
        };
      }

    } else {
      // Contact does not exist, create it using POST
      const createResponse = await fetch(hubspotApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({ properties: {...propertiesObject, email: email } }),
      });

      if (createResponse.ok) {
        return { success: true, message: 'Contact created successfully.' };
      } else {
        const errorBody = await createResponse.text();
        console.error('HubSpot Create API Error:', errorBody);
        return { 
          success: process.env.NODE_ENV !== 'production', 
          message: `Failed to create contact. Response: ${errorBody}` 
        };
      }
    }

  } catch (error) {
    console.error('Error syncing HubSpot contact:', error);
    return { 
      success: process.env.NODE_ENV !== 'production', 
      message: 'An unexpected error occurred during contact sync.'
    };
  }
}

export async function submitStep1(data: z.infer<typeof step1Schema>) {
  const [firstName, ...lastNameParts] = data.name.split(' ');
  const lastName = lastNameParts.join(' ');
  
  const properties = [
    { property: 'firstname', value: firstName },
    { property: 'lastname', value: lastName || '' },
    { property: 'email', value: data.email },
    { property: 'phone', value: data.phone },
  ];

  return await upsertHubspotContact(data.email, properties);
}

export async function submitStep2(data: z.infer<typeof step2Schema>) {
  const properties = [
    { property: 'childs_name', value: data.childs_name },
    { property: 'grade_applying_for', value: data.grade_applying_for },
  ];
  return await upsertHubspotContact(data.email, properties);
}
