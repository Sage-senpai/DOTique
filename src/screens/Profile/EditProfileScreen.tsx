// src/screens/Profile/EditProfileScreen.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Camera, MapPin, Calendar, User, Mail, Globe } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../services/supabase';
import './EditProfileScreen.scss';

// Country data for autocomplete
const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
  'Japan', 'South Korea', 'Brazil', 'Mexico', 'India', 'China', 'Nigeria',
  'South Africa', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway',
  'Switzerland', 'Austria', 'Belgium', 'Poland', 'Portugal', 'Greece'
].sort();

// Popular cities for location autocomplete
const POPULAR_CITIES = [
  'New York', 'Los Angeles', 'London', 'Paris', 'Tokyo', 'Berlin', 'Toronto',
  'Sydney', 'Melbourne', 'Singapore', 'Dubai', 'Amsterdam', 'Barcelona',
  'Madrid', 'Rome', 'Milan', 'Seoul', 'Mumbai', 'São Paulo', 'Mexico City',
  'Port Harcourt', 'Lagos', 'Abuja', 'Accra', 'Nairobi'
].sort();

export default function EditProfileScreen() {
  const navigate = useNavigate();
  const { profile, setProfile } = useAuthStore();
  
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
    email: profile?.email || '',
    location: profile?.location || '',
    country: profile?.metadata?.country || '',
    birthday: profile?.birthday || '',
    fashion_archetype: profile?.fashion_archetype || ''
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(profile?.dotvatar_url || profile?.avatar_url || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Autocomplete states
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        username: profile.username || '',
        bio: profile.bio || '',
        email: profile.email || '',
        location: profile.location || '',
        country: profile.metadata?.country || '',
        birthday: profile.birthday || '',
        fashion_archetype: profile.fashion_archetype || ''
      });
      setAvatarPreview(profile.dotvatar_url || profile.avatar_url || '');
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Handle location autocomplete
    if (field === 'location' && value.length > 0) {
      const filtered = POPULAR_CITIES.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered.slice(0, 5));
      setShowLocationSuggestions(true);
    } else if (field === 'location') {
      setShowLocationSuggestions(false);
    }

    // Handle country autocomplete
    if (field === 'country' && value.length > 0) {
      const filtered = COUNTRIES.filter(country =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setCountrySuggestions(filtered.slice(0, 5));
      setShowCountrySuggestions(true);
    } else if (field === 'country') {
      setShowCountrySuggestions(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, avatar: 'File size must be less than 5MB' }));
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.display_name.trim()) {
      newErrors.display_name = 'Display name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (formData.bio && formData.bio.length > 200) {
      newErrors.bio = 'Bio must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let avatarUrl = profile?.avatar_url;

      // Upload avatar if changed
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${profile?.id}-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
        
        avatarUrl = urlData.publicUrl;
      }

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name,
          username: formData.username,
          bio: formData.bio,
          email: formData.email,
          location: formData.location,
          birthday: formData.birthday || null,
          fashion_archetype: formData.fashion_archetype || null,
          avatar_url: avatarUrl,
          metadata: {
            ...profile?.metadata,
            country: formData.country
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', profile?.id);

      if (updateError) throw updateError;

      // Fetch updated profile
      const { data: updatedProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profile?.id)
        .single();

      if (fetchError) throw fetchError;

      setProfile(updatedProfile);
      alert('✅ Profile updated successfully!');
      navigate('/profile');
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      alert(`❌ Failed to update profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="edit-profile-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="edit-profile-screen__header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h2>Edit Profile</h2>
        <button 
          className="save-btn" 
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : (
            <>
              <Save size={18} />
              Save
            </>
          )}
        </button>
      </div>

      <div className="edit-profile-screen__content">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-preview">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" />
            ) : (
              <div className="avatar-placeholder">
                <User size={48} />
              </div>
            )}
            <label className="avatar-change-btn">
              <Camera size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          {errors.avatar && <span className="error-text">{errors.avatar}</span>}
        </div>

        {/* Form Fields */}
        <div className="form-section">
          {/* Display Name */}
          <div className="form-group">
            <label className="form-label">
              <User size={16} />
              Display Name *
            </label>
            <input
              type="text"
              className={`form-input ${errors.display_name ? 'error' : ''}`}
              value={formData.display_name}
              onChange={(e) => handleInputChange('display_name', e.target.value)}
              placeholder="Enter your display name"
              maxLength={50}
            />
            {errors.display_name && (
              <span className="error-text">{errors.display_name}</span>
            )}
          </div>

          {/* Username */}
          <div className="form-group">
            <label className="form-label">
              <User size={16} />
              Username *
            </label>
            <input
              type="text"
              className={`form-input ${errors.username ? 'error' : ''}`}
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Enter your username"
              maxLength={30}
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          {/* Bio */}
          <div className="form-group">
            <label className="form-label">
              Bio
              <span className="char-count">{formData.bio.length}/200</span>
            </label>
            <textarea
              className={`form-textarea ${errors.bio ? 'error' : ''}`}
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
              maxLength={200}
            />
            {errors.bio && (
              <span className="error-text">{errors.bio}</span>
            )}
          </div>

          {/* Location with Autocomplete */}
          <div className="form-group autocomplete-group">
            <label className="form-label">
              <MapPin size={16} />
              Location
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              onFocus={() => formData.location && setShowLocationSuggestions(true)}
              onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
              placeholder="City, State"
            />
            {showLocationSuggestions && locationSuggestions.length > 0 && (
              <div className="autocomplete-dropdown">
                {locationSuggestions.map((city) => (
                  <div
                    key={city}
                    className="autocomplete-item"
                    onClick={() => {
                      handleInputChange('location', city);
                      setShowLocationSuggestions(false);
                    }}
                  >
                    <MapPin size={14} />
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Country with Autocomplete */}
          <div className="form-group autocomplete-group">
            <label className="form-label">
              <Globe size={16} />
              Country
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              onFocus={() => formData.country && setShowCountrySuggestions(true)}
              onBlur={() => setTimeout(() => setShowCountrySuggestions(false), 200)}
              placeholder="Select your country"
            />
            {showCountrySuggestions && countrySuggestions.length > 0 && (
              <div className="autocomplete-dropdown">
                {countrySuggestions.map((country) => (
                  <div
                    key={country}
                    className="autocomplete-item"
                    onClick={() => {
                      handleInputChange('country', country);
                      setShowCountrySuggestions(false);
                    }}
                  >
                    <Globe size={14} />
                    {country}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Birthday */}
          <div className="form-group">
            <label className="form-label">
              <Calendar size={16} />
              Birthday
            </label>
            <input
              type="date"
              className="form-input"
              value={formData.birthday}
              onChange={(e) => handleInputChange('birthday', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Fashion Archetype */}
          <div className="form-group">
            <label className="form-label">
              Fashion Archetype
            </label>
            <select
              className="form-select"
              value={formData.fashion_archetype}
              onChange={(e) => handleInputChange('fashion_archetype', e.target.value)}
            >
              <option value="">Select an archetype</option>
              <option value="minimalist">Minimalist</option>
              <option value="streetwear">Streetwear</option>
              <option value="haute_couture">Haute Couture</option>
              <option value="bohemian">Bohemian</option>
              <option value="athleisure">Athleisure</option>
              <option value="vintage">Vintage</option>
              <option value="avant_garde">Avant-Garde</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="btn-cancel"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className="btn-save"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}