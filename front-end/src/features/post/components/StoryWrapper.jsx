import { cloneElement, useEffect, useRef, useState } from "react";
import StoryApi from "../services/StoryApi";

export default function ({ children }) {
  const [stories, setStories] = useState([]);
  const hasMoreRef = useRef(true)

  const loadMore = async () => {
    await StoryApi.get({}).then(e => setStories(prev => [...prev, ...e]))
    hasMoreRef.current = false
  }
  
  useEffect(() => {
    StoryApi.get({}).then(setStories)
    hasMoreRef.current = true
  }, [])

  return <div>
    {cloneElement(children, { stories, loadMore, hasMore: hasMoreRef.current })}
  </div>
}