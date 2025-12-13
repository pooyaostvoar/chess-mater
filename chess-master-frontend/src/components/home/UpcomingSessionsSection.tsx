import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Clock } from "lucide-react";
import moment from "moment";
import type { Booking } from "../../services/bookings";
import type { User } from "../../services/auth";

interface UpcomingSessionsSectionProps {
  bookings: Booking[];
  loading: boolean;
  currentUser: User;
}

export const UpcomingSessionsSection: React.FC<
  UpcomingSessionsSectionProps
> = ({ bookings, loading, currentUser }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            No upcoming sessions scheduled
          </p>
          <Button onClick={() => navigate("/masters")}>Browse Masters</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {bookings.map((booking) => {
        const displayUser = currentUser.isMaster
          ? booking.reservedBy
          : booking.master;
        const displayName = currentUser.isMaster
          ? booking.reservedBy?.username || "Unknown Player"
          : booking.master?.username || "Unknown Master";

        return (
          <Card
            key={booking.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/bookings")}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">
                  {moment(booking.startTime).format("MMM D, YYYY")}
                </CardTitle>
              </div>
              <CardDescription>
                {moment(booking.startTime).format("h:mm A")} -{" "}
                {moment(booking.endTime).format("h:mm A")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {displayUser?.profilePicture ? (
                  <img
                    src={displayUser.profilePicture}
                    alt={displayName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                    {displayName?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <span className="font-medium">{displayName}</span>
                {!currentUser.isMaster && booking.master?.title && (
                  <Badge variant="default" className="ml-auto">
                    {booking.master.title}
                  </Badge>
                )}
              </div>
              <div className="mt-3">
                <Badge
                  variant={
                    booking.status === "booked"
                      ? "success"
                      : booking.status === "reserved"
                      ? "warning"
                      : "default"
                  }
                >
                  {booking.status === "booked"
                    ? "Confirmed"
                    : booking.status === "reserved"
                    ? "Pending"
                    : booking.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
