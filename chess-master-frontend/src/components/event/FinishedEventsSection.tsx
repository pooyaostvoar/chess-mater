import React, { useEffect, useState } from "react";
import { FinishedEventCard } from "./FinishedEventCard";
import { getFinishedEvents } from "../../services/api/schedule.api";

export const FinishedEventsSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [finishedEvents, setFinishedEvent] = useState([]);
  async function loadEvents() {
    const res = await getFinishedEvents();
    setFinishedEvent(
      res.events.map((event: any) => ({
        id: event.id,
        title: event.title,
        youtubeId: event.youtubeId,
        master: {
          id: event.master.id,
          username: event.master.username,
          profilePicture: event.master.profilePicture,
        },
      }))
    );
  }
  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {finishedEvents.map((event: any) => (
          <FinishedEventCard
            key={event.id}
            event={event}
            onPlay={(youtubeId) => setActiveVideo(youtubeId)}
          />
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-background rounded-xl p-4 w-full max-w-3xl relative">
            <button
              className="absolute top-3 right-4 text-lg font-bold"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>

            <div className="aspect-video w-full overflow-hidden rounded-lg mt-2">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo}`}
                title="Finished Event"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
