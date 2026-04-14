import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";
import { toast } from 'react-toastify';

interface ProfileUser {
  user_id: number;
  username: string;
  email: string;
  phone: string;
  bio: string;
  profile_image_url?: string | null;
  role_name?: "admin" | "volunteer" | "user";
  created_at: string;
  volunteer?: {
    approval_status_id?: number;
    status?: string;
    volunteer_since?: string;
    has_car?: boolean;
    can_foster?: boolean;
    animal_handling?: string;
    city?: string;
    total_tasks?: number;
    badges?: string[];
    availability_status_id?: number;
    availability_status?: string;
  };
}

interface Badge {
  badge_id: number;
  badge_name: string;
  description: string;
  status: "unlocked" | "locked";
  awarded_at?: string;
  task_id?: number;
}

interface RescueReport {
  report_id: number;
  animal_type: string;
  animal_condition: string;
  description: string;
  location_address: string;
  status_id: number;
  status_name: string;
  submitted_at: string;
  reporter_name: string;
  user_id: number;
}

interface AdminStats {
  total_reports: number;
  reports_this_month: number;
  total_volunteers: number;
  resolved_reports: number;
  by_status?: Array<{ status_id: number; status_name: string; count: number }>;
  by_type?: Array<{ type_name: string; count: number }>;
}

interface AvailabilityStatus {
  status_id: number;
  status_name: string;
}

