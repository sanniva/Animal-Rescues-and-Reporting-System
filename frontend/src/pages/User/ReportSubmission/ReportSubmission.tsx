// // // frontend/src/pages/ReportSubmission/ReportSubmission.tsx
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import './ReportSubmission.css';
// // import { useAuth } from '../../../context/AuthContext';

// // // Types
// // interface AnimalType {
// //   type_id: number;
// //   type_name: string;
// // }

// // interface AnimalCondition {
// //   condition_id: number;
// //   condition_name: string;
// // }

// // interface FormData {
// //   animal_type_id: number;
// //   animal_condition_id: number;
// //   description: string;
// //   location_address: string;
// //   user_note: string;
// // }

// // const API_BASE_URL = 'http://localhost:5000/api';

// // const ReportSubmission: React.FC = () => {
// //   const { user: currentUser, logout } = useAuth();
// //   const navigate = useNavigate();

// //   // State
// //   const [step, setStep] = useState<number>(1);
// //   const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
// //   const [formData, setFormData] = useState<FormData>({
// //     animal_type_id: 0,
// //     animal_condition_id: 0,
// //     description: '',
// //     location_address: '',
// //     user_note: '',
// //   });
  
// //   const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
// //   const [animalConditions, setAnimalConditions] = useState<AnimalCondition[]>([]);
// //   const [isLoading, setIsLoading] = useState<boolean>(true);
// //   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
// //   const [error, setError] = useState<string>('');
// //   const [success, setSuccess] = useState<string>('');
// //   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
// //   const [retryCount, setRetryCount] = useState<number>(0);

// //   // Get token from localStorage
// //   const getToken = () => {
// //     return localStorage.getItem('token');
// //   };

// //   // Fetch animal data from API
// //   const fetchAnimalData = useCallback(async () => {
// //     const token = getToken();
// //     if (!token) {
// //       setError('Please login to submit a report');
// //       navigate('/login');
// //       return;
// //     }

// //     setIsLoading(true);
// //     setError('');

// //     try {
// //       // Fetch animal types
// //       const typesResponse = await fetch(`${API_BASE_URL}/reports/animal-types`, {
// //         method: 'GET',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (!typesResponse.ok) {
// //         if (typesResponse.status === 401) {
// //           console.error('Token expired, logging out');
// //           logout();
// //           navigate('/login');
// //           return;
// //         }
// //         throw new Error(`Failed to fetch animal types: ${typesResponse.status}`);
// //       }

// //       const typesData = await typesResponse.json();

// //       if (typesData.success) {
// //         setAnimalTypes(typesData.data || []);
// //         if (typesData.data && typesData.data.length > 0 && !formData.animal_type_id) {
// //           setFormData(prev => ({
// //             ...prev,
// //             animal_type_id: typesData.data[0].type_id
// //           }));
// //         }
// //       }

// //       // Fetch animal conditions
// //       const conditionsResponse = await fetch(`${API_BASE_URL}/reports/animal-conditions`, {
// //         method: 'GET',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (!conditionsResponse.ok) {
// //         throw new Error(`Failed to fetch animal conditions: ${conditionsResponse.status}`);
// //       }

// //       const conditionsData = await conditionsResponse.json();

// //       if (conditionsData.success) {
// //         setAnimalConditions(conditionsData.data || []);
// //         if (conditionsData.data && conditionsData.data.length > 0 && !formData.animal_condition_id) {
// //           setFormData(prev => ({
// //             ...prev,
// //             animal_condition_id: conditionsData.data[0].condition_id
// //           }));
// //         }
// //       }

// //     } catch (error: any) {
// //       console.error('❌ Error fetching animal data:', error);
// //       setError(`Failed to load form data: ${error.message}`);
      
// //       // Retry logic
// //       if (retryCount < 3) {
// //         setTimeout(() => {
// //           setRetryCount(prev => prev + 1);
// //           fetchAnimalData();
// //         }, 2000);
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, [navigate, logout, retryCount, formData.animal_type_id, formData.animal_condition_id]);

// //   // Initial load
// //   useEffect(() => {
// //     if (!currentUser) {
// //       navigate('/login');
// //       return;
// //     }

// //     // Only regular users can submit reports
// //     if (currentUser.role?.role_name !== 'user') {
// //       navigate('/dashboard');
// //       return;
// //     }

// //     fetchAnimalData();
// //   }, [currentUser, navigate, fetchAnimalData]);

// //   // Update completed steps when step changes
// //   useEffect(() => {
// //     if (!completedSteps.includes(step) && step > 1) {
// //       setCompletedSteps(prev => [...prev, step - 1]);
// //     }
// //   }, [step, completedSteps]);

// //   // Form validation
// //   const validateStep = (stepNumber: number): boolean => {
// //     const errors: Record<string, string> = {};

// //     switch (stepNumber) {
// //       case 1:
// //         if (!formData.animal_type_id) {
// //           errors.animal_type_id = 'Please select an animal type';
// //         }
// //         if (!formData.animal_condition_id) {
// //           errors.animal_condition_id = 'Please select a condition';
// //         }
// //         break;
      
// //       case 2:
// //         if (!formData.location_address.trim()) {
// //           errors.location_address = 'Please provide a location';
// //         } else if (formData.location_address.trim().length < 5) {
// //           errors.location_address = 'Location must be at least 5 characters';
// //         }
// //         break;
      
// //       case 3:
// //         if (!formData.description.trim()) {
// //           errors.description = 'Please describe the situation';
// //         } else if (formData.description.trim().length < 10) {
// //           errors.description = 'Description must be at least 10 characters';
// //         }
// //         break;
// //     }

// //     setFormErrors(errors);
// //     return Object.keys(errors).length === 0;
// //   };

// //   // Navigation
// //   const nextStep = () => {
// //     if (validateStep(step)) {
// //       setStep(prev => Math.min(prev + 1, 4));
// //     }
// //   };

// //   const prevStep = () => {
// //     setStep(prev => Math.max(prev - 1, 1));
// //   };

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: name === 'animal_type_id' || name === 'animal_condition_id' ? parseInt(value) : value
// //     }));
// //     // Clear error for this field
// //     if (formErrors[name]) {
// //       setFormErrors(prev => ({ ...prev, [name]: '' }));
// //     }
// //   };

// //   const handleAnimalTypeSelect = (typeId: number) => {
// //     setFormData(prev => ({ ...prev, animal_type_id: typeId }));
// //     if (formErrors.animal_type_id) {
// //       setFormErrors(prev => ({ ...prev, animal_type_id: '' }));
// //     }
// //   };

