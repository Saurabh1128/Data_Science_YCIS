"use client"

import { useEffect, useState } from "react"

interface VideoProps {
  videoId: string
  title: string
}

export default function VideoSection() {
  const videos: VideoProps[] = [
    {
      videoId: "X3paOmcrTjQ",
      title: "Data Science Program Overview"
    },
    {
      videoId: "uIUvpJdYgSA",
      title: "Student Success Stories"
    },
    {
      videoId: "957fQCm5aDo",
      title: "Career Opportunities"
    }
  ]

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.videoId} className="aspect-video relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}