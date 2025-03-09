import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Mail, Phone } from 'lucide-react'; 
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './components/ui/card';

const Profile = () => {
  const [user] = useState({
    name: "Sham Navin",
    email: "shamnavin13@gmail.com",
    phone: "+91 9943831469", 
    avatar: "me.jpg",
  });

  return (
<div className="flex items-center justify-center min-h-screen w-full bg-gray-900">
  <Card className="w-[400px] p-6 shadow-lg rounded-lg bg-gray-700 border border-gray-700">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24 border-4 border-black-900 shadow-md rounded-full">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-blue-500 text-white text-xl font-bold">
              SN
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-2xl font-bold text-white">{user.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Mail className="text-gray-300 w-5 h-5" /> 
              <p className="text-gray-400 font-semibold text-lg">Email</p>
            </div>
            <p className="text-white text-lg">{user.email}</p>

            <div className="flex items-center justify-center space-x-2 mt-2">
              <Phone className="text-gray-300 w-5 h-5" /> 
              <p className="text-gray-400 font-semibold text-lg">Phone</p>
            </div>
            <p className="text-white text-lg">{user.phone}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