// //   const handleConditionSelect = (conditionId: number) => {
// //     setFormData(prev => ({ ...prev, animal_condition_id: conditionId }));
// //     if (formErrors.animal_condition_id) {
// //       setFormErrors(prev => ({ ...prev, animal_condition_id: '' }));
// //     }
// //   };

// //   // Submit report
// //   const handleSubmit = async () => {
// //     if (!validateStep(step)) return;

// //     setIsSubmitting(true);
// //     setError('');
// //     setSuccess('');

// //     const token = getToken();
// //     if (!token) {
// //       setError('Please login to submit a report');
// //       navigate('/login');
// //       setIsSubmitting(false);
// //       return;
// //     }

// //     try {
// //       const payload = {
// //         animal_type_id: formData.animal_type_id,
// //         animal_condition_id: formData.animal_condition_id,
// //         description: formData.description.trim(),
// //         location_address: formData.location_address.trim(),
// //         user_note: formData.user_note.trim() || ''
// //       };

// //       const response = await fetch(`${API_BASE_URL}/reports/submit`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify(payload)
// //       });

// //       let data;
// //       try {
// //         const responseText = await response.text();
// //         data = JSON.parse(responseText);
// //       } catch (parseError) {
// //         console.error('Failed to parse JSON:', parseError);
// //         throw new Error('Invalid server response');
// //       }

// //       if (!response.ok) {
// //         throw new Error(data.message || `Failed to submit report (${response.status})`);
// //       }

// //       if (!data.success) {
// //         throw new Error(data.message || 'Failed to submit report');
// //       }

// //       setSuccess('✅ Field report submitted! Our rangers will respond ASAP.');

// //       // Mark all steps as completed
// //       setCompletedSteps([1, 2, 3, 4]);

// //       // Redirect to dashboard after 3 seconds
// //       setTimeout(() => {
// //         navigate('/dashboard');
// //       }, 3000);

// //     } catch (error: any) {
// //       console.error('❌ Submit error:', error);
// //       setError(`Failed to submit report: ${error.message}`);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   // Helper functions
// //   const getSelectedAnimalTypeName = () => {
// //     return animalTypes.find(t => t.type_id === formData.animal_type_id)?.type_name || 'Not selected';
// //   };

// //   const getSelectedConditionName = () => {
// //     return animalConditions.find(c => c.condition_id === formData.animal_condition_id)?.condition_name || 'Not selected';
// //   };

// //   // Emoji icons for animals
// //   const getAnimalEmoji = (typeName: string) => {
// //     const emojiMap: Record<string, string> = {
// //       'dog': '🐕',
// //       'cat': '🐈',
// //       'bird': '🐦',
// //       'rabbit': '🐇',
// //       'hamster': '🐹',
// //       'turtle': '🐢',
// //       'horse': '🐎',
// //       'cow': '🐄',
// //       'goat': '🐐',
// //       'sheep': '🐑',
// //       'other': '❓'
// //     };
    
// //     const lowerType = typeName.toLowerCase();
// //     return emojiMap[lowerType] || '❓';
// //   };

// //   const getConditionIcon = (condition: string) => {
// //     switch (condition.toLowerCase()) {
// //       case 'critical': return '🆘';
// //       case 'severe': return '⚠️';
// //       case 'moderate': return '🩹';
// //       case 'mild': return '🤒';
// //       case 'injured': return '🩹';
// //       case 'sick': return '🤒';
// //       case 'abandoned': return '💔';
// //       default: return 'ℹ️';
// //     }
// //   };

// //   // Loading state
// //   if (isLoading) {
// //     return (
// //       <div className="report-submission-container">
// //         <div className="report-loading-screen">
// //           <div className="loader-animation">
// //             <div className="loader-circle"></div>
// //             <div className="loader-text">🛰️ Initializing Field Report...</div>
// //             <button 
// //               onClick={fetchAnimalData} 
// //               className="retry-button"
// //             >
// //               Retry Connection
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="report-submission-container">
// //       {/* Header with back button */}
// //       <div className="report-header">
// //         {/* <button 
// //           onClick={() => navigate('/dashboard')}
// //           className="back-to-dashboard-btn"
// //         >
// //           ← Back to Dashboard
// //         </button> */}
// //         <h1 className="report-title">📋 File Field Report</h1>
// //         <p className="report-subtitle">
// //           Report animals in distress. Your information helps our rangers respond effectively.
// //         </p>
// //       </div>

// //       {/* Step Progress Circles */}
// //       <div className="step-progress-circles">
// //         {[1, 2, 3, 4].map((stepNum) => (
// //           <div key={stepNum} className="step-circle-wrapper">
// //             <div className={`step-circle ${step === stepNum ? 'active' : ''} ${completedSteps.includes(stepNum) ? 'completed' : ''}`}>
// //               {completedSteps.includes(stepNum) && stepNum !== step ? (
// //                 <span className="check-icon">✓</span>
// //               ) : (
// //                 <span>{stepNum}</span>
// //               )}
// //             </div>
// //             <p className={`step-label ${step === stepNum ? 'active' : ''}`}>
// //               {stepNum === 1 ? 'Animal' : 
// //                stepNum === 2 ? 'Location' : 
// //                stepNum === 3 ? 'Details' : 'Review'}
// //             </p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Main Content */}
// //       <main className="report-main-content">
// //         <div className="form-wrapper">
// //           {success ? (
// //             <div className="success-card">
// //               <div className="success-icon">✅</div>
// //               <h2>Report Submitted Successfully!</h2>
// //               <p className="success-message">{success}</p>
// //               <div className="loading-indicator">
// //                 <div className="loading-dots">
// //                   <span></span>
// //                   <span></span>
// //                   <span></span>
// //                 </div>
// //                 <p>Redirecting to dashboard...</p>
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="form-card">
// //               {/* Error Display */}
// //               {error && (
// //                 <div className="error-alert">
// //                   <div className="error-icon">❌</div>
// //                   <div className="error-content">
// //                     <strong>Error</strong>
// //                     <p>{error}</p>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Step 1: Animal Selection */}
// //               {step === 1 && (
// //                 <div className="step-content">
// //                   <div className="step-header">
// //                     <h2>What animal did you find?</h2>
// //                     <p>Select the animal type and its condition</p>
// //                   </div>

