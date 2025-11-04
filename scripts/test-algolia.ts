import { searchClient, POSTS_INDEX } from '../lib/algolia/config';

async function testAlgolia() {
  try {
    console.log('Attempting to connect to Algolia...');

    // Cú pháp đúng cho v5 là truyền một object chứa key 'requests'
    const { results } = await searchClient.search({
      requests: [
        {
          indexName: POSTS_INDEX,
          query: 'test',
        },
      ],
    });

    console.log('✅ Algolia connected!');
    const firstResult = results[0];

    // Dùng type guard để kiểm tra xem kết quả có phải là SearchResponse không
    if (firstResult && 'hits' in firstResult) {
      console.log(`Found ${firstResult.nbHits} hits in index "${firstResult.index}".`);
      console.log('Sample hits:', firstResult.hits.slice(0, 3)); // Chỉ hiển thị 3 kết quả đầu tiên
    } else {
      console.log('No standard search results found.');
    }
  } catch (error) {
    console.error('❌ Algolia error:', error);
  }
}

testAlgolia();
