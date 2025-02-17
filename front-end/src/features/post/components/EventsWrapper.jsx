import { cloneElement, useEffect, useRef, useState } from "react";
import EventApi from "../services/EventApi";

export default function EventsWrapper({ children, page = 0, limit = 5, query = {} }) {
  const [events, setEvents] = useState([]);
  const hasMoreRef = useRef(true)
  const pageRef = useRef(page)

  const loadMore = async () => {
    if (hasMoreRef.current) {
      await EventApi.get({ q: query }).then(e => {
        hasMoreRef.current = e.hasMore
        pageRef.current++
        setEvents(prev => [...prev, ...e.events])
      })
    }
  }

  useEffect(() => {
    EventApi.get({ q: query, page: page, limit: limit }).then(e => {
      hasMoreRef.current = e.hasMore
      pageRef.current = page + 1
      setEvents(e.events)
    })
  }, [])

  return <div>
    {cloneElement(children, { events, loadMore, hasMore: hasMoreRef.current })}
  </div>
}