// //                   <div className="animal-selection-section">
// //                     {/* Animal Types */}
// //                     <div className="selection-group">
// //                       <label className="section-label">Animal Type</label>
// //                       <div className="animal-cards-grid">
// //                         {animalTypes.length > 0 ? (
// //                           animalTypes.map(type => (
// //                             <button
// //                               key={type.type_id}
// //                               type="button"
// //                               onClick={() => handleAnimalTypeSelect(type.type_id)}
// //                               className={`animal-card ${
// //                                 formData.animal_type_id === type.type_id ? 'selected' : ''
// //                               }`}
// //                               disabled={isSubmitting}
// //                             >
// //                               <div className="animal-emoji">
// //                                 {getAnimalEmoji(type.type_name)}
// //                               </div>
// //                               <span className="animal-name">{type.type_name}</span>
// //                             </button>
// //                           ))
// //                         ) : (
// //                           <div className="no-data-message">
// //                             <div className="no-data-icon">📋</div>
// //                             <p>No animal types available</p>
// //                           </div>
// //                         )}
// //                       </div>
// //                       {formErrors.animal_type_id && (
// //                         <div className="validation-error">
// //                           <span className="error-icon">⚠️</span>
// //                           <span>{formErrors.animal_type_id}</span>
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Animal Conditions */}
// //                     <div className="selection-group">
// //                       <label className="section-label">Animal Condition</label>
// //                       <div className="condition-options">
// //                         {animalConditions.length > 0 ? (
// //                           animalConditions.map(condition => (
// //                             <button
// //                               key={condition.condition_id}
// //                               type="button"
// //                               onClick={() => handleConditionSelect(condition.condition_id)}
// //                               className={`condition-option ${
// //                                 formData.animal_condition_id === condition.condition_id ? 'selected' : ''
// //                               }`}
// //                               disabled={isSubmitting}
// //                             >
// //                               <div className="condition-emoji">
// //                                 {getConditionIcon(condition.condition_name)}
// //                               </div>
// //                               <span>{condition.condition_name}</span>
// //                             </button>
// //                           ))
// //                         ) : (
// //                           <div className="no-data-message">
// //                             <div className="no-data-icon">📋</div>
// //                             <p>No conditions available</p>
// //                           </div>
// //                         )}
// //                       </div>
// //                       {formErrors.animal_condition_id && (
// //                         <div className="validation-error">
// //                           <span className="error-icon">⚠️</span>
// //                           <span>{formErrors.animal_condition_id}</span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Step 2: Location */}
// //               {step === 2 && (
// //                 <div className="step-content">
// //                   <div className="step-header">
// //                     <h2>Where is the animal located?</h2>
// //                     <p>Provide the exact location for rescue teams</p>
// //                   </div>

// //                   <div className="input-group">
// //                     <label className="input-label">
// //                       <span className="input-icon">📍</span>
// //                       <span>Location Address *</span>
// //                     </label>

// //                     <textarea
// //                       name="location_address"
// //                       value={formData.location_address}
// //                       onChange={handleInputChange}
// //                       placeholder="Enter street address, landmarks, or GPS coordinates..."
// //                       className="location-textarea"
// //                       rows={4}
// //                       disabled={isSubmitting}
// //                     />

// //                     {formErrors.location_address && (
// //                       <div className="validation-error">
// //                         <span className="error-icon">⚠️</span>
// //                         <span>{formErrors.location_address}</span>
// //                       </div>
// //                     )}

// //                     <div className="input-hint">
// //                       <span className="hint-icon">💡</span>
// //                       <span>Be as specific as possible for faster response</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Step 3: Details */}
// //               {step === 3 && (
// //                 <div className="step-content">
// //                   <div className="step-header">
// //                     <h2>Tell us more about the situation</h2>
// //                     <p>Describe what you observed</p>
// //                   </div>

// //                   <div className="input-group">
// //                     <label className="input-label">
// //                       <span className="input-icon">📝</span>
// //                       <span>Detailed Description *</span>
// //                     </label>

// //                     <textarea
// //                       name="description"
// //                       value={formData.description}
// //                       onChange={handleInputChange}
// //                       placeholder="Describe the animal's appearance, behavior, visible injuries, and current situation..."
// //                       className="description-textarea"
// //                       rows={6}
// //                       disabled={isSubmitting}
// //                     />

// //                     <div className="textarea-footer">
// //                       <span className={`char-count ${formData.description.length > 500 ? 'error' : ''}`}>
// //                         {formData.description.length}/500
// //                       </span>
// //                       <span className="min-chars">Minimum 10 characters</span>
// //                     </div>

// //                     {formErrors.description && (
// //                       <div className="validation-error">
// //                         <span className="error-icon">⚠️</span>
// //                         <span>{formErrors.description}</span>
// //                       </div>
// //                     )}
// //                   </div>

// //                   <div className="input-group">
// //                     <label className="input-label">
// //                       <span className="input-icon">💬</span>
// //                       <span>Additional Notes (Optional)</span>
// //                     </label>

// //                     <textarea
// //                       name="user_note"
// //                       value={formData.user_note}
// //                       onChange={handleInputChange}
// //                       placeholder="Time first seen, safety concerns, accessibility notes..."
// //                       className="notes-textarea"
// //                       rows={3}
// //                       disabled={isSubmitting}
// //                     />
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Step 4: Review */}
// //               {step === 4 && (
// //                 <div className="step-content">
// //                   <div className="step-header">
// //                     <h2>Review your report</h2>
// //                     <p>Please verify all information before submitting</p>
// //                   </div>

// //                   <div className="review-container">
// //                     {/* Animal Info */}
// //                     <div className="review-section">
// //                       <div className="review-header">
// //                         <span className="review-icon">🐾</span>
// //                         <h3>Animal Information</h3>
// //                       </div>
// //                       <div className="review-details">
// //                         <div className="detail-item">
// //                           <span className="detail-label">Animal Type:</span>
// //                           <span className="detail-value">
// //                             <span className="detail-emoji">
// //                               {getAnimalEmoji(getSelectedAnimalTypeName())}
// //                             </span>
// //                             {getSelectedAnimalTypeName()}
// //                           </span>
// //                         </div>
// //                         <div className="detail-item">
// //                           <span className="detail-label">Condition:</span>
// //                           <span className="detail-value">
// //                             <span className="detail-emoji">
// //                               {getConditionIcon(getSelectedConditionName())}
// //                             </span>
// //                             {getSelectedConditionName()}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Location */}
// //                     <div className="review-section">
// //                       <div className="review-header">
// //                         <span className="review-icon">📍</span>
// //                         <h3>Location Details</h3>
// //                       </div>
// //                       <div className="review-details full">
// //                         <p className="location-text">{formData.location_address}</p>
// //                       </div>
// //                     </div>

