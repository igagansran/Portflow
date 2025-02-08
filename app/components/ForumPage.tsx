"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Post {
  _id: string
  title: string
  content: string
  author: string
  createdAt: string
  likes: number
  comments: number
}

interface ForumPageProps {
  category: string
}

export default function ForumPage({ category }: ForumPageProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts()
  }, []) // Removed unnecessary dependency: category

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/forums")
      if (!response.ok) throw new Error("Failed to fetch posts")
      const data = await response.json()
      setPosts(data.filter((post: Post) => post.category === category))
    } catch (error) {
      console.error("Error fetching posts:", error)
      toast({
        title: "Error",
        description: "Failed to fetch posts. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/forums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          title: newPostTitle,
          content: newPostContent,
          author: "Anonymous", // Replace with actual user name when authentication is implemented
        }),
      })
      if (!response.ok) throw new Error("Failed to create post")
      setNewPostTitle("")
      setNewPostContent("")
      toast({
        title: "Success",
        description: "Your post has been created successfully.",
      })
      fetchPosts() // Refresh the posts
    } catch (error) {
      console.error("Error creating post:", error)
      toast({
        title: "Error",
        description: "Failed to create post. Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-cherry mb-8">{category} Forum</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Post Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="mb-4"
            />
            <Textarea
              placeholder="Write your post here..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="mb-4"
            />
            <Button type="submit">Submit Post</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post._id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{post.title}</CardTitle>
                  <p className="text-sm text-gray-500">
                    Posted by {post.author} on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                {post.likes || 0}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                {post.comments || 0}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

