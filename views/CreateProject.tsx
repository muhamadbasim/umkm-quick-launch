import React, { useState, useRef, useEffect } from 'react';
import { Project, WizardStep, AIAnalysisResult } from '../types';
import { analyzeImageForLandingPage } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';
import { ProgressBar, UploadStep, AnalyzingStep, ReviewStep, PublishingStep } from '../components/wizard';

interface CreateProjectProps {
  initialProject?: Project;
  onSuccess: (project: Project) => void;
  onCancel: () => void;
}

type PublishStatus = 'idle' | 'generating' | 'pushing' | 'deploying' | 'completed';

const CreateProject: React.FC<CreateProjectProps> = ({ initialProject, onSuccess, onCancel }) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<WizardStep>('upload');
  const [image, setImage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [editedData, setEditedData] = useState<AIAnalysisResult | null>(null);

  // Publishing State
  const [publishStatus, setPublishStatus] = useState<PublishStatus>('idle');
  const [finalProject, setFinalProject] = useState<Project | null>(null);

  // History State for Undo/Redo
  const [history, setHistory] = useState<AIAnalysisResult[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // -- Initialize for Editing --
  useEffect(() => {
    if (initialProject) {
      setImage(initialProject.imageUrl);
      setPhoneNumber(initialProject.phone);
      setLocation(initialProject.location || '');

      const initialData: AIAnalysisResult = {
        businessNameSuggestion: initialProject.businessName,
        headline: initialProject.headline,
        story: initialProject.story,
        suggestedTemplate: initialProject.templateId
      };

      setEditedData(initialData);
      setHistory([initialData]);
      setHistoryIndex(0);

      // Jump straight to review step
      setStep('review');
    }
  }, [initialProject]);

  // -- Step 1: Handle Image Upload --
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // -- Step 2: Trigger AI Analysis --
  const handleAnalyze = async () => {
    if (!image) return;
    setStep('analyzing');

    try {
      // Pass the current language to the AI service
      const result = await analyzeImageForLandingPage(image, language);
      setEditedData(result);

      // If AI suggested a location, use it
      if (result.locationSuggestion && !location) {
        setLocation(result.locationSuggestion);
      }

      // Initialize History
      setHistory([result]);
      setHistoryIndex(0);

      setStep('review');
    } catch (error) {
      alert(t.createProject.failedAnalyze);
      setStep('upload');
    }
  };

  // -- Undo/Redo Logic --
  const addToHistory = (newData: AIAnalysisResult) => {
    if (historyIndex === -1) return;

    // Simple deep compare to avoid duplicate history entries
    if (JSON.stringify(history[historyIndex]) === JSON.stringify(newData)) return;

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setEditedData(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setEditedData(history[newIndex]);
    }
  };

  // -- Step 3: Publish Simulation --
  const handlePublish = () => {
    if (!editedData || !image) return;

    setStep('publishing');
    setPublishStatus('generating');

    // Simulate Step 1: Generating Code
    setTimeout(() => {
      setPublishStatus('pushing');

      // Simulate Step 2: Pushing to GitHub
      setTimeout(() => {
        setPublishStatus('deploying');

        // Simulate Step 3: Deploying
        setTimeout(() => {
          setPublishStatus('completed');

          // Create Project Object
          const newProject: Project = {
            // If editing, keep the original ID, otherwise generate new
            id: initialProject ? initialProject.id : Date.now().toString(),
            businessName: editedData.businessNameSuggestion,
            imageUrl: image,
            headline: editedData.headline,
            story: editedData.story,
            phone: phoneNumber,
            location: location,
            templateId: editedData.suggestedTemplate,
            status: 'published',
            publishedUrl: initialProject?.publishedUrl || `https://${editedData.businessNameSuggestion.toLowerCase().replace(/[^a-z0-9]/g, '-')}.github.io`,
            createdAt: initialProject ? initialProject.createdAt : Date.now(),
          };

          setFinalProject(newProject);
        }, 3000);
      }, 2500);
    }, 2000);
  };

  // ------------------------------------
  // VIEW: Upload
  // ------------------------------------
  if (step === 'upload') {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-800 transition-colors">
        <ProgressBar currentStep={step} />
        <UploadStep
          image={image}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
          onAnalyze={handleAnalyze}
          onCancel={onCancel}
          t={{
            uploadTitle: t.createProject.uploadTitle,
            uploadSubtitle: t.createProject.uploadSubtitle,
            changePhoto: t.createProject.changePhoto,
            tapToTake: t.createProject.tapToTake,
            cancelBtn: t.createProject.cancelBtn,
            analyzeBtn: t.createProject.analyzeBtn,
          }}
        />
      </div>
    );
  }

  // ------------------------------------
  // VIEW: Analyzing
  // ------------------------------------
  if (step === 'analyzing') {
    return (
      <AnalyzingStep
        t={{
          analyzingTitle: t.createProject.analyzingTitle,
          analyzingSteps: t.createProject.analyzingSteps,
        }}
      />
    );
  }

  // ------------------------------------
  // VIEW: Review & Edit
  // ------------------------------------
  if (step === 'review' && editedData && image) {
    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 transition-colors">
        <ProgressBar currentStep={step} />
        <ReviewStep
          editedData={editedData}
          image={image}
          phoneNumber={phoneNumber}
          location={location}
          historyIndex={historyIndex}
          historyLength={history.length}
          onDataChange={setEditedData}
          onAddToHistory={addToHistory}
          onPhoneChange={setPhoneNumber}
          onLocationChange={setLocation}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onPublish={handlePublish}
          t={{
            editContent: t.createProject.editContent,
            businessName: t.createProject.businessName,
            headline: t.createProject.headline,
            story: t.createProject.story,
            whatsapp: t.createProject.whatsapp,
            whatsappHint: t.createProject.whatsappHint,
            location: t.createProject.location,
            locationHint: t.createProject.locationHint,
            detectLocation: t.createProject.detectLocation,
            detecting: t.createProject.detecting,
            designStyle: t.createProject.designStyle,
            livePreview: t.createProject.livePreview,
            updatesInstantly: t.createProject.updatesInstantly,
            launchBtn: t.createProject.launchBtn,
            enterWhatsappBtn: t.createProject.enterWhatsappBtn,
          }}
        />
      </div>
    );
  }

  // ------------------------------------
  // VIEW: Publishing
  // ------------------------------------
  if (step === 'publishing') {
    return (
      <PublishingStep
        publishStatus={publishStatus}
        finalProject={finalProject}
        onSuccess={onSuccess}
        t={{
          successTitle: t.createProject.successTitle,
          successSubtitle: t.createProject.successSubtitle,
          launchingTitle: t.createProject.launchingTitle,
          launchingSubtitle: t.createProject.launchingSubtitle,
          step1: t.createProject.step1,
          step1Desc: t.createProject.step1Desc,
          step2: t.createProject.step2,
          step2Desc: t.createProject.step2Desc,
          step3: t.createProject.step3,
          step3Desc: t.createProject.step3Desc,
          backDashboard: t.createProject.backDashboard,
          viewSite: t.createProject.viewSite,
        }}
      />
    );
  }

  return null;
};

export default CreateProject;