// //                     {/* Description */}
// //                     <div className="review-section">
// //                       <div className="review-header">
// //                         <span className="review-icon">📝</span>
// //                         <h3>Description</h3>
// //                       </div>
// //                       <div className="review-details full">
// //                         <p className="description-text">{formData.description}</p>
// //                         {formData.user_note && (
// //                           <>
// //                             <div className="note-label">Additional Notes:</div>
// //                             <p className="note-text">{formData.user_note}</p>
// //                           </>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Navigation Buttons */}
// //               <div className="form-navigation">
// //                 <div className="nav-buttons">
// //                   {step > 1 ? (
// //                     <button
// //                       type="button"
// //                       onClick={prevStep}
// //                       className="nav-button secondary"
// //                       disabled={isSubmitting}
// //                     >
// //                       {/* <span className="nav-icon">←</span> */}
// //                       <span>Back</span>
// //                     </button>
// //                   ) : (
// //                     <button
// //                       type="button"
// //                       onClick={() => navigate('/dashboard')}
// //                       className="nav-button secondary"
// //                       disabled={isSubmitting}
// //                     >
// //                       {/* <span className="nav-icon">✕</span> */}
// //                       <span>Cancel</span>
// //                     </button>
// //                   )}

// //                   {step < 4 ? (
// //                     <button
// //                       type="button"
// //                       onClick={nextStep}
// //                       className="nav-button primary"
// //                       disabled={isSubmitting || animalTypes.length === 0 || animalConditions.length === 0}
// //                     >
// //                       <span>Continue</span>
// //                       {/* <span className="nav-icon">→</span> */}
// //                     </button>
// //                   ) : (
// //                     <button
// //                       type="button"
// //                       onClick={handleSubmit}
// //                       className="nav-button submit"
// //                       disabled={isSubmitting}
// //                     >
// //                       {isSubmitting ? (
// //                         <>
// //                           <div className="button-spinner"></div>
// //                           <span>Submitting...</span>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <span className="nav-icon">📤</span>
// //                           <span>Submit Report</span>
// //                         </>
// //                       )}
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default ReportSubmission;

// // frontend/src/pages/ReportSubmission/ReportSubmission.tsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './ReportSubmission.css';
// import { useAuth } from '../../../context/AuthContext';

// // Types
// interface AnimalType {
//   type_id: number;
//   type_name: string;
// }

// interface AnimalCondition {
//   condition_id: number;
//   condition_name: string;
// }

// interface FormData {
//   animal_type_id: number;
//   animal_condition_id: number;
//   description: string;
//   location_address: string;
// }

// const API_BASE_URL = 'http://localhost:5000/api';

// const ReportSubmission: React.FC = () => {
//   const { user: currentUser, logout } = useAuth();
//   const navigate = useNavigate();

//   // State
//   const [step, setStep] = useState<number>(1);
//   const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
//   const [formData, setFormData] = useState<FormData>({
//     animal_type_id: 0,
//     animal_condition_id: 0,
//     description: '',
//     location_address: '',
//   });
  
//   const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
//   const [animalConditions, setAnimalConditions] = useState<AnimalCondition[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [success, setSuccess] = useState<string>('');
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [retryCount, setRetryCount] = useState<number>(0);

//   // Get token from localStorage
//   const getToken = () => {
//     return localStorage.getItem('token');
//   };

//   // Fetch animal data from API
//   const fetchAnimalData = useCallback(async () => {
//     const token = getToken();
//     if (!token) {
//       setError('Please login to submit a report');
//       navigate('/login');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       // Fetch animal types
//       const typesResponse = await fetch(`${API_BASE_URL}/reports/animal-types`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!typesResponse.ok) {
//         if (typesResponse.status === 401) {
//           console.error('Token expired, logging out');
//           logout();
//           navigate('/login');
//           return;
//         }
//         throw new Error(`Failed to fetch animal types: ${typesResponse.status}`);
//       }

//       const typesData = await typesResponse.json();

//       if (typesData.success) {
//         setAnimalTypes(typesData.data || []);
//         if (typesData.data && typesData.data.length > 0 && !formData.animal_type_id) {
//           setFormData(prev => ({
//             ...prev,
//             animal_type_id: typesData.data[0].type_id
//           }));
//         }
//       }

//       // Fetch animal conditions
//       const conditionsResponse = await fetch(`${API_BASE_URL}/reports/animal-conditions`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!conditionsResponse.ok) {
//         throw new Error(`Failed to fetch animal conditions: ${conditionsResponse.status}`);
//       }

//       const conditionsData = await conditionsResponse.json();

//       if (conditionsData.success) {
//         setAnimalConditions(conditionsData.data || []);
//         if (conditionsData.data && conditionsData.data.length > 0 && !formData.animal_condition_id) {
//           setFormData(prev => ({
//             ...prev,
//             animal_condition_id: conditionsData.data[0].condition_id
//           }));
//         }
//       }

//     } catch (error: any) {
//       console.error('❌ Error fetching animal data:', error);
//       setError(`Failed to load form data: ${error.message}`);
      
//       // Retry logic
//       if (retryCount < 3) {
//         setTimeout(() => {
//           setRetryCount(prev => prev + 1);
//           fetchAnimalData();
//         }, 2000);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [navigate, logout, retryCount, formData.animal_type_id, formData.animal_condition_id]);

//   // Initial load
//   useEffect(() => {
//     if (!currentUser) {
//       navigate('/login');
//       return;
//     }

//     // Only regular users can submit reports
//     if (currentUser.role?.role_name !== 'user') {
//       navigate('/dashboard');
//       return;
//     }

//     fetchAnimalData();
//   }, [currentUser, navigate, fetchAnimalData]);

//   // Update completed steps when step changes
//   useEffect(() => {
//     if (!completedSteps.includes(step) && step > 1) {
//       setCompletedSteps(prev => [...prev, step - 1]);
//     }
//   }, [step, completedSteps]);

//   // Form validation
//   const validateStep = (stepNumber: number): boolean => {
//     const errors: Record<string, string> = {};

