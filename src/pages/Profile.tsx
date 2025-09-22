import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";

import TopHeader from "@/components/ui/TopHeader";
import Navbar from "@/components/ui/Navbar";
import ProfileVerificationBadge from "@/components/ui/ProfileVerificationBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"; // ✅ Add input component for editing
import {
  Edit,
  Save,
  LogOut,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Camera,
} from "lucide-react";

const Profile = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const [editMode, setEditMode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    "verified" | "pending" | "unverified"
  >("unverified");
  const [showAnalysis, setShowAnalysis] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "SREEJITH S",
    email: "sreejithsssss04@gmail.com",
    phone: "+91 9739068271",
    role: "ML Engineer",
    location: "Bangalore",
    department: "CSE (Data Science)",
    joinDate: "29th Aug 2025",
    address: "NHCE, Bangalore",
  });

  const [tempData, setTempData] = useState(profileData);

  // Load profile data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setProfileData(JSON.parse(savedData));
      setTempData(JSON.parse(savedData));
    }
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) setAvatarUrl(savedAvatar);
    const savedStatus = localStorage.getItem("userVerificationStatus");
    if (savedStatus)
      setVerificationStatus(
        savedStatus as "verified" | "pending" | "unverified"
      );
    const analysisExists = localStorage.getItem("analysisData") === "true";
    setShowAnalysis(analysisExists);
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    toast({ title: t("signed-out"), description: t("signed-out-success") });
    navigate("/auth");
  };

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAvatarUrl(base64);
      localStorage.setItem("userAvatar", base64);
      toast({
        title: "Avatar Updated",
        description: "Profile picture updated successfully.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    setProfileData(tempData);
    localStorage.setItem("profileData", JSON.stringify(tempData));
    setEditMode(false);
    toast({
      title: "Profile Updated",
      description: "Your profile details have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <TopHeader />
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-wide">
              Profile
            </h1>
            <div className="flex gap-3">
              {editMode ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSaveChanges}
                  className="flex items-center gap-2"
                >
                  <Save size={16} /> Save Changes
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2"
                >
                  <Edit size={16} /> Edit Profile
                </Button>
              )}
              <Button
                variant="destructive"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut size={16} /> SIGN OUT
              </Button>
            </div>
          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-gradient-to-r from-white/40 to-white/60 dark:from-gray-800/40 dark:to-gray-700/50 
                       backdrop-blur-xl rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 items-center
                       hover:shadow-3xl transition-all"
          >
            {/* Avatar */}
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-full border-4 border-blue-400 shadow-lg overflow-hidden"
              >
                <Avatar className="w-36 h-36">
                  {avatarUrl ? (
                    <AvatarImage
                      src={avatarUrl}
                      alt={profileData.name}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-6xl font-bold">
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </motion.div>

              {/* Upload Button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white 
                           opacity-0 group-hover:opacity-100 transition-all shadow-md"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
              >
                <Camera size={20} />
              </Button>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadAvatar}
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {editMode ? (
                  <Input
                    value={tempData.name}
                    onChange={(e) =>
                      setTempData({ ...tempData, name: e.target.value })
                    }
                  />
                ) : (
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-wide">
                    {profileData.name}
                  </h2>
                )}
                <motion.div
                  animate={
                    verificationStatus === "verified"
                      ? {
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.8, 1],
                        }
                      : {}
                  }
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ProfileVerificationBadge status={verificationStatus} />
                </motion.div>
              </div>

              {/* Role & Department */}
              <div className="flex gap-3 flex-wrap">
                {editMode ? (
                  <>
                    <Input
                      value={tempData.role}
                      onChange={(e) =>
                        setTempData({ ...tempData, role: e.target.value })
                      }
                    />
                    <Input
                      value={tempData.department}
                      onChange={(e) =>
                        setTempData({ ...tempData, department: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>
                    <Badge className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md">
                      {profileData.role}
                    </Badge>
                    <Badge className="px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md">
                      {profileData.department}
                    </Badge>
                  </>
                )}
              </div>

              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <MapPin size={18} className="text-blue-500" />{" "}
                {editMode ? (
                  <Input
                    value={tempData.location}
                    onChange={(e) =>
                      setTempData({ ...tempData, location: e.target.value })
                    }
                  />
                ) : (
                  profileData.location || "Not Provided"
                )}
              </p>
            </div>
          </motion.div>

          {/* Contact Info & Joined Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              {
                label: "Email",
                value: editMode ? tempData.email : profileData.email,
                key: "email",
                icon: <Mail size={20} className="text-purple-500" />,
              },
              {
                label: "Phone",
                value: editMode ? tempData.phone : profileData.phone,
                key: "phone",
                icon: <Phone size={20} className="text-purple-500" />,
              },
              {
                label: "Joined",
                value: profileData.joinDate,
                key: "joinDate",
                icon: <Calendar size={20} className="text-purple-500" />,
              },
            ].map((info, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-2xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-md 
                           shadow-lg flex flex-col gap-2 transition-all"
              >
                <div className="flex items-center gap-2">
                  {info.icon}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {info.label}
                  </span>
                </div>
                {editMode && info.key !== "joinDate" ? (
                  <Input
                    value={info.value}
                    onChange={(e) =>
                      setTempData({ ...tempData, [info.key]: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {info.value || "Not Provided"}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Analysis Badge */}
          <div className="flex justify-end mt-8">
            <Badge
              className={`px-4 py-2 rounded-full text-sm font-semibold
                ${
                  showAnalysis
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
            >
            </Badge>
          </div>
        </motion.div>
      </div>
      <Navbar />
    </div>
  );
};

export default Profile;   