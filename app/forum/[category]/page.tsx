import ForumPage from "@/app/components/ForumPage"

// This is mock data. In a real application, you'd fetch this from your backend.
const mockPosts = [
  {
    id: 1,
    title: "Best camera settings for night photography",
    content: "I've been struggling with night photography. What settings do you recommend for capturing the Milky Way?",
    author: "StarGazer",
    avatar: "/avatars/user1.jpg",
    date: "2023-06-01",
    likes: 24,
    comments: 7,
  },
  {
    id: 2,
    title: "How to improve composition in landscape photos",
    content: "I'm looking for tips to make my landscape photos more compelling. Any advice on composition techniques?",
    author: "NatureLover",
    avatar: "/avatars/user2.jpg",
    date: "2023-05-28",
    likes: 31,
    comments: 12,
  },
  // Add more mock posts as needed
]

const categoryTitles = {
  "photography-tips": "Photography Tips",
  "portfolio-feedback": "Portfolio Feedback",
  "technical-support": "Technical Support",
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryTitle = categoryTitles[params.category as keyof typeof categoryTitles] || "Forum"

  return <ForumPage category={categoryTitle} posts={mockPosts} />
}