//     switch (stepNumber) {
//       case 1:
//         if (!formData.animal_type_id) {
//           errors.animal_type_id = 'Please select an animal type';
//         }
//         if (!formData.animal_condition_id) {
//           errors.animal_condition_id = 'Please select a condition';
//         }
//         break;
      
//       case 2:
//         if (!formData.location_address.trim()) {
//           errors.location_address = 'Please provide a location';
//         } else if (formData.location_address.trim().length < 5) {
//           errors.location_address = 'Location must be at least 5 characters';
//         }
//         break;
      
//       case 3:
//         if (!formData.description.trim()) {
//           errors.description = 'Please describe the situation';
//         } else if (formData.description.trim().length < 10) {
//           errors.description = 'Description must be at least 10 characters';
//         }
//         break;
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Navigation
//   const nextStep = () => {
//     if (validateStep(step)) {
//       setStep(prev => Math.min(prev + 1, 4));
//     }
//   };

//   const prevStep = () => {
//     setStep(prev => Math.max(prev - 1, 1));
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'animal_type_id' || name === 'animal_condition_id' ? parseInt(value) : value
//     }));
//     // Clear error for this field
//     if (formErrors[name]) {
//       setFormErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleAnimalTypeSelect = (typeId: number) => {
//     setFormData(prev => ({ ...prev, animal_type_id: typeId }));
//     if (formErrors.animal_type_id) {
//       setFormErrors(prev => ({ ...prev, animal_type_id: '' }));
//     }
//   };

//   const handleConditionSelect = (conditionId: number) => {
//     setFormData(prev => ({ ...prev, animal_condition_id: conditionId }));
//     if (formErrors.animal_condition_id) {
//       setFormErrors(prev => ({ ...prev, animal_condition_id: '' }));
//     }
//   };

//   // Submit report
//   const handleSubmit = async () => {
//     if (!validateStep(step)) return;

//     setIsSubmitting(true);
//     setError('');
//     setSuccess('');

//     const token = getToken();
//     if (!token) {
//       setError('Please login to submit a report');
//       navigate('/login');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const payload = {
//         animal_type_id: formData.animal_type_id,
//         animal_condition_id: formData.animal_condition_id,
//         description: formData.description.trim(),
//         location_address: formData.location_address.trim()
//       };

//       const response = await fetch(`${API_BASE_URL}/reports/submit`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(payload)
//       });

//       let data;
//       try {
//         const responseText = await response.text();
//         data = JSON.parse(responseText);
//       } catch (parseError) {
//         console.error('Failed to parse JSON:', parseError);
//         throw new Error('Invalid server response');
//       }

//       if (!response.ok) {
//         throw new Error(data.message || `Failed to submit report (${response.status})`);
//       }

//       if (!data.success) {
//         throw new Error(data.message || 'Failed to submit report');
//       }

//       setSuccess('✅ Field report submitted! Our rangers will respond ASAP.');

//       // Mark all steps as completed
//       setCompletedSteps([1, 2, 3, 4]);

//       // Redirect to dashboard after 3 seconds
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 3000);

//     } catch (error: any) {
//       console.error('❌ Submit error:', error);
//       setError(`Failed to submit report: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Helper functions
//   const getSelectedAnimalTypeName = () => {
//     return animalTypes.find(t => t.type_id === formData.animal_type_id)?.type_name || 'Not selected';
//   };

//   const getSelectedConditionName = () => {
//     return animalConditions.find(c => c.condition_id === formData.animal_condition_id)?.condition_name || 'Not selected';
//   };

//   // Emoji icons for animals
//   const getAnimalEmoji = (typeName: string) => {
//     const type = typeName?.toLowerCase() || '';
//     if (type.includes('dog')) return '🐶';
//     if (type.includes('cat')) return '🐱';
//     if (type.includes('bird')) return '🐦';
//     if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
//     if (type.includes('hamster')) return '🐹';
//     if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
//     if (type.includes('horse')) return '🐴';
//     if (type.includes('cow')) return '🐮';
//     if (type.includes('goat')) return '🐐';
//     if (type.includes('sheep')) return '🐑';
//     if (type.includes('fish')) return '🐠';
//     if (type.includes('snake')) return '🐍';
//     if (type.includes('mouse') || type.includes('rat')) return '🐭';
//     if (type.includes('monkey')) return '🐒';
//     if (type.includes('pig')) return '🐷';
//     if (type.includes('chicken')) return '🐔';
//     if (type.includes('duck')) return '🦆';
//     return '🐾';
//   };

//   const getConditionIcon = (condition: string) => {
//     const cond = condition.toLowerCase();
//     if (cond.includes('critical') || cond.includes('emergency')) return '🆘';
//     if (cond.includes('severe') || cond.includes('serious')) return '⚠️';
//     if (cond.includes('moderate') || cond.includes('injured')) return '🩹';
//     if (cond.includes('mild') || cond.includes('sick')) return '🤒';
//     if (cond.includes('abandoned') || cond.includes('lost')) return '💔';
//     if (cond.includes('healthy') || cond.includes('safe')) return '✅';
//     return 'ℹ️';
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="report-submission-container">
//         <div className="report-loading-screen">
//           <div className="loader-animation">
//             <div className="loader-circle"></div>
//             <div className="loader-text">🛰️ Initializing Field Report...</div>
//             <button 
//               onClick={fetchAnimalData} 
//               className="retry-button"
//             >
//               Retry Connection
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="report-submission-container">
//       {/* Header */}
//       <div className="report-header">
//         <h1 className="report-title">📋 File Field Report</h1>
//         <p className="report-subtitle">
//           Report animals in distress. Your information helps our rangers respond effectively.
//         </p>
//       </div>

//       {/* Progress Steps */}
//       <div className="step-progress">
//         {[1, 2, 3, 4].map((stepNum) => (
//           <div key={stepNum} className={`step-item ${step >= stepNum ? 'active' : ''}`}>
//             <div className="step-number">
//               {completedSteps.includes(stepNum) && stepNum !== step ? '✓' : stepNum}
//             </div>
//             <div className="step-label">
//               {stepNum === 1 ? 'Animal' : 
//                stepNum === 2 ? 'Location' : 
//                stepNum === 3 ? 'Details' : 'Review'}
//             </div>
//             {stepNum < 4 && <div className="step-connector"></div>}
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="report-content">
//         <div className="report-card">
//           {success ? (
//             <div className="success-state">
//               <div className="success-icon">✅</div>
//               <h2 className="success-title">Report Submitted Successfully!</h2>
//               <p className="success-message">{success}</p>
//               <div className="redirect-indicator">
//                 <div className="loading-dots">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//                 <p>Redirecting to dashboard...</p>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* Error Display */}
//               {error && (
//                 <div className="error-alert">
//                   <div className="error-icon">❌</div>
//                   <div className="error-content">
//                     <strong>Error</strong>
//                     <p>{error}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Step Content */}
//               <div className="step-content">
//                 {/* Step 1: Animal Selection */}
//                 {step === 1 && (
//                   <div className="step-section">
//                     <div className="step-header">
//                       <h2>What animal did you find?</h2>
//                       <p>Select the animal type and its condition</p>
//                     </div>

