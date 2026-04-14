// frontend/src/pages/ReportSubmission/ReportSubmission.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ReportSubmission.css';
import { useAuth } from '../../../context/AuthContext';

// Fix for Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = defaultIcon;

interface AnimalType {
  type_id: number;
  type_name: string;
}

interface AnimalCondition {
  condition_id: number;
  condition_name: string;
}

interface FormData {
  animal_type_id: number;
  animal_condition_id: number;
  description: string;
  location_address: string;
  latitude?: number;
  longitude?: number;
}

interface LocationSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

const API_BASE_URL = '${process.env.REACT_APP_API_URL}/api';
const NOMINATIM_API = 'https://nominatim.openstreetmap.org';

const ReportSubmission: React.FC = () => {
  const { user: currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [formData, setFormData] = useState<FormData>({
    animal_type_id: 0,
    animal_condition_id: 0,
    description: '',
    location_address: '',
  });
  
  const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
  const [animalConditions, setAnimalConditions] = useState<AnimalCondition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  // Initialize map
  useEffect(() => {
    if (step === 2 && mapContainerRef.current && !mapRef.current) {
      const defaultLat = 27.7172;
      const defaultLng = 85.3240;
      
      mapRef.current = L.map(mapContainerRef.current).setView([defaultLat, defaultLng], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        updateMarker(lat, lng);
        reverseGeocode(lat, lng);
      });

      if (formData.location_address) {
        geocodeAddress(formData.location_address);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [step]);

  useEffect(() => {
    if (!completedSteps.includes(step) && step > 1) {
      setCompletedSteps(prev => [...prev, step - 1]);
    }
  }, [step]);

  const updateMarker = (lat: number, lng: number) => {
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else if (mapRef.current) {
      markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
    }
    setSelectedPosition([lat, lng]);
    setFormData(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng
    }));
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `${NOMINATIM_API}/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      if (data.display_name) {
        setFormData(prev => ({
          ...prev,
          location_address: data.display_name
        }));
        setFormErrors(prev => ({ ...prev, location_address: '' }));
      }
    } catch (error) {
      console.error('Reverse geocoding failed');
    }
  };

  const geocodeAddress = async (address: string) => {
    try {
      const response = await fetch(
        `${NOMINATIM_API}/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();
      if (data && data[0]) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        if (mapRef.current) {
          mapRef.current.setView([lat, lng], 15);
          updateMarker(lat, lng);
        }
      }
    } catch (error) {
      console.error('Geocoding failed');
    }
  };

  const searchLocations = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${NOMINATIM_API}/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Location search failed');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchLocations(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const selectLocation = (suggestion: LocationSuggestion) => {
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    
    setFormData(prev => ({
      ...prev,
      location_address: suggestion.display_name
    }));
    setSearchQuery(suggestion.display_name);
    setShowSuggestions(false);
    
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 16);
      updateMarker(lat, lng);
    }
  };

  const getToken = () => sessionStorage.getItem('token');

  const fetchAnimalData = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setError('Please login to submit a report');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const typesResponse = await fetch(`${API_BASE_URL}/reports/animal-types`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!typesResponse.ok) {
        if (typesResponse.status === 401) {
          logout();
          navigate('/login');
          return;
        }
        throw new Error('Failed to fetch animal types');
      }

      const typesData = await typesResponse.json();
      if (typesData.success) {
        setAnimalTypes(typesData.data || []);
        if (typesData.data?.length > 0 && !formData.animal_type_id) {
          setFormData(prev => ({ ...prev, animal_type_id: typesData.data[0].type_id }));
        }
      }

      const conditionsResponse = await fetch(`${API_BASE_URL}/reports/animal-conditions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!conditionsResponse.ok) {
        throw new Error('Failed to fetch animal conditions');
      }

      const conditionsData = await conditionsResponse.json();
      if (conditionsData.success) {
        setAnimalConditions(conditionsData.data || []);
        if (conditionsData.data?.length > 0 && !formData.animal_condition_id) {
          setFormData(prev => ({ ...prev, animal_condition_id: conditionsData.data[0].condition_id }));
        }
      }

    } catch (error: any) {
      setError('Failed to load form data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate, logout]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (currentUser.role?.role_name !== 'user') {
      navigate('/dashboard');
      return;
    }
    fetchAnimalData();
  }, [currentUser, navigate, fetchAnimalData]);

  const validateStep = (stepNumber: number): boolean => {
    const errors: Record<string, string> = {};

    switch (stepNumber) {
      case 1:
        if (!formData.animal_type_id) errors.animal_type_id = 'Please select an animal type';
        if (!formData.animal_condition_id) errors.animal_condition_id = 'Please select a condition';
        break;
      case 2:
        if (!formData.location_address.trim()) errors.location_address = 'Please select a location on the map';
        break;
      case 3:
        if (!formData.description.trim()) {
          errors.description = 'Please describe the situation';
        } else if (formData.description.trim().length < 20) {
          errors.description = 'Description must be at least 20 characters';
        }
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => validateStep(step) && setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'animal_type_id' || name === 'animal_condition_id' ? parseInt(value) : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAnimalTypeSelect = (typeId: number) => {
    setFormData(prev => ({ ...prev, animal_type_id: typeId }));
    setFormErrors(prev => ({ ...prev, animal_type_id: '' }));
  };

  const handleConditionSelect = (conditionId: number) => {
    setFormData(prev => ({ ...prev, animal_condition_id: conditionId }));
    setFormErrors(prev => ({ ...prev, animal_condition_id: '' }));
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    const token = getToken();
    if (!token) {
      setError('Please login to submit a report');
      navigate('/login');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        animal_type_id: formData.animal_type_id,
        animal_condition_id: formData.animal_condition_id,
        description: formData.description.trim(),
        location_address: formData.location_address.trim(),
        user_note: ''
      };

      const response = await fetch(`${API_BASE_URL}/reports/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit report');
      }

      setSuccess('Report submitted successfully! Our rangers will respond ASAP.');
      setCompletedSteps([1, 2, 3, 4]);

      setTimeout(() => navigate('/dashboard'), 3000);

    } catch (error: any) {
      setError(error.message || 'Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedAnimalTypeName = () => 
    animalTypes.find(t => t.type_id === formData.animal_type_id)?.type_name || '';

  const getSelectedConditionName = () => 
    animalConditions.find(c => c.condition_id === formData.animal_condition_id)?.condition_name || '';

  const getAnimalEmoji = (typeName: string) => {
    const type = typeName?.toLowerCase() || '';
    if (type.includes('dog')) return '🐕';
    if (type.includes('cat')) return '🐈';
    if (type.includes('bird')) return '🐦';
    if (type.includes('rabbit')) return '🐇';
    if (type.includes('hamster')) return '🐹';
    if (type.includes('turtle')) return '🐢';
    if (type.includes('horse')) return '🐎';
    if (type.includes('cow')) return '🐄';
    if (type.includes('goat')) return '🐐';
    if (type.includes('sheep')) return '🐑';
    if (type.includes('fish')) return '🐠';
    if (type.includes('snake')) return '🐍';
    return '🐾';
  };

  const getConditionIcon = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes('critical')) return '🆘';
    if (cond.includes('severe')) return '⚠️';
    if (cond.includes('moderate')) return '📋';
    if (cond.includes('mild')) return '💚';
    if (cond.includes('abandoned')) return '💔';
    if (cond.includes('injured')) return '🏥';
    if (cond.includes('sick')) return '🤒';
    return 'ℹ️';
  };

  if (isLoading) {
    return (
      <div className="report-container">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading report form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="report-container">
      <div className="report-header">
        <h1>File Field Report</h1>
        <p>Report animals in distress. Your information helps our rangers respond effectively.</p>
      </div>

      <div className="progress-steps">
        {['Animal', 'Location', 'Details', 'Review'].map((label, index) => (
          <React.Fragment key={label}>
            <div className={`step ${step > index + 1 ? 'completed' : ''} ${step === index + 1 ? 'active' : ''}`}>
              <div className="step-number">
                {step > index + 1 ? '✓' : index + 1}
              </div>
              <span className="step-label">{label}</span>
            </div>
            {index < 3 && <div className="step-connector"></div>}
          </React.Fragment>
        ))}
      </div>

      <div className="report-content">
        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Report Submitted!</h2>
            <p>{success}</p>
            <div className="redirect-indicator">
              <div className="dot-flash"></div>
              <p>Redirecting to dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Step 1: Animal Selection */}
            {step === 1 && (
              <div className="step-content">
                <h2>What animal did you find?</h2>
                <p className="step-description">Select the animal type and its condition</p>

                <div className="form-section">
                  <label>Animal Type *</label>
                  <div className="animal-grid">
                    {animalTypes.map(type => (
                      <button
                        key={type.type_id}
                        onClick={() => handleAnimalTypeSelect(type.type_id)}
                        className={`animal-card ${formData.animal_type_id === type.type_id ? 'selected' : ''}`}
                      >
                        <span className="animal-emoji">{getAnimalEmoji(type.type_name)}</span>
                        <span className="animal-name">{type.type_name}</span>
                      </button>
                    ))}
                  </div>
                  {formErrors.animal_type_id && <span className="error-text">{formErrors.animal_type_id}</span>}
                </div>

                <div className="form-section">
                  <label>Condition *</label>
                  <div className="condition-grid">
                    {animalConditions.map(condition => (
                      <button
                        key={condition.condition_id}
                        onClick={() => handleConditionSelect(condition.condition_id)}
                        className={`condition-card ${formData.animal_condition_id === condition.condition_id ? 'selected' : ''}`}
                      >
                        <span className="condition-icon">{getConditionIcon(condition.condition_name)}</span>
                        <span>{condition.condition_name}</span>
                      </button>
                    ))}
                  </div>
                  {formErrors.animal_condition_id && <span className="error-text">{formErrors.animal_condition_id}</span>}
                </div>
              </div>
            )}

            {/* Step 2: Location with Map */}
            {step === 2 && (
              <div className="step-content">
                <h2>Where is the animal located?</h2>
                <p className="step-description">Click on the map to mark the exact location or search for an address</p>

                <div className="location-search">
                  <input
                    type="text"
                    placeholder="Search for an address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    className="search-input"
                  />
                  {isSearching && <span className="search-spinner"></span>}
                  
                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="suggestions">
                      {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => selectLocation(suggestion)}>
                          📍 {suggestion.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="map-wrapper">
                  <div ref={mapContainerRef} className="map-container"></div>
                  {!selectedPosition && (
                    <div className="map-hint">👆 Click on the map to set location</div>
                  )}
                </div>

                <div className="selected-location">
                  <label>Selected Location:</label>
                  <textarea
                    value={formData.location_address}
                    readOnly
                    placeholder="Click on the map to select a location"
                    rows={2}
                  />
                </div>

                {formErrors.location_address && <span className="error-text">{formErrors.location_address}</span>}
              </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <div className="step-content">
                <h2>Tell us more about the situation</h2>
                <p className="step-description">Describe what you observed</p>

                <div className="form-section">
                  <label>Detailed Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the animal's appearance, behavior, visible injuries, and current situation..."
                    rows={6}
                    className="description-input"
                  />
                  <div className="char-counter">
                    <span className={formData.description.length < 20 ? 'insufficient' : ''}>
                      {formData.description.length}/500
                    </span>
                    <span>Minimum 20 characters</span>
                  </div>
                  {formErrors.description && <span className="error-text">{formErrors.description}</span>}
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="step-content">
                <h2>Review your report</h2>
                <p className="step-description">Please verify all information before submitting</p>

                <div className="review-container">
                  <div className="review-section">
                    <h3>🐾 Animal Information</h3>
                    <div className="review-item">
                      <span>Type:</span>
                      <span>
                        {getAnimalEmoji(getSelectedAnimalTypeName())} {getSelectedAnimalTypeName()}
                      </span>
                    </div>
                    <div className="review-item">
                      <span>Condition:</span>
                      <span>
                        {getConditionIcon(getSelectedConditionName())} {getSelectedConditionName()}
                      </span>
                    </div>
                  </div>

                  <div className="review-section">
                    <h3>📍 Location</h3>
                    <p className="review-text">{formData.location_address}</p>
                    {selectedPosition && (
                      <p className="review-coords">
                        {selectedPosition[0].toFixed(6)}, {selectedPosition[1].toFixed(6)}
                      </p>
                    )}
                  </div>

                  <div className="review-section">
                    <h3>📝 Description</h3>
                    <p className="review-text">{formData.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="form-navigation">
              <button
                onClick={() => step === 1 ? navigate('/dashboard') : prevStep()}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                {step === 1 ? 'Cancel' : '← Back'}
              </button>
              
              {step < 4 ? (
                <button
                  onClick={nextStep}
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : '📤 Submit Report'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportSubmission;
