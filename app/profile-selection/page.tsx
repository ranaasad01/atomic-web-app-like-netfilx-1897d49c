"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Edit2, Check, X, User } from 'lucide-react';
import { MOCK_PROFILES, APP_NAME, UserProfile } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

const PROFILE_COLORS = [
  "#E50914",
  "#0080FF",
  "#FFD700",
  "#00C853",
  "#FF6D00",
  "#AA00FF",
];

const AVATAR_BACKGROUNDS = [
  "from-red-600 to-red-900",
  "from-blue-600 to-blue-900",
  "from-yellow-500 to-yellow-800",
  "from-green-500 to-green-800",
  "from-orange-500 to-orange-800",
  "from-purple-600 to-purple-900",
];

interface ProfileCardProps {
  profile: UserProfile;
  isManaging: boolean;
  onSelect: (profile: UserProfile) => void;
  onEdit: (profile: UserProfile) => void;
  onDelete: (id: string) => void;
  index: number;
}

function ProfileCard({
  profile,
  isManaging,
  onSelect,
  onEdit,
  onDelete,
  index,
}: ProfileCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const bgClass = AVATAR_BACKGROUNDS[index % AVATAR_BACKGROUNDS.length];

  return (
    <motion.div
      variants={scaleIn}
      className="flex flex-col items-center gap-3 group cursor-pointer"
      onClick={() => !isManaging && onSelect(profile)}
    >
      <div className="relative">
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
          className={`w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-lg overflow-hidden relative border-2 transition-all duration-200 ${
            isManaging
              ? "border-white/40 cursor-default"
              : "border-transparent group-hover:border-white cursor-pointer"
          }`}
          style={{ borderColor: isManaging ? undefined : undefined }}
        >
          <div
            className={`w-full h-full bg-gradient-to-br ${bgClass} flex items-center justify-center`}
          >
            <span className="text-white font-bold text-4xl lg:text-5xl select-none">
              {(profile.name ?? "?").charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Manage overlay */}
          <AnimatePresence>
            {isManaging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
              >
                <Edit2 size={28} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Delete button in manage mode */}
        <AnimatePresence>
          {isManaging && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.15 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(profile.id);
              }}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#E50914] border-2 border-[#141414] flex items-center justify-center z-10"
              aria-label={`Delete ${profile.name} profile`}
            >
              <X size={12} className="text-white" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Edit button in manage mode */}
        <AnimatePresence>
          {isManaging && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.15 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(profile);
              }}
              className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-[#141414] flex items-center justify-center z-10"
              aria-label={`Edit ${profile.name} profile`}
            >
              <Edit2 size={12} className="text-[#141414]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <span
        className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
          isManaging ? "text-white" : "text-[#B3B3B3] group-hover:text-white"
        }`}
      >
        {profile.name ?? "Profile"}
      </span>
    </motion.div>
  );
}

interface EditModalProps {
  profile: UserProfile | null;
  onClose: () => void;
  onSave: (id: string, newName: string, newColor: string) => void;
}

function EditModal({ profile, onClose, onSave }: EditModalProps) {
  const [name, setName] = useState(profile?.name ?? "");
  const [color, setColor] = useState(profile?.color ?? PROFILE_COLORS[0]);
  const shouldReduceMotion = useReducedMotion();

  if (!profile) return null;

  const handleSave = () => {
    const trimmed = name.trim();
    if (trimmed.length === 0) return;
    onSave(profile.id, trimmed, color);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-2xl font-bold mb-6">Edit Profile</h2>

        {/* Avatar preview */}
        <div className="flex justify-center mb-6">
          <div
            className="w-24 h-24 rounded-xl flex items-center justify-center text-white font-bold text-4xl"
            style={{ backgroundColor: color }}
          >
            {(name || profile.name || "?").charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Name input */}
        <div className="mb-5">
          <label className="block text-[#B3B3B3] text-sm font-medium mb-2">
            Profile Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            className="w-full bg-[#2a2a2a] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-white/40 transition-colors duration-200"
            placeholder="Enter profile name"
          />
        </div>

        {/* Color picker */}
        <div className="mb-8">
          <label className="block text-[#B3B3B3] text-sm font-medium mb-3">
            Profile Color
          </label>
          <div className="flex gap-3 flex-wrap">
            {PROFILE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-9 h-9 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
                style={{
                  backgroundColor: c,
                  borderColor: color === c ? "white" : "transparent",
                }}
                aria-label={`Select color ${c}`}
              >
                {color === c && <Check size={14} className="text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-white text-[#141414] font-semibold py-3 rounded-lg hover:bg-white/90 transition-colors duration-200"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/20 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface AddProfileModalProps {
  onClose: () => void;
  onAdd: (name: string, color: string) => void;
}

function AddProfileModal({ onClose, onAdd }: AddProfileModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(PROFILE_COLORS[0]);
  const shouldReduceMotion = useReducedMotion();

  const handleAdd = () => {
    const trimmed = name.trim();
    if (trimmed.length === 0) return;
    onAdd(trimmed, color);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-2xl font-bold mb-6">Add Profile</h2>

        {/* Avatar preview */}
        <div className="flex justify-center mb-6">
          <div
            className="w-24 h-24 rounded-xl flex items-center justify-center text-white font-bold text-4xl"
            style={{ backgroundColor: color }}
          >
            {name.trim().charAt(0).toUpperCase() || <User size={36} />}
          </div>
        </div>

        {/* Name input */}
        <div className="mb-5">
          <label className="block text-[#B3B3B3] text-sm font-medium mb-2">
            Profile Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            className="w-full bg-[#2a2a2a] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-white/40 transition-colors duration-200"
            placeholder="Enter profile name"
          />
        </div>

        {/* Color picker */}
        <div className="mb-8">
          <label className="block text-[#B3B3B3] text-sm font-medium mb-3">
            Profile Color
          </label>
          <div className="flex gap-3 flex-wrap">
            {PROFILE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-9 h-9 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
                style={{
                  backgroundColor: c,
                  borderColor: color === c ? "white" : "transparent",
                }}
                aria-label={`Select color ${c}`}
              >
                {color === c && <Check size={14} className="text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            disabled={name.trim().length === 0}
            className="flex-1 bg-[#E50914] text-white font-semibold py-3 rounded-lg hover:bg-[#c40812] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add Profile
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/20 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProfileSelectionPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>(MOCK_PROFILES);
  const [isManaging, setIsManaging] = useState(false);
  const [editingProfile, setEditingProfile] = useState<UserProfile | null>(null);
  const [addingProfile, setAddingProfile] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleSelectProfile = (profile: UserProfile) => {
    setSelectedProfile(profile);
    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

  const handleEditProfile = (profile: UserProfile) => {
    setEditingProfile(profile);
  };

  const handleSaveEdit = (id: string, newName: string, newColor: string) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, name: newName, color: newColor } : p
      )
    );
    setEditingProfile(null);
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddProfile = (name: string, color: string) => {
    const newProfile: UserProfile = {
      id: String(Date.now()),
      name,
      avatar: "",
      color,
    };
    setProfiles((prev) => [...prev, newProfile]);
    setAddingProfile(false);
  };

  const canAddMore = profiles.length < 6;

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0000] via-[#141414] to-[#0a0a1a] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Selected profile transition overlay */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-[#141414] flex flex-col items-center justify-center gap-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-32 h-32 rounded-2xl flex items-center justify-center text-white font-bold text-6xl"
              style={{ backgroundColor: selectedProfile.color }}
            >
              {(selectedProfile.name ?? "?").charAt(0).toUpperCase()}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-xl font-medium"
            >
              Hello, {selectedProfile.name}
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-48 h-1 bg-[#E50914] rounded-full origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 w-full max-w-3xl flex flex-col items-center"
      >
        {/* Heading */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            {isManaging ? "Manage Profiles" : "Who's watching?"}
          </h1>
          {!isManaging && (
            <p className="text-[#B3B3B3] text-base sm:text-lg">
              Select your profile to continue watching on{" "}
              <span className="text-[#E50914] font-semibold">{APP_NAME}</span>
            </p>
          )}
        </motion.div>

        {/* Profile grid */}
        <motion.div
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 mb-12"
        >
          {(profiles ?? []).map((profile, index) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isManaging={isManaging}
              onSelect={handleSelectProfile}
              onEdit={handleEditProfile}
              onDelete={handleDeleteProfile}
              index={index}
            />
          ))}

          {/* Add profile card */}
          {canAddMore && (
            <motion.div
              variants={scaleIn}
              className="flex flex-col items-center gap-3 group cursor-pointer"
              onClick={() => setAddingProfile(true)}
            >
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-lg border-2 border-dashed border-white/20 group-hover:border-white/60 flex items-center justify-center transition-all duration-200 bg-white/5 group-hover:bg-white/10"
              >
                <Plus size={36} className="text-white/40 group-hover:text-white transition-colors duration-200" />
              </motion.div>
              <span className="text-sm sm:text-base font-medium text-[#B3B3B3] group-hover:text-white transition-colors duration-200">
                Add Profile
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Action buttons */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 items-center">
          {!isManaging ? (
            <>
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                onClick={() => setIsManaging(true)}
                className="px-10 py-3 border border-white/40 text-white font-semibold rounded-lg hover:border-white hover:bg-white/5 transition-all duration-200 text-sm sm:text-base"
              >
                Manage Profiles
              </motion.button>
              <Link href="/">
                <motion.span
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="block px-10 py-3 text-[#B3B3B3] font-medium rounded-lg hover:text-white transition-colors duration-200 text-sm sm:text-base cursor-pointer"
                >
                  Back to Home
                </motion.span>
              </Link>
            </>
          ) : (
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              onClick={() => setIsManaging(false)}
              className="px-10 py-3 bg-white text-[#141414] font-semibold rounded-lg hover:bg-white/90 transition-all duration-200 text-sm sm:text-base"
            >
              Done
            </motion.button>
          )}
        </motion.div>

        {/* Profile count indicator */}
        <motion.p
          variants={fadeInUp}
          className="mt-8 text-[#666] text-xs"
        >
          {profiles.length} of 6 profiles used
        </motion.p>
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingProfile && (
          <EditModal
            profile={editingProfile}
            onClose={() => setEditingProfile(null)}
            onSave={handleSaveEdit}
          />
        )}
      </AnimatePresence>

      {/* Add Profile Modal */}
      <AnimatePresence>
        {addingProfile && (
          <AddProfileModal
            onClose={() => setAddingProfile(false)}
            onAdd={handleAddProfile}
          />
        )}
      </AnimatePresence>
    </div>
  );
}