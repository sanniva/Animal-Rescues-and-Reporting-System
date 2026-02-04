import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportSubmission.css';
import { Report, AnimalType, AnimalCondition, ApiResponse } from '../../../types/types';
import { useAuth } from '../../../context/AuthContext';
import Icon from '../../../components/Icon';

const getUserRole = (user: any): string => {
  if (!user) return 'user';
  
  if (user.role && typeof user.role === 'object' && user.role.role_name) {
    return user.role.role_name.toLowerCase();
  }
  
  if (user.role_name) {
    return user.role_name.toLowerCase();
  }
  
  if (user.role_id) {
    if (user.role_id === 3) return 'admin';
    if (user.role_id === 2) return 'volunteer';
    if (user.role_id === 1) return 'user';
  }
  
  return 'user';
};

const ReportSubmission: React.FC = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Omit<Report, 'report_id' | 'submitted_at' | 'is_deleted'>>({
    user_id: currentUser?.user_id || 0,
    animal_type_id: 1,
    animal_condition_id: 1,
    description: '',
    location_address: '',
    status_id: 1,
    user_note: '',
  });

  const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([
    { type_id: 1, type_name: 'Dog' },
    { type_id: 2, type_name: 'Cat' },
    { type_id: 3, type_name: 'Bird' },
    { type_id: 4, type_name: 'Rabbit' },
    { type_id: 5, type_name: 'Hamster' },
    { type_id: 6, type_name: 'Turtle' },
    { type_id: 7, type_name: 'Horse' },
    { type_id: 8, type_name: 'Cow' },
    { type_id: 9, type_name: 'Goat' },
    { type_id: 10, type_name: 'Sheep' },
    { type_id: 11, type_name: 'Other' },
  ]);

  const [animalConditions, setAnimalConditions] = useState<AnimalCondition[]>([
    { condition_id: 1, condition_name: 'Injured' },
    { condition_id: 2, condition_name: 'Sick' },
    { condition_id: 3, condition_name: 'Abandoned' },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const fetchAnimalData = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const typesResponse = await fetch('http://localhost:5000/api/reports/animal-types', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (typesResponse.ok) {
        const typesData: ApiResponse = await typesResponse.json();
        if (typesData.success && typesData.data) {
          setAnimalTypes(typesData.data);
        }
      }

      const conditionsResponse = await fetch('http://localhost:5000/api/reports/animal-conditions', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (conditionsResponse.ok) {
        const conditionsData: ApiResponse = await conditionsResponse.json();
        if (conditionsData.success && conditionsData.data) {
          setAnimalConditions(conditionsData.data);
        }
      }
    } catch (error: any) {
      console.error('Error fetching animal data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser?.user_id) {
      setFormData(prev => ({
        ...prev,
        user_id: currentUser.user_id
      }));
    }
    fetchAnimalData();
  }, [currentUser, fetchAnimalData]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const userRole = getUserRole(currentUser);
    if (userRole !== 'user') {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  if (!currentUser || isLoading) {
    return (
      <div className="report-loading-screen">
        <div className="loader-animation">
          <div className="loader-circle"></div>
          <div className="loader-text">Preparing Report Form...</div>
        </div>
      </div>
    );
  }

  const validateStep = (): boolean => {
    const errors: {[key: string]: string} = {};

    if (step === 1) {
      if (!formData.animal_type_id) {
        errors.animal_type_id = 'Please select an animal type';
      }
      if (!formData.animal_condition_id) {
        errors.animal_condition_id = 'Please select a condition';
      }
    } else if (step === 2) {
      if (!formData.location_address.trim()) {
        errors.location_address = 'Please provide a location';
      }
    } else if (step === 3) {
      if (!formData.description.trim()) {
        errors.description = 'Please describe the situation';
      }
      if (formData.description.trim().length < 10) {
        errors.description = 'Description must be at least 10 characters';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

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
    if (formErrors.animal_type_id) {
      setFormErrors(prev => ({ ...prev, animal_type_id: '' }));
    }
  };

  const sendNotificationToAdmins = async (reportId: number): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      const selectedAnimalType = animalTypes.find(t => t.type_id === formData.animal_type_id)?.type_name || 'Unknown';
      const selectedCondition = animalConditions.find(c => c.condition_id === formData.animal_condition_id)?.condition_name || 'Unknown';

      const notificationData = {
        type: 'new_report',
        title: 'New Animal Report Submitted',
        message: `User ${currentUser.username} (#${currentUser.user_id}) submitted a new animal rescue report`,
        metadata: {
          report_id: reportId,
          animal_type: selectedAnimalType,
          condition: selectedCondition,
          location: formData.location_address,
          submitted_by: currentUser.user_id,
          submitted_by_username: currentUser.username
        }
      };

      const response = await fetch('http://localhost:5000/api/notifications/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(notificationData)
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to submit a report');
      }

      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        let errorMessage = `Failed to submit report (${response.status})`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }

      const data: ApiResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to submit report');
      }

      const reportId = data.report_id || data.data?.report_id;
      
      if (reportId) {
        await sendNotificationToAdmins(reportId);
      }
      
      setSuccessMessage('Report submitted successfully! Our team has been notified.');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (error: any) {
      console.error('Submit error:', error);
      setErrorMessage(error.message || 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedAnimalType = () => {
    return animalTypes.find(t => t.type_id === formData.animal_type_id)?.type_name || 'Select';
  };

  const getSelectedCondition = () => {
    return animalConditions.find(c => c.condition_id === formData.animal_condition_id)?.condition_name || 'Select';
  };

  const getAnimalIcon = (typeName: string) => {
    switch (typeName.toLowerCase()) {
      case 'dog': return 'FiGitlab';
      case 'cat': return 'FiGitlab';
      case 'bird': return 'FiFeather';
      case 'rabbit': return 'FiGitlab';
      case 'hamster': return 'FiCircle';
      case 'turtle': return 'FiCircle';
      case 'horse': return 'FiGitlab';
      case 'cow': return 'FiGitlab';
      case 'goat': return 'FiGitlab';
      case 'sheep': return 'FiGitlab';
      case 'other': return 'FiHelpCircle';
      default: return 'FiHelpCircle';
    }
  };

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'injured': return 'FiAlertTriangle';
      case 'sick': return 'FiActivity';
      case 'abandoned': return 'FiHeart';
      default: return 'FiInfo';
    }
  };

  return (
    <div className="report-submission-container">
      {/* Header with back button and title */}
      <header className="report-header">
        <div className="header-top">
          <button 
            className="back-button"
            onClick={() => navigate('/dashboard')}
          >
            <Icon type="feather" name="FiArrowLeft" size={20} />
            <span>Back to Dashboard</span>
          </button>
          
          <h1 className="page-title">New Rescue Report</h1>
          
          <div className="header-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="cancel-button"
            >
              <Icon type="feather" name="FiX" size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Step Circles */}
      <div className="step-circles-container">
        <div className="step-circles">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="step-circle-wrapper">
              <div 
                className={`step-circle ${step === stepNumber ? 'active' : ''} ${step > stepNumber ? 'completed' : ''}`}
                onClick={() => step < stepNumber && validateStep() && setStep(stepNumber)}
              >
                {step > stepNumber ? (
                  <Icon type="feather" name="FiCheck" size={16} />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              <span className="step-label">
                {stepNumber === 1 && 'Animal'}
                {stepNumber === 2 && 'Location'}
                {stepNumber === 3 && 'Details'}
                {stepNumber === 4 && 'Review'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="report-main-content">
        <div className="form-container">
          <div className="form-card">
            {successMessage ? (
              <div className="success-state">
                <div className="success-icon">
                  <Icon type="feather" name="FiCheckCircle" size={48} />
                </div>
                <h3>Report Submitted Successfully!</h3>
                <p>{successMessage}</p>
                <div className="success-actions">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <p className="redirect-text">Redirecting to dashboard...</p>
                </div>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <div className="error-state">
                    <Icon type="feather" name="FiAlertTriangle" size={20} />
                    <div className="error-message-text">
                      <strong>Submission Error</strong>
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Step 1: Animal Selection */}
                {step === 1 && (
                  <div className="step-content">
                    <div className="step-header">
                      <h2>Select Animal Type</h2>
                      <p>Choose the type of animal you found</p>
                    </div>

                    <div className="selection-section">
                      <div className="animal-selection">
                        <div className="animal-grid">
                          {animalTypes.map(type => (
                            <button
                              key={type.type_id}
                              type="button"
                              onClick={() => handleAnimalTypeSelect(type.type_id)}
                              className={`animal-select-card ${
                                formData.animal_type_id === type.type_id ? 'selected' : ''
                              }`}
                            >
                              <div className="animal-select-icon">
                                <Icon 
                                  type="feather" 
                                  name={getAnimalIcon(type.type_name)} 
                                  size={20} 
                                />
                              </div>
                              <span className="animal-select-name">{type.type_name}</span>
                            </button>
                          ))}
                        </div>
                        {formErrors.animal_type_id && (
                          <div className="error-message">
                            <Icon type="feather" name="FiAlertCircle" size={14} />
                            <span>{formErrors.animal_type_id}</span>
                          </div>
                        )}
                      </div>

                      <div className="condition-selection">
                        <label className="condition-label">Select Condition</label>
                        <div className="condition-buttons">
                          {animalConditions.map(condition => (
                            <button
                              key={condition.condition_id}
                              type="button"
                              onClick={() => setFormData(prev => ({ 
                                ...prev, 
                                animal_condition_id: condition.condition_id 
                              }))}
                              className={`condition-select-button ${
                                formData.animal_condition_id === condition.condition_id ? 'selected' : ''
                              }`}
                            >
                              <Icon 
                                type="feather" 
                                name={getConditionIcon(condition.condition_name)} 
                                size={16} 
                              />
                              <span>{condition.condition_name}</span>
                            </button>
                          ))}
                        </div>
                        {formErrors.animal_condition_id && (
                          <div className="error-message">
                            <Icon type="feather" name="FiAlertCircle" size={14} />
                            <span>{formErrors.animal_condition_id}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                  <div className="step-content">
                    <div className="step-header">
                      <h2>Where is the animal?</h2>
                      <p>Provide the location details</p>
                    </div>

                    <div className="input-section">
                      <label className="input-label">
                        <Icon type="feather" name="FiMapPin" size={16} />
                        <span>Location Address</span>
                        <span className="required">*</span>
                      </label>
                      
                      <textarea
                        name="location_address"
                        value={formData.location_address}
                        onChange={handleInputChange}
                        placeholder="Enter exact address, street name, or nearby landmark"
                        className="location-input"
                        rows={3}
                        autoFocus
                      />
                      
                      {formErrors.location_address && (
                        <div className="error-message">
                          <Icon type="feather" name="FiAlertCircle" size={14} />
                          <span>{formErrors.location_address}</span>
                        </div>
                      )}
                      
                      <div className="input-help">
                        <Icon type="feather" name="FiInfo" size={14} />
                        <span>Be specific to help rescuers find the animal quickly</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <div className="step-content">
                    <div className="step-header">
                      <h2>Provide Details</h2>
                      <p>Describe the animal and situation</p>
                    </div>

                    <div className="input-section">
                      <label className="input-label">
                        <Icon type="feather" name="FiFileText" size={16} />
                        <span>Description</span>
                        <span className="required">*</span>
                      </label>
                      
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the animal's appearance, behavior, visible injuries, and current situation..."
                        className="description-input"
                        rows={6}
                      />
                      
                      <div className="char-counter">
                        <span>{formData.description.length}/500 characters</span>
                        <span className="min-chars">Min. 10 characters</span>
                      </div>
                      
                      {formErrors.description && (
                        <div className="error-message">
                          <Icon type="feather" name="FiAlertCircle" size={14} />
                          <span>{formErrors.description}</span>
                        </div>
                      )}
                    </div>

                    <div className="input-section">
                      <label className="input-label">
                        <Icon type="feather" name="FiMessageSquare" size={16} />
                        <span>Additional Notes</span>
                        <span className="optional">Optional</span>
                      </label>
                      
                      <textarea
                        name="user_note"
                        value={formData.user_note}
                        onChange={handleInputChange}
                        placeholder="Time sighted, accessibility issues, safety concerns, or other observations..."
                        className="notes-input"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <div className="step-content">
                    <div className="step-header">
                      <h2>Review Report</h2>
                      <p>Check all information before submitting</p>
                    </div>

                    <div className="review-section">
                      <div className="review-card">
                        <div className="review-card-header">
                          <Icon type="feather" name="FiGitlab" size={16} />
                          <h3>Animal Details</h3>
                        </div>
                        <div className="review-items">
                          <div className="review-item">
                            <span className="review-label">Type:</span>
                            <span className="review-value">
                              <Icon 
                                type="feather" 
                                name={getAnimalIcon(getSelectedAnimalType())} 
                                size={14} 
                              />
                              {getSelectedAnimalType()}
                            </span>
                          </div>
                          <div className="review-item">
                            <span className="review-label">Condition:</span>
                            <span className="review-value">
                              <Icon 
                                type="feather" 
                                name={getConditionIcon(getSelectedCondition())} 
                                size={14} 
                              />
                              {getSelectedCondition()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="review-card">
                        <div className="review-card-header">
                          <Icon type="feather" name="FiMapPin" size={16} />
                          <h3>Location</h3>
                        </div>
                        <div className="review-item full">
                          <span className="review-text">{formData.location_address}</span>
                        </div>
                      </div>

                      <div className="review-card">
                        <div className="review-card-header">
                          <Icon type="feather" name="FiFileText" size={16} />
                          <h3>Description</h3>
                        </div>
                        <div className="review-item full">
                          <span className="review-text">{formData.description}</span>
                        </div>
                        {formData.user_note && (
                          <div className="review-item full">
                            <div className="review-label">Additional Notes:</div>
                            <span className="review-text note">{formData.user_note}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="action-buttons">
                  <div className="button-group">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn-prev"
                        disabled={isSubmitting}
                      >
                        <Icon type="feather" name="FiChevronLeft" size={18} />
                        <span>Previous</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="btn-cancel"
                      >
                        <Icon type="feather" name="FiX" size={18} />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>

                  <div className="button-group">
                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-next"
                      >
                        <span>Continue</span>
                        <Icon type="feather" name="FiChevronRight" size={18} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn-submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="submit-spinner"></div>
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Icon type="feather" name="FiSend" size={18} />
                            <span>Submit Report</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportSubmission;