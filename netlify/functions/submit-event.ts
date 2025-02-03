// netlify/functions/submit-event.ts

import { Handler } from '@netlify/functions';

// Mapping from city to are.na channel IDs (replace with your actual channel IDs)
const cityChannels: { [key: string]: string } = {
  Leipzig: 'leipzig-lhwaeiwmmrw',
  Berlin: 'berlin-k2d6mltcmcg',
  // Add more mappings as needed
};

// Read the are.na API token from environment variables
const ARENA_API_TOKEN = process.env.ARENA_API_TOKEN;

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { title, description, date, location, imageUrl, category, tags } =
      data;

    // Validate required fields
    if (!title || !date || !location || !location.city || !imageUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Determine the are.na channel ID based on the city
    const channelId = cityChannels[location.city];
    if (!channelId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error:
            'No channel mapping found for this city, please reach out at hello@eosarchive.app and we will create that for you.',
        }),
      };
    }

    // Prepare the block data to send to are.na.
    // Adjust the payload structure as per are.na’s API documentation.
    const blockData = {
      title,
      description: `$Date: ${date}`,
      content: `${description}\n\nDate: ${date}\nCategory: ${category}\nTags: ${tags.join(
        ', '
      )}`,
      imageUrl,
    };

    // Send the POST request to the are.na API
    const response = await fetch(
      `https://api.are.na/v2/channels/${channelId}/blocks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ARENA_API_TOKEN}`,
        },
        body: JSON.stringify(blockData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: result }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result }),
    };
  } catch (error) {
    console.error('Error in submit-event function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