// Confirm Modal 
interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
}) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
    onClick={onCancel}
  >
    <div
      style={{
        background: "var(--color-background-primary, #fff)",
        borderRadius: "12px",
        border: "0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.15))",
        padding: "1.5rem 1.75rem",
        maxWidth: 400,
        width: "90%",
        boxSizing: "border-box",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "var(--color-background-danger, #fef2f2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-text-danger, #dc2626)"
            strokeWidth="2"
          >
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </div>
        <div>
          <p
            style={{
              fontWeight: 500,
              fontSize: 15,
              margin: 0,
              color: "var(--color-text-primary, #111)",
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--color-text-secondary, #6b7280)",
              margin: "4px 0 0",
            }}
          >
            {message}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: "1.25rem" }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: "8px 16px",
            borderRadius: "8px",
            border: "0.5px solid var(--color-border-secondary, rgba(0,0,0,0.3))",
            background: "transparent",
            color: "var(--color-text-primary, #111)",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          style={{
            flex: 1,
            padding: "8px 16px",
            borderRadius: "8px",
            border: "0.5px solid var(--color-border-danger, #fca5a5)",
            background: "var(--color-background-danger, #fef2f2)",
            color: "var(--color-text-danger, #dc2626)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);


export const Profile: React.FC = () => {
  const { userId: paramUserId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgKey, setImgKey] = useState(Date.now());

  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [recentReports, setRecentReports] = useState<RescueReport[]>([]);
  const [adminStats, setAdminStats] = useState<AdminStats>({
    total_reports: 0,
    reports_this_month: 0,
    total_volunteers: 0,
    resolved_reports: 0,
    by_status: [],
    by_type: [],
  });
  const [availabilityStatuses, setAvailabilityStatuses] = useState<AvailabilityStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // ── new: controls the in-app remove-image confirmation modal ──
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [equipmentData, setEquipmentData] = useState({
    has_car: false,
    can_foster: false,
    animal_handling: "dogs",
    city: "",
    availability_status_id: 1,
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const userId = paramUserId || currentUser?.user_id?.toString();

  const getImageUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    if (url.startsWith("http")) return `${url}?key=${imgKey}`;
    if (url.startsWith("/uploads/")) {
      return `${process.env.REACT_APP_API_URL}${url}?key=${imgKey}`;
    }
    return url;
  };

  const fetchAvailabilityStatuses = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/availability-statuses`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setAvailabilityStatuses(data.data || []);
      } else {
        setAvailabilityStatuses([
          { status_id: 1, status_name: "available" },
          { status_id: 2, status_name: "unavailable" },
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch availability statuses:", err);
      setAvailabilityStatuses([
        { status_id: 1, status_name: "available" },
        { status_id: 2, status_name: "unavailable" },
      ]);
    }
  }, []);

  const fetchVolunteerBadges = useCallback(async () => {
    if (!userId) return;
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/volunteers/${userId}/badges`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setBadges(data.badges || []);
      }
    } catch (err) {
      console.error("Failed to fetch badges:", err);
    }
  }, [userId]);

  const fetchVolunteerTasks = useCallback(async (uid: number) => {
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/volunteer/${uid}`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setProfileUser((prev) => {
          if (!prev || !prev.volunteer) return prev;
          return {
            ...prev,
            volunteer: { ...prev.volunteer, total_tasks: data.tasks?.length || 0 },
          };
        });
      }
    } catch (err) {
      console.error("Failed to fetch volunteer tasks:", err);
    }
  }, []);

  const fetchUserReports = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/my-reports`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setRecentReports(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch user reports:", err);
    }
  }, []);

  const fetchAllReports = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/admin/all`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setRecentReports(data.data?.slice(0, 4) || []);
        setAdminStats((prev) => ({
          ...prev,
          total_reports: data.count || 0,
          resolved_reports:
            data.data?.filter(
              (r: any) =>
                r.status_name?.toLowerCase().includes("resolved") ||
                r.status_name?.toLowerCase().includes("completed") ||
                r.status_id === 4
            ).length || 0,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
  }, []);

  const fetchAdminStats = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/admin/statistics`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setAdminStats((prev) => ({
          total_reports: data.data?.total ?? prev.total_reports,
          reports_this_month: data.data?.recent_week ?? prev.reports_this_month,
          total_volunteers: prev.total_volunteers,
          resolved_reports: prev.resolved_reports,
          by_status: data.data?.by_status ?? prev.by_status,
          by_type: data.data?.by_type ?? prev.by_type,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    }
  }, []);

  const fetchAdminVolunteerCount = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        const volunteerCount = data.filter((u: any) => u.role_name === "volunteer").length;
        setAdminStats((prev) => ({ ...prev, total_volunteers: volunteerCount }));
      }
    } catch (err) {
      console.error("Failed to fetch volunteer count:", err);
      setAdminStats((prev) => ({ ...prev, total_volunteers: 0 }));
    }
  }, []);

  const fetchAdminReportsCount = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reports/admin/all`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setAdminStats((prev) => ({ ...prev, total_reports: data.count || 0 }));
      }
    } catch (err) {
      console.error("Failed to fetch reports count:", err);
    }
  }, []);

  const fetchUserData = useCallback(
    async (force = false) => {
      if (!userId) return;
      setLoading(true);
      setError(null);
      try {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const url = `${process.env.REACT_APP_API_URL}/api/users/${userId}${force ? `?t=${Date.now()}` : ""}`;
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Failed to fetch user (${res.status})`);

        const data = await res.json();
        setProfileUser(data);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
        });

        if (data.role_name === "volunteer" && data.volunteer) {
          setEquipmentData({
            has_car: data.volunteer.has_car || false,
            can_foster: data.volunteer.can_foster || false,
            animal_handling: data.volunteer.animal_handling || "dogs",
            city: data.volunteer.city || "",
            availability_status_id: data.volunteer.availability_status_id || 1,
          });
        }

        if (data.role_name === "volunteer") {
          fetchVolunteerBadges();
          fetchVolunteerTasks(data.user_id);
          fetchAvailabilityStatuses();
        } else if (data.role_name === "admin") {
          fetchAdminStats();
          fetchAllReports();
          fetchAdminVolunteerCount();
          fetchAdminReportsCount();
        } else if (data.role_name === "user" && currentUser?.user_id === data.user_id) {
          fetchUserReports();
        }
      } catch (err: any) {
        console.error("Fetch user error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [
      userId,
      currentUser,
      fetchVolunteerBadges,
      fetchVolunteerTasks,
      fetchUserReports,
      fetchAllReports,
      fetchAdminStats,
      fetchAdminVolunteerCount,
      fetchAdminReportsCount,
      fetchAvailabilityStatuses,
    ]
  );

  useEffect(() => {
    if (!userId) return;
    fetchUserData();
  }, [userId, fetchUserData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profileUser) return;

    try {
      setUploadingImage(true);
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      const uploadFormData = new FormData();
      uploadFormData.append("profile_image", file);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/${profileUser.user_id}/profile-image`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: uploadFormData,
        }
      );

      if (!res.ok) throw new Error("Failed to upload image");

      const result = await res.json();
      setImgKey(Date.now());

      if (result.profile_image_url) {
        setProfileUser((prev) =>
          prev ? { ...prev, profile_image_url: result.profile_image_url } : null
        );
        setTimeout(() => fetchUserData(true), 500);
      }
    } catch (err: any) {
      console.error("Image upload error:", err);
      toast.error("Failed to upload image: " + err.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ── opens the custom modal instead of window.confirm ──
  const handleRemoveImage = () => {
    if (!profileUser) return;
    setShowRemoveConfirm(true);
  };

  // ── called when the user clicks "Remove" inside the modal ──
  const confirmRemoveImage = async () => {
    setShowRemoveConfirm(false);
    if (!profileUser) return;

    try {
      setUploadingImage(true);
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/${profileUser.user_id}/profile-image`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Failed to remove image");

      setImgKey(Date.now());
      setProfileUser((prev) => (prev ? { ...prev, profile_image_url: null } : null));
      setTimeout(() => fetchUserData(true), 500);
    } catch (err: any) {
      console.error("Image removal error:", err);
      toast.error("Failed to remove image: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEquipmentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setEquipmentData({ ...equipmentData, [name]: checked });
    } else {
      setEquipmentData({ ...equipmentData, [name]: value });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validatePassword = () => {
    const errors = { current_password: "", new_password: "", confirm_password: "" };
    let valid = true;

    if (!passwordData.current_password) {
      errors.current_password = "Current password is required";
      valid = false;
    }

    if (!passwordData.new_password) {
      errors.new_password = "New password is required";
      valid = false;
    } else {
      if (passwordData.new_password.length < 8) {
        errors.new_password = "Password must be at least 8 characters";
        valid = false;
      }
      if (!/(?=.*[a-z])/.test(passwordData.new_password)) {
        errors.new_password = "Password must contain at least one lowercase letter";
        valid = false;
      }
      if (!/(?=.*[A-Z])/.test(passwordData.new_password)) {
        errors.new_password = "Password must contain at least one uppercase letter";
        valid = false;
      }
      if (!/(?=.*\d)/.test(passwordData.new_password)) {
        errors.new_password = "Password must contain at least one number";
        valid = false;
      }
      if (!/(?=.*[@$!%*?&])/.test(passwordData.new_password)) {
        errors.new_password =
          "Password must contain at least one special character (@$!%*?&)";
        valid = false;
      }
    }

    if (!passwordData.confirm_password) {
      errors.confirm_password = "Please confirm your new password";
      valid = false;
    } else if (passwordData.new_password !== passwordData.confirm_password) {
      errors.confirm_password = "Passwords do not match";
      valid = false;
    }

    setPasswordErrors(errors);
    return valid;
  };

  const handleSavePassword = async () => {
    if (!profileUser) return;
    if (!validatePassword()) return;

    try {
      setSaving(true);
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/change-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          current_password: passwordData.current_password,
          new_password: passwordData.new_password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setPasswordErrors((prev) => ({
            ...prev,
            current_password: "Current password is incorrect",
          }));
        } else {
          toast.error(result.message || "Failed to change password");
        }
        return;
      }

      toast.success("Password changed successfully!");
      setChangingPassword(false);
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
      setPasswordErrors({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err: any) {
      console.error("Change password error:", err);
      toast.error("Failed to change password: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelPassword = () => {
    setChangingPassword(false);
    setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
    setPasswordErrors({ current_password: "", new_password: "", confirm_password: "" });
    setShowPasswords({ current: false, new: false, confirm: false });
  };

  const handleSaveProfile = async () => {
    if (!profileUser) return;
    if (!formData.username.trim() || !formData.email.trim()) {
      toast.error("Username and email are required");
      return;
    }

    try {
      setSaving(true);
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${profileUser.user_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          bio: formData.bio,
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      await fetchUserData(true);
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error("Update error:", err);
      toast.error("Failed to update profile: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEquipment = async () => {
    if (!profileUser) return;

    try {
      setSaving(true);
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) throw new Error("No authentication token");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/${profileUser.user_id}/volunteer-profile`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            has_car: equipmentData.has_car,
            can_foster: equipmentData.can_foster,
            animal_handling: equipmentData.animal_handling,
            city: equipmentData.city,
            availability_status_id: equipmentData.availability_status_id,
          }),
        }
      );

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message || "Failed to update volunteer equipment & skills");
      }

      await fetchUserData(true);
      setEditingEquipment(false);
      toast.success("Equipment & Skills updated successfully!");
    } catch (err: any) {
      console.error("Update equipment error:", err);
      toast.error("Failed to update equipment: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profileUser) {
      setFormData({
        username: profileUser.username,
        email: profileUser.email,
        phone: profileUser.phone,
        bio: profileUser.bio || "",
      });
    }
    setEditing(false);
  };

  const handleCancelEquipment = () => {
    if (profileUser?.volunteer) {
      setEquipmentData({
        has_car: profileUser.volunteer.has_car || false,
        can_foster: profileUser.volunteer.can_foster || false,
        animal_handling: profileUser.volunteer.animal_handling || "dogs",
        city: profileUser.volunteer.city || "",
        availability_status_id: profileUser.volunteer.availability_status_id || 1,
      });
    }
    setEditingEquipment(false);
  };

  const getStatusText = (statusId?: number) => {
    switch (statusId) {
      case 1: return "Pending";
      case 2: return "Approved";
      case 3: return "Rejected";
      default: return "Unknown";
    }
  };

  const getAnimalHandlingText = (value?: string) => {
    const map: Record<string, string> = {
      all: "All animals",
      dogs: "Dogs",
      cats: "Cats",
      horses: "Horses",
      both: "Dogs & cats",
      small: "Small animals",
      birds: "Birds",
    };
    return map[value || ""] || value || "Not specified";
  };

  const getAvailabilityStatusText = (statusId?: number) => {
    const status = availabilityStatuses.find((s) => s.status_id === statusId);
    return (
      status?.status_name ||
      (statusId === 1 ? "available" : statusId === 2 ? "unavailable" : "available")
    );
  };

  const getAvailabilityStatusClass = (statusId?: number) => {
    const status = getAvailabilityStatusText(statusId).toLowerCase();
    if (status.includes("available")) return "available";
    if (status.includes("unavailable")) return "unavailable";
    return "available";
  };

  const getReportIcon = (animalType: string) => {
    const type = animalType?.toLowerCase() || "";
    if (type.includes("dog")) return "🐕";
    if (type.includes("cat")) return "🐈";
    if (type.includes("bird")) return "🕊️";
    if (type.includes("fox")) return "🦊";
    if (type.includes("deer")) return "🦌";
    if (type.includes("rabbit")) return "🐇";
    if (type.includes("squirrel")) return "🐿️";
    if (type.includes("raccoon")) return "🦝";
    if (type.includes("owl")) return "🦉";
    if (type.includes("eagle")) return "🦅";
    if (type.includes("turtle")) return "🐢";
    return "🐾";
  };

  const getPriorityFromStatus = (statusName: string) => {
    const name = statusName?.toLowerCase() || "";
    if (name.includes("critical")) return "critical";
    if (name.includes("urgent") || name.includes("high")) return "high";
    if (name.includes("medium")) return "medium";
    return "low";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "#dc4a4a";
      case "high": return "#b85a1a";
      case "medium": return "#f4b942";
      case "low": return "#2c5e4a";
      default: return "#5f7970";
    }
  };

  const getStatusBadge = (statusName: string) => {
    const name = statusName?.toLowerCase() || "";
    if (name.includes("resolved") || name.includes("completed"))
      return { text: "Resolved", class: "status-resolved" };
    if (name.includes("progress") || name.includes("assigned"))
      return { text: "In Progress", class: "status-progress" };
    if (name.includes("pending") || name.includes("submitted"))
      return { text: "Pending", class: "status-pending" };
    return { text: statusName || "Unknown", class: "" };
  };

  const unlockedBadges = badges.filter((b) => b.status === "unlocked");
  const lockedBadges = badges.filter((b) => b.status === "locked");

  const joinDate = profileUser?.created_at
    ? new Date(profileUser.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";

  const volunteerSince = profileUser?.volunteer?.volunteer_since
    ? new Date(profileUser.volunteer.volunteer_since).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const canEdit =
    currentUser &&
    (currentUser.user_id === profileUser?.user_id || currentUser.role_name === "admin");

  const isOwnProfile = currentUser?.user_id === profileUser?.user_id;
  const isVolunteer = profileUser?.role_name === "volunteer";
  const isAdmin = profileUser?.role_name === "admin";
  const imageUrl = getImageUrl(profileUser?.profile_image_url);
  const statusText = getStatusText(profileUser?.volunteer?.approval_status_id);

  const EyeIcon = ({ open }: { open: boolean }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {open ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="profile-error">
        <div className="error-icon">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h3>Profile Not Found</h3>
        <p>{error || "The requested profile could not be loaded."}</p>
        <button onClick={() => navigate("/dashboard")} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="profile">
      {/* ── in-app remove image confirmation modal ── */}
      {showRemoveConfirm && (
        <ConfirmModal
          title="Remove profile image?"
          message="Your profile will show your initials instead."
          confirmLabel="Remove"
          onConfirm={confirmRemoveImage}
          onCancel={() => setShowRemoveConfirm(false)}
        />
      )}

      <div className="profile-header">
        <div>
          <h1>Profile</h1>
          <p>@{profileUser.username}</p>
        </div>
        <div className="profile-header-actions">
          {isOwnProfile && !editing && !editingEquipment && !changingPassword && (
            <button className="btn-password" onClick={() => setChangingPassword(true)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Change Password
            </button>
          )}
          {canEdit && !editing && !editingEquipment && !changingPassword && (
            <button className="btn-edit" onClick={() => setEditing(true)}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 20h9M16.5 3.5L20 7l-9 9H7v-4l9-9z" />
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-grid">
        {/* LEFT COLUMN - PROFILE CARD */}
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-wrapper">
              <div className={`profile-avatar ${uploadingImage ? "uploading" : ""}`}>
                {uploadingImage ? (
                  <div className="avatar-uploading">
                    <div className="spinner"></div>
                  </div>
                ) : imageUrl ? (
                  <img key={`avatar-${imgKey}`} src={imageUrl} alt={profileUser.username} />
                ) : (
                  <div className="avatar-fallback">
                    {profileUser.username?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>

              {canEdit && !editing && !editingEquipment && !changingPassword && (
                <div className="avatar-edit-buttons">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    id="avatar-upload"
                    hidden
                  />
                  <button
                    className="avatar-btn change"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    Change
                  </button>
                  {imageUrl && (
                    <button
                      className="avatar-btn remove"
                      onClick={handleRemoveImage}
                      disabled={uploadingImage}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="profile-info">
            {editing ? (
              <div className="edit-field">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>
            ) : (
              <h2>{profileUser.username}</h2>
            )}

            <div className={`profile-role ${profileUser.role_name || "user"}`}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {profileUser.role_name === "admin" ? (
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                ) : profileUser.role_name === "volunteer" ? (
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                ) : (
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                )}
              </svg>
              <span>{profileUser.role_name?.toUpperCase() || "MEMBER"}</span>
              {isVolunteer && statusText && (
                <span className={`role-status status-${statusText.toLowerCase()}`}>
                  · {statusText}
                </span>
              )}
            </div>

            {editing ? (
              <div className="edit-field">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  maxLength={120}
                />
                <div className="field-hint">{formData.bio.length}/120</div>
              </div>
            ) : (
              profileUser.bio && (
                <div className="profile-bio">
                  <span className="bio-quote">"</span>
                  {profileUser.bio}
                  <span className="bio-quote">"</span>
                </div>
              )
            )}

            <div className="profile-meta">
              <div className="meta-group">
                <div className="meta-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                    />
                  ) : (
                    <span>{profileUser.email}</span>
                  )}
                </div>

                <div className="meta-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12" y2="18" />
                  </svg>
                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                    />
                  ) : (
                    <span>{profileUser.phone || "Not provided"}</span>
                  )}
                </div>

                <div className="meta-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Joined {joinDate}</span>
                </div>

                {volunteerSince && (
                  <div className="meta-item">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Ranger since {volunteerSince}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="profile-id">
              <span className="id-label">RANGER ID</span>
              <span className="id-value">
                SRMS-{profileUser.user_id.toString().padStart(6, "0")}
              </span>
            </div>

            {canEdit && editing && (
              <div className="profile-actions">
                <button className="btn-secondary" onClick={handleCancel} disabled={saving}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleSaveProfile} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN - ROLE SPECIFIC CONTENT */}
        <div className="profile-sidebar">
          {/* CHANGE PASSWORD CARD */}
          {isOwnProfile && changingPassword && (
            <div className="password-card">
              <div className="password-header">
                <h3>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Change Password
                </h3>
              </div>

              <div className="password-form">
                <div className="password-field">
                  <label htmlFor="current_password">Current Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      id="current_password"
                      name="current_password"
                      value={passwordData.current_password}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      className={passwordErrors.current_password ? "input-error" : ""}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPasswords((p) => ({ ...p, current: !p.current }))
                      }
                      tabIndex={-1}
                    >
                      <EyeIcon open={showPasswords.current} />
                    </button>
                  </div>
                  {passwordErrors.current_password && (
                    <span className="field-error">{passwordErrors.current_password}</span>
                  )}
                </div>

                <div className="password-field">
                  <label htmlFor="new_password">New Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      id="new_password"
                      name="new_password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      placeholder="Min. 8 characters with uppercase, lowercase, number, special char"
                      className={passwordErrors.new_password ? "input-error" : ""}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPasswords((p) => ({ ...p, new: !p.new }))}
                      tabIndex={-1}
                    >
                      <EyeIcon open={showPasswords.new} />
                    </button>
                  </div>
                  {passwordErrors.new_password && (
                    <span className="field-error">{passwordErrors.new_password}</span>
                  )}
                  {passwordData.new_password && !passwordErrors.new_password && (
                    <div className="password-strength">
                      <div
                        className={`strength-bar ${
                          passwordData.new_password.length >= 12
                            ? "strong"
                            : passwordData.new_password.length >= 8
                            ? "medium"
                            : "weak"
                        }`}
                      ></div>
                      <span>
                        {passwordData.new_password.length >= 12
                          ? "Strong"
                          : passwordData.new_password.length >= 8
                          ? "Medium"
                          : "Weak"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="password-field">
                  <label htmlFor="confirm_password">Confirm New Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      id="confirm_password"
                      name="confirm_password"
                      value={passwordData.confirm_password}
                      onChange={handlePasswordChange}
                      placeholder="Re-enter new password"
                      className={passwordErrors.confirm_password ? "input-error" : ""}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))
                      }
                      tabIndex={-1}
                    >
                      <EyeIcon open={showPasswords.confirm} />
                    </button>
                  </div>
                  {passwordErrors.confirm_password && (
                    <span className="field-error">{passwordErrors.confirm_password}</span>
                  )}
                  {passwordData.confirm_password &&
                    !passwordErrors.confirm_password &&
                    passwordData.new_password === passwordData.confirm_password && (
                      <span className="field-success">✓ Passwords match</span>
                    )}
                </div>

                <div className="password-actions">
                  <button
                    className="btn-secondary"
                    onClick={handleCancelPassword}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-primary"
                    onClick={handleSavePassword}
                    disabled={saving}
                  >
                    {saving ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATS CARD */}
          <div className="stats-card">
            <div className="stats-header">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                Statistics
              </h3>
              <span className="stats-badge">
                {isAdmin ? "ADMIN" : isVolunteer ? "VOLUNTEER" : "MEMBER"}
              </span>
            </div>

            {isVolunteer ? (
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{profileUser.volunteer?.total_tasks || 0}</div>
                  <div className="stat-label">Missions</div>
                  <div className="stat-trend">Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{unlockedBadges.length}</div>
                  <div className="stat-label">Badges</div>
                  <div className="stat-trend">{lockedBadges.length} locked</div>
                </div>
              </div>
            ) : isAdmin ? (
              <div className="admin-stats">
                <div className="admin-stats-grid">
                  <div className="admin-stat-item">
                    <div className="admin-stat-value">{adminStats.total_reports}</div>
                    <div className="admin-stat-label">Total Reports</div>
                  </div>
                  <div className="admin-stat-item">
                    <div className="admin-stat-value">{adminStats.reports_this_month}</div>
                    <div className="admin-stat-label">This Month</div>
                  </div>
                  <div className="admin-stat-item">
                    <div className="admin-stat-value">{adminStats.total_volunteers}</div>
                    <div className="admin-stat-label">Volunteers</div>
                  </div>
                  <div className="admin-stat-item">
                    <div className="admin-stat-value">{adminStats.resolved_reports}</div>
                    <div className="admin-stat-label">Resolved</div>
                  </div>
                </div>
                <div className="admin-role-info">
                  <div className="admin-role-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="admin-role-text">
                    <h4>Administrator</h4>
                    <p>Managing wildlife rescue operations</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="user-stats">
                <div className="user-stat-main">
                  <div className="user-stat-icon">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  </div>
                  <div className="user-stat-info">
                    <div className="user-stat-value">{recentReports.length}</div>
                    <div className="user-stat-label">Reports Submitted</div>
                  </div>
                </div>
                <div className="user-role-info">
                  <div className="user-role-icon">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="user-role-text">
                    <h4>Community Member</h4>
                    <p>Supporting wildlife rescue since {joinDate}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* VOLUNTEER EQUIPMENT */}
          {isVolunteer && (
            <div className="equipment-card">
              <div className="equipment-header">
                <h3>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                  Equipment & Skills
                </h3>
                {canEdit && !editing && !editingEquipment && !changingPassword && (
                  <button
                    className="btn-edit-small"
                    onClick={() => setEditingEquipment(true)}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 20h9M16.5 3.5L20 7l-9 9H7v-4l9-9z" />
                    </svg>
                    Edit
                  </button>
                )}
              </div>

              {editingEquipment ? (
                <div className="equipment-edit-form">
                  <div className="equipment-edit-field">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="has_car"
                        checked={equipmentData.has_car}
                        onChange={handleEquipmentChange}
                      />
                      <span>I have a car available for transport</span>
                    </label>
                  </div>
                  <div className="equipment-edit-field">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="can_foster"
                        checked={equipmentData.can_foster}
                        onChange={handleEquipmentChange}
                      />
                      <span>I can foster animals</span>
                    </label>
                  </div>
                  <div className="equipment-edit-field">
                    <label htmlFor="animal_handling">Animal handling experience:</label>
                    <select
                      id="animal_handling"
                      name="animal_handling"
                      value={equipmentData.animal_handling}
                      onChange={handleEquipmentChange}
                      className="equipment-select"
                    >
                      <option value="dogs">Dogs</option>
                      <option value="cats">Cats</option>
                      <option value="both">Dogs & cats</option>
                      <option value="small">Small animals</option>
                      <option value="birds">Birds</option>
                      <option value="horses">Horses</option>
                      <option value="all">All animals</option>
                    </select>
                  </div>
                  <div className="equipment-edit-field">
                    <label htmlFor="city">Base city/location:</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={equipmentData.city}
                      onChange={handleEquipmentChange}
                      placeholder="e.g., Kathmandu"
                      className="equipment-input"
                    />
                  </div>
                  <div className="equipment-edit-field">
                    <label htmlFor="availability_status_id">Availability Status:</label>
                    <select
                      id="availability_status_id"
                      name="availability_status_id"
                      value={equipmentData.availability_status_id || 1}
                      onChange={handleEquipmentChange}
                      className="equipment-select"
                    >
                      {availabilityStatuses.map((status) => (
                        <option key={status.status_id} value={status.status_id}>
                          {status.status_name === "available"
                            ? "Available"
                            : status.status_name === "unavailable"
                            ? "Unavailable"
                            : status.status_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="equipment-edit-actions">
                    <button
                      className="btn-secondary small"
                      onClick={handleCancelEquipment}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-primary small"
                      onClick={handleSaveEquipment}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="equipment-grid">
                  <div className="equipment-item">
                    <div className="equipment-icon-svg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="1" y="3" width="15" height="13" rx="2" />
                        <path d="M16 8h4l3 5v3h-7V8z" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                    </div>
                    <div className="equipment-info">
                      <span className="equipment-label">Transport</span>
                      <span
                        className={`equipment-badge ${
                          profileUser.volunteer?.has_car ? "yes" : "no"
                        }`}
                      >
                        {profileUser.volunteer?.has_car ? "Available" : "Not available"}
                      </span>
                    </div>
                  </div>
                  <div className="equipment-item">
                    <div className="equipment-icon-svg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div className="equipment-info">
                      <span className="equipment-label">Fostering</span>
                      <span
                        className={`equipment-badge ${
                          profileUser.volunteer?.can_foster ? "yes" : "no"
                        }`}
                      >
                        {profileUser.volunteer?.can_foster ? "Available" : "Not available"}
                      </span>
                    </div>
                  </div>
                  <div className="equipment-item">
                    <div className="equipment-icon-svg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                    <div className="equipment-info">
                      <span className="equipment-label">Handles</span>
                      <span className="equipment-value">
                        {getAnimalHandlingText(profileUser.volunteer?.animal_handling)}
                      </span>
                    </div>
                  </div>
                  <div className="equipment-item">
                    <div className="equipment-icon-svg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div className="equipment-info">
                      <span className="equipment-label">Base</span>
                      <span className="equipment-value">
                        {profileUser.volunteer?.city || "Any location"}
                      </span>
                    </div>
                  </div>
                  <div className="equipment-item">
                    <div className="equipment-icon-svg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div className="equipment-info">
                      <span className="equipment-label">Availability</span>
                      <span
                        className={`equipment-badge ${getAvailabilityStatusClass(
                          profileUser.volunteer?.availability_status_id
                        )}`}
                      >
                        {getAvailabilityStatusText(
                          profileUser.volunteer?.availability_status_id
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VOLUNTEER BADGES */}
          {isVolunteer && (
            <div className="badges-card">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
                Badges & Achievements
              </h3>

              {unlockedBadges.length > 0 ? (
                <div className="badges-grid">
                  {unlockedBadges.map((badge) => (
                    <div key={badge.badge_id} className="badge-card">
                      <div className="badge-icon-wrapper">
                        <span className="badge-icon">🏆</span>
                      </div>
                      <div className="badge-info">
                        <span className="badge-name">{badge.badge_name}</span>
                        {badge.awarded_at && (
                          <span className="badge-date">
                            {new Date(badge.awarded_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="badges-empty">
                  <div className="badges-empty-icon">🏅</div>
                  <p>No badges yet</p>
                  <span>Complete missions to earn achievements</span>
                </div>
              )}
            </div>
          )}

          {/* RECENT REPORTS */}
          {!isVolunteer && (
            <div className="reports-card">
              <div className="reports-header">
                <h3>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                  Recent Reports
                </h3>
                {recentReports.length > 0 && (
                  <span className="reports-count">{recentReports.length} total</span>
                )}
              </div>

              <div className="reports-list">
                {recentReports.length > 0 ? (
                  recentReports.slice(0, 3).map((report) => {
                    const status = getStatusBadge(report.status_name);
                    const priority = getPriorityFromStatus(report.status_name);
                    return (
                      <div key={report.report_id} className="report-item">
                        <div className="report-icon">{getReportIcon(report.animal_type)}</div>
                        <div className="report-content">
                          <div className="report-title">
                            <span className="animal-type">
                              {report.animal_type || "Unknown"}
                            </span>
                            <span
                              className="report-priority"
                              style={{
                                backgroundColor: getPriorityColor(priority) + "20",
                                color: getPriorityColor(priority),
                              }}
                            >
                              {report.animal_condition || "Injured"}
                            </span>
                          </div>
                          <div className="report-location">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {report.location_address?.split(",")[0] || "Unknown location"}
                          </div>
                          <div className="report-meta">
                            <span className={`report-status ${status.class}`}>
                              {status.text}
                            </span>
                            <span className="report-date">
                              {new Date(report.submitted_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          {isAdmin && report.reporter_name && (
                            <div className="report-reporter">
                              Reported by: <strong>{report.reporter_name}</strong>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="reports-empty">
                    <div className="reports-empty-icon">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                      </svg>
                    </div>
                    <p>No reports yet</p>
                    <span>
                      {isAdmin
                        ? "Reports submitted will appear here"
                        : "Reports you submit will appear here"}
                    </span>
                  </div>
                )}

                {recentReports.length > 0 && (
                  <button
                    className="view-all-btn"
                    onClick={() => navigate(isAdmin ? "/admin/reports" : "/reports")}
                  >
                    View all reports
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};