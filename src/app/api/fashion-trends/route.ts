import { NextResponse } from 'next/server';

// Function to fetch fashion news from a free news API
export async function GET() {
  try {
    // Fetch fashion news using NewsAPI (or similar free API)
    const response = await fetch(
      'https://newsapi.org/v2/everything?q=fashion+trends&sortBy=publishedAt&language=en&pageSize=10',
      {
        headers: {
          // Using a free placeholder, in production use environment variables
          'X-Api-Key': 'placeholder-key', 
        },
        next: { revalidate: 3600 } // Revalidate cache every hour
      }
    );

    // Since we're using a placeholder API key, we'll return mock data for demo purposes
    // In a real application, you'd use process.env.NEWS_API_KEY and return actual results

    const mockFashionTrends = {
      status: "ok",
      totalResults: 10,
      articles: [
        {
          source: { id: "vogue", name: "Vogue" },
          author: "Emily Johnson",
          title: "Sustainable Fashion Takes Center Stage at Paris Fashion Week",
          description: "Designers showcase eco-friendly materials and ethical production methods in their latest collections.",
          url: "https://example.com/sustainable-fashion",
          urlToImage: "https://picsum.photos/id/237/800/400",
          publishedAt: "2023-06-15T09:30:00Z",
          content: "Paris Fashion Week highlighted sustainable fashion trends with designers committed to reducing environmental impact through innovative materials and production techniques."
        },
        {
          source: { id: "elle", name: "Elle" },
          author: "Michael Wong",
          title: "Y2K Fashion Makes a Strong Comeback in 2023",
          description: "Low-rise jeans, butterfly tops, and platform shoes are seeing a revival among Gen Z fashion enthusiasts.",
          url: "https://example.com/y2k-revival",
          urlToImage: "https://picsum.photos/id/240/800/400",
          publishedAt: "2023-06-14T14:15:00Z",
          content: "Y2K fashion elements from the early 2000s are experiencing a major revival, particularly among younger fashion enthusiasts who are embracing the nostalgic aesthetic."
        },
        {
          source: { id: "harpersbazaar", name: "Harper's Bazaar" },
          author: "Sophie Turner",
          title: "Digital Fashion NFTs: The Next Frontier in Luxury Fashion",
          description: "Major fashion houses are exploring digital fashion through NFTs and metaverse experiences.",
          url: "https://example.com/digital-fashion-nfts",
          urlToImage: "https://picsum.photos/id/242/800/400",
          publishedAt: "2023-06-13T12:00:00Z",
          content: "Luxury brands are exploring the digital fashion space with NFT collections and virtual fashion shows, creating new revenue streams and engaging with tech-savvy consumers."
        },
        {
          source: { id: "wwd", name: "WWD" },
          author: "James Peterson",
          title: "Dopamine Dressing: Bold Colors Dominate Summer Collections",
          description: "Fashion designers are embracing vibrant, mood-boosting colors in response to post-pandemic consumer preferences.",
          url: "https://example.com/dopamine-dressing",
          urlToImage: "https://picsum.photos/id/244/800/400",
          publishedAt: "2023-06-12T10:45:00Z",
          content: "Bright, saturated colors are trending in summer fashion as consumers seek joy and self-expression through their wardrobes after years of pandemic restrictions."
        },
        {
          source: { id: "gq", name: "GQ" },
          author: "David Chen",
          title: "Genderless Fashion Continues to Reshape Industry Standards",
          description: "Major retailers are expanding genderless collections as consumer demand for inclusive fashion grows.",
          url: "https://example.com/genderless-fashion",
          urlToImage: "https://picsum.photos/id/248/800/400",
          publishedAt: "2023-06-11T16:20:00Z",
          content: "Genderless and fluid fashion is becoming more mainstream as brands respond to changing consumer attitudes and a growing emphasis on inclusivity in the fashion industry."
        },
        {
          source: { id: "instyle", name: "InStyle" },
          author: "Lisa Wang",
          title: "Craftcore: Artisanal Techniques Reimagined for Modern Fashion",
          description: "Craftsmanship-focused fashion featuring crochet, patchwork, and handmade details is gaining popularity.",
          url: "https://example.com/craftcore-fashion",
          urlToImage: "https://picsum.photos/id/252/800/400",
          publishedAt: "2023-06-10T08:30:00Z",
          content: "Craftcore is emerging as a major trend, with traditional techniques like crochet, embroidery, and patchwork being reimagined in contemporary fashion designs."
        },
        {
          source: { id: "businessoffashion", name: "Business of Fashion" },
          author: "Robert Johnson",
          title: "Fashion Rental Services See Unprecedented Growth Post-Pandemic",
          description: "The fashion rental market is expected to reach $2.8 billion by 2025 as consumers embrace more sustainable consumption models.",
          url: "https://example.com/fashion-rental-growth",
          urlToImage: "https://picsum.photos/id/256/800/400",
          publishedAt: "2023-06-09T11:15:00Z",
          content: "Fashion rental and subscription services are experiencing rapid growth as consumers seek more sustainable and economical alternatives to traditional fashion consumption."
        },
        {
          source: { id: "vogue", name: "Vogue" },
          author: "Emma Roberts",
          title: "Maximalism vs. Minimalism: Fashion's Dual Trend Trajectory",
          description: "The fashion industry is seeing parallel trends of both extravagant maximalism and refined minimalism.",
          url: "https://example.com/maximalism-minimalism",
          urlToImage: "https://picsum.photos/id/260/800/400",
          publishedAt: "2023-06-08T13:40:00Z",
          content: "Fashion is experiencing a unique moment where both maximalist and minimalist aesthetics are trending simultaneously, offering consumers distinct style choices."
        },
        {
          source: { id: "elle", name: "Elle" },
          author: "Priya Patel",
          title: "Regenerative Fashion: Beyond Sustainability to Environmental Healing",
          description: "Brands are exploring regenerative agriculture and production methods that actively restore ecosystems.",
          url: "https://example.com/regenerative-fashion",
          urlToImage: "https://picsum.photos/id/264/800/400",
          publishedAt: "2023-06-07T09:00:00Z",
          content: "Regenerative fashion is the next frontier of sustainable fashion, focusing on agricultural and production practices that actively restore and improve environmental health."
        },
        {
          source: { id: "wwd", name: "WWD" },
          author: "Thomas Brown",
          title: "AI-Designed Fashion Collections Debut at Milan Fashion Week",
          description: "Technology companies partner with designers to showcase the first fully AI-developed commercial fashion collections.",
          url: "https://example.com/ai-fashion-design",
          urlToImage: "https://picsum.photos/id/268/800/400",
          publishedAt: "2023-06-06T15:30:00Z",
          content: "Artificial intelligence is making significant inroads into fashion design, with several AI-assisted collections debuting at major fashion weeks to industry acclaim."
        }
      ]
    };

    return NextResponse.json(mockFashionTrends);
  } catch (error) {
    console.error('Error fetching fashion trends:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fashion trends' },
      { status: 500 }
    );
  }
} 