//                     <div className="selection-section">
//                       {/* Animal Types */}
//                       <div className="form-group">
//                         <label className="form-label">Animal Type *</label>
//                         <div className="animal-grid">
//                           {animalTypes.map(type => (
//                             <button
//                               key={type.type_id}
//                               type="button"
//                               onClick={() => handleAnimalTypeSelect(type.type_id)}
//                               className={`animal-card ${formData.animal_type_id === type.type_id ? 'selected' : ''}`}
//                               disabled={isSubmitting}
//                             >
//                               <div className="animal-emoji">
//                                 {getAnimalEmoji(type.type_name)}
//                               </div>
//                               <span className="animal-name">{type.type_name}</span>
//                             </button>
//                           ))}
//                         </div>
//                         {formErrors.animal_type_id && (
//                           <div className="validation-error">{formErrors.animal_type_id}</div>
//                         )}
//                       </div>

//                       {/* Animal Conditions */}
//                       <div className="form-group">
//                         <label className="form-label">Animal Condition *</label>
//                         <div className="condition-grid">
//                           {animalConditions.map(condition => (
//                             <button
//                               key={condition.condition_id}
//                               type="button"
//                               onClick={() => handleConditionSelect(condition.condition_id)}
//                               className={`condition-card ${formData.animal_condition_id === condition.condition_id ? 'selected' : ''}`}
//                               disabled={isSubmitting}
//                             >
//                               <div className="condition-icon">
//                                 {getConditionIcon(condition.condition_name)}
//                               </div>
//                               <span>{condition.condition_name}</span>
//                             </button>
//                           ))}
//                         </div>
//                         {formErrors.animal_condition_id && (
//                           <div className="validation-error">{formErrors.animal_condition_id}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 2: Location */}
//                 {step === 2 && (
//                   <div className="step-section">
//                     <div className="step-header">
//                       <h2>Where is the animal located?</h2>
//                       <p>Provide the exact location for rescue teams</p>
//                     </div>

//                     <div className="form-group">
//                       <label className="form-label">Location Address *</label>
//                       <textarea
//                         name="location_address"
//                         value={formData.location_address}
//                         onChange={handleInputChange}
//                         placeholder="Enter street address, landmarks, or GPS coordinates..."
//                         className="location-input"
//                         rows={4}
//                         disabled={isSubmitting}
//                       />
//                       {formErrors.location_address && (
//                         <div className="validation-error">{formErrors.location_address}</div>
//                       )}
//                       <div className="input-hint">
//                         💡 Be as specific as possible for faster response
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 3: Details */}
//                 {step === 3 && (
//                   <div className="step-section">
//                     <div className="step-header">
//                       <h2>Tell us more about the situation</h2>
//                       <p>Describe what you observed</p>
//                     </div>

//                     <div className="form-group">
//                       <label className="form-label">Detailed Description *</label>
//                       <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         placeholder="Describe the animal's appearance, behavior, visible injuries, and current situation..."
//                         className="description-input"
//                         rows={6}
//                         disabled={isSubmitting}
//                       />
//                       <div className="char-counter">
//                         <span className={`char-count ${formData.description.length > 500 ? 'error' : ''}`}>
//                           {formData.description.length}/500
//                         </span>
//                         <span className="min-chars">Minimum 10 characters</span>
//                       </div>
//                       {formErrors.description && (
//                         <div className="validation-error">{formErrors.description}</div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 4: Review */}
//                 {step === 4 && (
//                   <div className="step-section">
//                     <div className="step-header">
//                       <h2>Review your report</h2>
//                       <p>Please verify all information before submitting</p>
//                     </div>

//                     <div className="review-container">
//                       {/* Animal Info */}
//                       <div className="review-section">
//                         <h3 className="review-title">
//                           <span className="review-icon">🐾</span>
//                           Animal Information
//                         </h3>
//                         <div className="review-details">
//                           <div className="review-item">
//                             <span className="review-label">Animal Type:</span>
//                             <span className="review-value">
//                               <span className="animal-emoji">
//                                 {getAnimalEmoji(getSelectedAnimalTypeName())}
//                               </span>
//                               {getSelectedAnimalTypeName()}
//                             </span>
//                           </div>
//                           <div className="review-item">
//                             <span className="review-label">Condition:</span>
//                             <span className="review-value">
//                               <span className="condition-icon">
//                                 {getConditionIcon(getSelectedConditionName())}
//                               </span>
//                               {getSelectedConditionName()}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Location */}
//                       <div className="review-section">
//                         <h3 className="review-title">
//                           <span className="review-icon">📍</span>
//                           Location Details
//                         </h3>
//                         <div className="review-text">
//                           {formData.location_address}
//                         </div>
//                       </div>

//                       {/* Description */}
//                       <div className="review-section">
//                         <h3 className="review-title">
//                           <span className="review-icon">📝</span>
//                           Description
//                         </h3>
//                         <div className="review-text">
//                           {formData.description}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="form-navigation">
//                 <div className="nav-buttons">
//                   {step > 1 ? (
//                     <button
//                       type="button"
//                       onClick={prevStep}
//                       className="nav-button secondary"
//                       disabled={isSubmitting}
//                     >
//                       ← Back
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={() => navigate('/dashboard')}
//                       className="nav-button secondary"
//                       disabled={isSubmitting}
//                     >
//                       ✕ Cancel
//                     </button>
//                   )}

//                   {step < 4 ? (
//                     <button
//                       type="button"
//                       onClick={nextStep}
//                       className="nav-button primary"
//                       disabled={isSubmitting || animalTypes.length === 0 || animalConditions.length === 0}
//                     >
//                       Continue →
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={handleSubmit}
//                       className="nav-button submit"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="button-spinner"></div>
//                           Submitting...
//                         </>
//                       ) : (
//                         '📤 Submit Report'
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportSubmission;

