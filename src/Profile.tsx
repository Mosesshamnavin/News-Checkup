import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Mail, Phone, User2 } from "lucide-react";
import { Label } from "./components/ui/label";
import Authorization from "./helpers/Authorization";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedUser: any = Authorization.getLoggedUser();
    console.log(loggedUser);
    setUser(loggedUser);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-[380px] shadow-xl rounded-2xl border border-gray-200 bg-white p-6">
        {/* Profile Avatar & Name */}
        <CardHeader className="flex flex-col items-center gap-3">
          <Avatar className="w-24 h-24 border-4 border-gray-900 shadow-md rounded-full">
            <AvatarImage src={user?.avatar || "/default-avatar.jpg"} />
            <AvatarFallback>
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-semibold text-gray-900">
            {user?.name || "Guest"}
          </CardTitle>
        </CardHeader>

        {/* Profile Details */}
        <CardContent className="px-6 pb-6 space-y-4">
          <div className="flex items-center gap-2">
            <User2 className="w-5 h-5 text-gray-600" />
            <div>
              <Label className="text-sm font-semibold text-gray-500">Full Name</Label>
              <p className="text-lg font-medium text-gray-800">{user?.name || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-600" />
            <div>
              <Label className="text-sm font-semibold text-gray-500">Email</Label>
              <p className="text-lg font-medium text-gray-800">{user?.email || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-600" />
            <div>
              <Label className="text-sm font-semibold text-gray-500">Phone</Label>
              <p className="text-lg font-medium text-gray-800">{user?.phone || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