// frontend/src/pages/ReportSubmission/ReportSubmission.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ReportSubmission.css';
import { useAuth } from '../../../context/AuthContext';

// Types
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
}

const API_BASE_URL = 'http://localhost:5000/api';

const ReportSubmission: React.FC = () => {
  const { user: currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // State
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
  const [retryCount, setRetryCount] = useState<number>(0);

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Fetch animal data from API
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
      // Fetch animal types
      const typesResponse = await fetch(`${API_BASE_URL}/reports/animal-types`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!typesResponse.ok) {
        if (typesResponse.status === 401) {
          console.error('Token expired, logging out');
          logout();
          navigate('/login');
          return;
        }
        throw new Error(`Failed to fetch animal types: ${typesResponse.status}`);
      }

      const typesData = await typesResponse.json();

      if (typesData.success) {
        setAnimalTypes(typesData.data || []);
        if (typesData.data && typesData.data.length > 0 && !formData.animal_type_id) {
          setFormData(prev => ({
            ...prev,
            animal_type_id: typesData.data[0].type_id
          }));
        }
      }

      // Fetch animal conditions
      const conditionsResponse = await fetch(`${API_BASE_URL}/reports/animal-conditions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!conditionsResponse.ok) {
        throw new Error(`Failed to fetch animal conditions: ${conditionsResponse.status}`);
      }

      const conditionsData = await conditionsResponse.json();

      if (conditionsData.success) {
        setAnimalConditions(conditionsData.data || []);
        if (conditionsData.data && conditionsData.data.length > 0 && !formData.animal_condition_id) {
          setFormData(prev => ({
            ...prev,
            animal_condition_id: conditionsData.data[0].condition_id
          }));
        }
      }

    } catch (error: any) {
      console.error('❌ Error fetching animal data:', error);
      setError(`Failed to load form data: ${error.message}`);
      
      // Retry logic
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchAnimalData();
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate, logout, retryCount, formData.animal_type_id, formData.animal_condition_id]);

  // Initial load
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Only regular users can submit reports
    if (currentUser.role?.role_name !== 'user') {
      navigate('/dashboard');
      return;
    }

    fetchAnimalData();
  }, [currentUser, navigate, fetchAnimalData]);

  // Update completed steps when step changes
  useEffect(() => {
    if (!completedSteps.includes(step) && step > 1) {
      setCompletedSteps(prev => [...prev, step - 1]);
    }
  }, [step, completedSteps]);

  // Form validation
  const validateStep = (stepNumber: number): boolean => {
    const errors: Record<string, string> = {};

    switch (stepNumber) {
      case 1:
        if (!formData.animal_type_id) {
          errors.animal_type_id = 'Please select an animal type';
        }
        if (!formData.animal_condition_id) {
          errors.animal_condition_id = 'Please select a condition';
        }
        break;
      
      case 2:
        if (!formData.location_address.trim()) {
          errors.location_address = 'Please provide a location';
        } else if (formData.location_address.trim().length < 5) {
          errors.location_address = 'Location must be at least 5 characters';
        }
        break;
      
      case 3:
        if (!formData.description.trim()) {
          errors.description = 'Please describe the situation';
        } else if (formData.description.trim().length < 10) {
          errors.description = 'Description must be at least 10 characters';
        }
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Navigation
  const nextStep = () => {
    if (validateStep(step)) {
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
    // Clear error for this field
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

  const handleConditionSelect = (conditionId: number) => {
    setFormData(prev => ({ ...prev, animal_condition_id: conditionId }));
    if (formErrors.animal_condition_id) {
      setFormErrors(prev => ({ ...prev, animal_condition_id: '' }));
    }
  };

  // Submit report
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
        location_address: formData.location_address.trim()
      };

      const response = await fetch(`${API_BASE_URL}/reports/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      let data;
      try {
        const responseText = await response.text();
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error('Invalid server response');
      }

      if (!response.ok) {
        throw new Error(data.message || `Failed to submit report (${response.status})`);
      }

      if (!data.success) {
        throw new Error(data.message || 'Failed to submit report');
      }

      setSuccess('✅ Field report submitted! Our rangers will respond ASAP.');

      // Mark all steps as completed
      setCompletedSteps([1, 2, 3, 4]);

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

    } catch (error: any) {
      console.error('❌ Submit error:', error);
      setError(`Failed to submit report: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions
  const getSelectedAnimalTypeName = () => {
    return animalTypes.find(t => t.type_id === formData.animal_type_id)?.type_name || 'Not selected';
  };

  const getSelectedConditionName = () => {
    return animalConditions.find(c => c.condition_id === formData.animal_condition_id)?.condition_name || 'Not selected';
  };

  // Emoji icons for animals
  const getAnimalEmoji = (typeName: string) => {
    const type = typeName?.toLowerCase() || '';
    if (type.includes('dog')) return '🐶';
    if (type.includes('cat')) return '🐱';
    if (type.includes('bird')) return '🐦';
    if (type.includes('rabbit') || type.includes('bunny')) return '🐰';
    if (type.includes('hamster')) return '🐹';
    if (type.includes('turtle') || type.includes('tortoise')) return '🐢';
    if (type.includes('horse')) return '🐴';
    if (type.includes('cow')) return '🐮';
    if (type.includes('goat')) return '🐐';
    if (type.includes('sheep')) return '🐑';
    if (type.includes('fish')) return '🐠';
    if (type.includes('snake')) return '🐍';
    if (type.includes('mouse') || type.includes('rat')) return '🐭';
    if (type.includes('monkey')) return '🐒';
    if (type.includes('pig')) return '🐷';
    if (type.includes('chicken')) return '🐔';
    if (type.includes('duck')) return '🦆';
    return '🐾';
  };

  const getConditionIcon = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes('critical') || cond.includes('emergency')) return '🆘';
    if (cond.includes('severe') || cond.includes('serious')) return '⚠️';
    if (cond.includes('moderate') || cond.includes('injured')) return '🩹';
    if (cond.includes('mild') || cond.includes('sick')) return '🤒';
    if (cond.includes('abandoned') || cond.includes('lost')) return '💔';
    if (cond.includes('healthy') || cond.includes('safe')) return '✅';
    return 'ℹ️';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="report-submission-container">
        <div className="report-loading-screen">
          <div className="loader-animation">
            <div className="loader-circle"></div>
            <div className="loader-text">🛰️ Initializing Field Report...</div>
            <button 
              onClick={fetchAnimalData} 
              className="retry-button"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-submission-container">
      {/* Header */}
      <div className="report-header">
        <h1 className="report-title">📋 File Field Report</h1>
        <p className="report-subtitle">
          Report animals in distress. Your information helps our rangers respond effectively.
        </p>
      </div>

      {/* Progress Steps - FIXED STRUCTURE */}
      <div className="step-progress">
        {[1, 2, 3, 4].map((stepNum, index) => (
          <React.Fragment key={stepNum}>
            <div className={`step-item ${step >= stepNum ? 'active' : ''}`}>
              <div className="step-number">
                {completedSteps.includes(stepNum) && stepNum !== step ? '✓' : stepNum}
              </div>
              <div className="step-label">
                {stepNum === 1 ? 'Animal' : 
                 stepNum === 2 ? 'Location' : 
                 stepNum === 3 ? 'Details' : 'Review'}
              </div>
            </div>
            {index < 3 && <div className="step-connector"></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Main Content */}
      <div className="report-content">
        <div className="report-card">
          {success ? (
            <div className="success-state">
              <div className="success-icon">✅</div>
              <h2 className="success-title">Report Submitted Successfully!</h2>
              <p className="success-message">{success}</p>
              <div className="redirect-indicator">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>Redirecting to dashboard...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Error Display */}
              {error && (
                <div className="error-alert">
                  <div className="error-icon">❌</div>
                  <div className="error-content">
                    <strong>Error</strong>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {/* Step Content */}
              <div className="step-content">
                {/* Step 1: Animal Selection */}
                {step === 1 && (
                  <div className="step-section">
                    <div className="step-header">
                      <h2>What animal did you find?</h2>
                      <p>Select the animal type and its condition</p>
                    </div>

                    <div className="selection-section">
                      {/* Animal Types */}
                      <div className="form-group">
                        <label className="form-label">Animal Type *</label>
                        <div className="animal-grid">
                          {animalTypes.map(type => (
                            <button
                              key={type.type_id}
                              type="button"
                              onClick={() => handleAnimalTypeSelect(type.type_id)}
                              className={`animal-card ${formData.animal_type_id === type.type_id ? 'selected' : ''}`}
                              disabled={isSubmitting}
                            >
                              <div className="animal-emoji">
                                {getAnimalEmoji(type.type_name)}
                              </div>
                              <span className="animal-name">{type.type_name}</span>
                            </button>
                          ))}
                        </div>
                        {formErrors.animal_type_id && (
                          <div className="validation-error">{formErrors.animal_type_id}</div>
                        )}
                      </div>

                      {/* Animal Conditions */}
                      <div className="form-group">
                        <label className="form-label">Animal Condition *</label>
                        <div className="condition-grid">
                          {animalConditions.map(condition => (
                            <button
                              key={condition.condition_id}
                              type="button"
                              onClick={() => handleConditionSelect(condition.condition_id)}
                              className={`condition-card ${formData.animal_condition_id === condition.condition_id ? 'selected' : ''}`}
                              disabled={isSubmitting}
                            >
                              <div className="condition-icon">
                                {getConditionIcon(condition.condition_name)}
                              </div>
                              <span>{condition.condition_name}</span>
                            </button>
                          ))}
                        </div>
                        {formErrors.animal_condition_id && (
                          <div className="validation-error">{formErrors.animal_condition_id}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                  <div className="step-section">
                    <div className="step-header">
                      <h2>Where is the animal located?</h2>
                      <p>Provide the exact location for rescue teams</p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Location Address *</label>
                      <textarea
                        name="location_address"
                        value={formData.location_address}
                        onChange={handleInputChange}
                        placeholder="Enter street address, landmarks, or GPS coordinates..."
                        className="location-input"
                        rows={4}
                        disabled={isSubmitting}
                      />
                      {formErrors.location_address && (
                        <div className="validation-error">{formErrors.location_address}</div>
                      )}
                      <div className="input-hint">
                        💡 Be as specific as possible for faster response
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <div className="step-section">
                    <div className="step-header">
                      <h2>Tell us more about the situation</h2>
                      <p>Describe what you observed</p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Detailed Description *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the animal's appearance, behavior, visible injuries, and current situation..."
                        className="description-input"
                        rows={6}
                        disabled={isSubmitting}
                      />
                      <div className="char-counter">
                        <span className={`char-count ${formData.description.length > 500 ? 'error' : ''}`}>
                          {formData.description.length}/500
                        </span>
                        <span className="min-chars">Minimum 10 characters</span>
                      </div>
                      {formErrors.description && (
                        <div className="validation-error">{formErrors.description}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <div className="step-section">
                    <div className="step-header">
                      <h2>Review your report</h2>
                      <p>Please verify all information before submitting</p>
                    </div>

                    <div className="review-container">
                      {/* Animal Info */}
                      <div className="review-section">
                        <h3 className="review-title">
                          <span className="review-icon">🐾</span>
                          Animal Information
                        </h3>
                        <div className="review-details">
                          <div className="review-item">
                            <span className="review-label">Animal Type:</span>
                            <span className="review-value">
                              <span className="animal-emoji">
                                {getAnimalEmoji(getSelectedAnimalTypeName())}
                              </span>
                              {getSelectedAnimalTypeName()}
                            </span>
                          </div>
                          <div className="review-item">
                            <span className="review-label">Condition:</span>
                            <span className="review-value">
                              <span className="condition-icon">
                                {getConditionIcon(getSelectedConditionName())}
                              </span>
                              {getSelectedConditionName()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="review-section">
                        <h3 className="review-title">
                          <span className="review-icon">📍</span>
                          Location Details
                        </h3>
                        <div className="review-text">
                          {formData.location_address}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="review-section">
                        <h3 className="review-title">
                          <span className="review-icon">📝</span>
                          Description
                        </h3>
                        <div className="review-text">
                          {formData.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="form-navigation">
                <div className="nav-buttons">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="nav-button secondary"
                      disabled={isSubmitting}
                    >
                      ← Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="nav-button secondary"
                      disabled={isSubmitting}
                    >
                      ✕ Cancel
                    </button>
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="nav-button primary"
                      disabled={isSubmitting || animalTypes.length === 0 || animalConditions.length === 0}
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="nav-button submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="button-spinner"></div>
                          Submitting...
                        </>
                      ) : (
                        '📤 Submit Report'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportSubmission;