import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import { useUser } from "@clerk/react";
import { useAppContext } from "../context/AppContext";
import { ArrowLeft, FileText } from "lucide-react";

import {
  SubmitPromptHeader,
  PromptBasicInfo,
  PromptContentEditor,
  PromptMetadataSection,
  PromptExampleSection,
  PromptSettings,
  PromptPreview,
  SubmitPromptActions,
} from "../components/submitPrompt";

import catOne from "../assets/optimized/pic16.webp";
import dogOne from "../assets/optimized/pic17.webp";
import catTwo from "../assets/optimized/pic19.webp";
import dogTwo from "../assets/optimized/pic18.webp";

import { processPreviewImage, formatFileSize } from "../utils/imageProcessing";
import {
  savePreviewImage,
  getPreviewImageBlob,
  deletePreviewImage,
} from "../services/previewImageStore";

const categories = [
  "Coding",
  "Writing",
  "Marketing",
  "Business",
  "Design",
  "Productivity",
  "Research",
  "Education",
];

const models = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Midjourney",
  "Stable Diffusion",
  "Other",
];

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function SubmitPrompt() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoaded, isSignedIn, user } = useUser();
  const { prompts, addPrompt, updatePrompt } = useAppContext();

  const isEditMode = Boolean(id);

  const existingPrompt = useMemo(() => {
    if (!isEditMode) return null;

    return (
      prompts.find((prompt) => prompt.id === id) || null
    );
  }, [id, isEditMode, prompts]);

  // -------------------------------------------------------
  // Form State
  // -------------------------------------------------------

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [model, setModel] = useState("");
  const [visibility, setVisibility] = useState("public");

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [exampleDescription, setExampleDescription] = useState("");
  const [exampleInput, setExampleInput] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");

  const [previewImage, setPreviewImage] = useState(null);
  const previewImageUrlRef = useRef("");
  const [existingImageState, setExistingImageState] = useState({ key: "", url: "" });
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [imageError, setImageError] = useState("");

  const [showPreview, setShowPreview] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // -------------------------------------------------------
  // Populate form when editing
  // -------------------------------------------------------

  useEffect(() => {
    if (!existingPrompt) return;

    const preview = existingPrompt.examplePreview || {};

    setTitle(existingPrompt.title || "");
    setDescription(existingPrompt.description || "");
    setContent(existingPrompt.content || "");
    setCategory(existingPrompt.category || "");
    setModel(existingPrompt.model || "");
    setVisibility(existingPrompt.visibility || "public");
    setTags(existingPrompt.tags || []);

    setExampleDescription(preview.description || "");
    setExampleInput(preview.input || existingPrompt.exampleInput || "");
    setExampleOutput(preview.output || existingPrompt.exampleOutput || "");

    setPreviewImage(null);
    setRemoveExistingImage(false);
    setImageError("");
  }, [existingPrompt]);

  // Load the stored image when editing an existing prompt.
  const existingImageKey = existingPrompt?.examplePreview?.hasImage
    ? `${existingPrompt.id}:${existingPrompt.examplePreview.imageUpdatedAt || ""}`
    : "";

  useEffect(() => {
    if (!existingImageKey) {
      return undefined;
    }

    let cancelled = false;
    let objectUrl = "";

    getPreviewImageBlob(existingPrompt.id)
      .then((blob) => {
        if (cancelled || !blob) return;
        objectUrl = URL.createObjectURL(blob);
        setExistingImageState({ key: existingImageKey, url: objectUrl });
      })
      .catch(() => {
        // Leave the empty state in place; the upload control still works.
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [existingImageKey, existingPrompt?.id]);

  const existingPreviewUrl = existingImageState.key === existingImageKey
    ? existingImageState.url
    : "";

  // Revoke the local preview URL on unmount. Replacement/removal revoke it
  // immediately so the URL is never left dangling while the form stays open.
  useEffect(() => () => {
    if (previewImageUrlRef.current) {
      URL.revokeObjectURL(previewImageUrlRef.current);
      previewImageUrlRef.current = "";
    }
  }, []);

  // -------------------------------------------------------
  // Example image handling
  // -------------------------------------------------------

  async function handlePreviewImageSelect(file) {
    setImageError("");
    setIsProcessingImage(true);

    try {
      const processed = await processPreviewImage(file);
      const url = URL.createObjectURL(processed.blob);

      if (previewImageUrlRef.current) {
        URL.revokeObjectURL(previewImageUrlRef.current);
      }
      previewImageUrlRef.current = url;

      setPreviewImage({
        ...processed,
        name: processed.originalName || file.name,
        size: processed.blob.size,
        url,
      });
      setRemoveExistingImage(false);
    } catch (error) {
      setImageError(
        error?.message || "Could not process this image. Please try another one."
      );
    } finally {
      setIsProcessingImage(false);
    }
  }

  function handlePreviewImageRemove() {
    if (previewImage) {
      // Discard the replacement and fall back to the saved image, if any.
      if (previewImageUrlRef.current) {
        URL.revokeObjectURL(previewImageUrlRef.current);
        previewImageUrlRef.current = "";
      }
      setPreviewImage(null);
    } else {
      // Remove the image that is already saved on the prompt.
      setRemoveExistingImage(true);
    }

    setImageError("");
  }

  const displayedImageUrl = previewImage?.url
    || (removeExistingImage ? "" : existingPreviewUrl);

  const displayedImageName = previewImage?.name
    || (!removeExistingImage && existingPreviewUrl ? "Current example image" : "");

  const displayedImageSize = previewImage ? formatFileSize(previewImage.size) : "";

  // -------------------------------------------------------
  // Tag Handling
  // -------------------------------------------------------

  function addTag() {
    const cleanedTag = tagInput.trim();

    if (!cleanedTag) return;

    if (tags.length >= 8) {
      return;
    }

    if (
      tags.some(
        (tag) =>
          tag.toLowerCase() === cleanedTag.toLowerCase()
      )
    ) {
      setTagInput("");
      return;
    }

    setTags((prev) => [...prev, cleanedTag]);
    setTagInput("");
  }

  function removeTag(tagToRemove) {
    setTags((prev) =>
      prev.filter((tag) => tag !== tagToRemove)
    );
  }

  function handleTagKeyDown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }

    if (
      event.key === "Backspace" &&
      !tagInput &&
      tags.length > 0
    ) {
      setTags((prev) => prev.slice(0, -1));
    }
  }

  // -------------------------------------------------------
  // Validation
  // -------------------------------------------------------

  function validateForm() {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title =
        "Give your prompt a clear title.";
    }

    if (!description.trim()) {
      newErrors.description =
        "Explain what problem this prompt solves.";
    }

    if (!content.trim()) {
      newErrors.content =
        "Your prompt cannot be empty.";
    }

    if (!category) {
      newErrors.category =
        "Choose a category.";
    }

    if (tags.length === 0) {
      newErrors.tags =
        "Add at least one tag.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // -------------------------------------------------------
  // Save Prompt
  // -------------------------------------------------------

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isProcessingImage) {
      setImageError("Please wait for the image to finish processing.");
      return;
    }

    setIsSaving(true);
    setImageError("");

    const promptId = isEditMode
      ? id
      : `prompt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    try {
      const existingPreview = existingPrompt?.examplePreview || {};
      let imageMeta = { hasImage: false };

      if (previewImage) {
        await savePreviewImage(promptId, previewImage.blob);

        imageMeta = {
          hasImage: true,
          imageWidth: previewImage.width,
          imageHeight: previewImage.height,
          imageUpdatedAt: Date.now(),
        };
      } else if (isEditMode && existingPreview.hasImage) {
        if (removeExistingImage) {
          await deletePreviewImage(promptId);
          imageMeta = { hasImage: false };
        } else {
          imageMeta = {
            hasImage: true,
            imageWidth: existingPreview.imageWidth,
            imageHeight: existingPreview.imageHeight,
            imageUpdatedAt: existingPreview.imageUpdatedAt,
          };
        }
      }

      const trimmedDescription = exampleDescription.trim();
      const trimmedInput = exampleInput.trim();
      const trimmedOutput = exampleOutput.trim();

      const hasImage = Boolean(imageMeta.hasImage);
      const hasText = Boolean(trimmedDescription || trimmedInput || trimmedOutput);

      const examplePreview = (hasImage || hasText)
        ? {
            type: hasImage && trimmedOutput ? "both" : hasImage ? "image" : "text",
            hasImage,
            ...(hasImage
              ? {
                  imageWidth: imageMeta.imageWidth,
                  imageHeight: imageMeta.imageHeight,
                  imageUpdatedAt: imageMeta.imageUpdatedAt,
                }
              : {}),
            ...(trimmedDescription ? { description: trimmedDescription } : {}),
            ...(trimmedInput ? { input: trimmedInput } : {}),
            ...(trimmedOutput ? { output: trimmedOutput } : {}),
          }
        : undefined;

      const promptData = {
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
        category,
        model,
        tags,
        visibility,
        examplePreview,
      };

      // Simulate async operation
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      if (isEditMode) {
        updatePrompt(id, promptData);
        setIsSaving(false);
        navigate(`/prompt/${id}`);
      } else {
        addPrompt({ ...promptData, id: promptId });
        setIsSaving(false);
        navigate("/profile");
      }
    } catch (error) {
      setImageError(
        error?.message || "Could not save the example image. Please try again."
      );
      setIsSaving(false);
    }
  }

  // =========================================================
  // AUTH / GUARDS
  // =========================================================

  // Auth check - redirect if not signed in
  if (isLoaded && !isSignedIn) {
    return <Navigate to="/" />;
  }

  if (!isLoaded || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#D4D1C9] border-t-[#252525]" />
      </div>
    );
  }

  // -------------------------------------------------------
  // Missing prompt when editing
  // -------------------------------------------------------

  if (isEditMode && !existingPrompt) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] px-4 pt-32">
        <div className="max-w-xl mx-auto text-center">

          <div
            className="
              w-14 h-14
              mx-auto
              mb-5
              rounded-2xl
              bg-white
              border border-black/6
              flex items-center justify-center
            "
          >
            <FileText className="w-6 h-6 text-[#8A8881]" />
          </div>

          <h1 className="text-2xl font-semibold text-[#252525]">
            Prompt not found
          </h1>

          <p className="mt-2 text-sm text-[#77756F]">
            The prompt you're trying to edit doesn't
            exist or is no longer available.
          </p>

          <Link
            to="/discover"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              px-4
              h-10
              rounded-xl
              bg-[#252525]
              text-white
              text-sm
              font-medium
              hover:bg-[#111]
              transition-colors
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Discover
          </Link>

        </div>
      </div>
    );
  }

  // Check authorization: only prompt author can edit
  if (isEditMode && existingPrompt && user) {
    const isAuthor = (
      existingPrompt.author.handle === `@${user.username}` ||
      existingPrompt.author.name === user.fullName ||
      existingPrompt.author.name === user.firstName
    );
    
    if (!isAuthor) {
      return (
        <div className="min-h-screen bg-[#F7F6F2] px-4 pt-32">
          <div className="max-w-xl mx-auto text-center">

            <div
              className="
                w-14 h-14
                mx-auto
                mb-5
                rounded-2xl
                bg-white
                border border-black/6
                flex items-center justify-center
              "
            >
              <FileText className="w-6 h-6 text-[#8A8881]" />
            </div>

            <h1 className="text-2xl font-semibold text-[#252525]">
              Unauthorized
            </h1>

            <p className="mt-2 text-sm text-[#77756F]">
              You can only edit prompts you've created.
            </p>

            <Link
              to="/discover"
              className="
                inline-flex
                items-center
                gap-2
                mt-6
                px-4
                h-10
                rounded-xl
                bg-[#252525]
                text-white
                text-sm
                font-medium
                hover:bg-[#111]
                transition-colors
              "
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Discover
            </Link>

          </div>
        </div>
      );
    }
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div
      className="
        min-h-screen
        bg-[#F7F6F2]
        text-[#252525]
      "
    >

      <SubmitPromptHeader
        isEditMode={isEditMode}
        id={id}
        showPreview={showPreview}
        onTogglePreview={() =>
          setShowPreview((prev) => !prev)
        }
      />

      <main
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-12
        "
      >

        {!showPreview ? (

          <form
            onSubmit={handleSubmit}
            className="space-y-16"
          >

            <PromptBasicInfo
              title={title}
              description={description}
              errors={errors}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              imageSrc={catOne}
              imageAlt="Illustration of a black cat"
            />

            <PromptContentEditor
              content={content}
              error={errors.content}
              onContentChange={setContent}
              imageSrc={dogOne}
              imageAlt="Illustration of a dog"
            />

            <PromptMetadataSection
              category={category}
              model={model}
              tags={tags}
              tagInput={tagInput}
              errors={errors}
              categories={categories}
              models={models}
              onCategoryChange={setCategory}
              onModelChange={setModel}
              onTagInputChange={setTagInput}
              onTagKeyDown={handleTagKeyDown}
              onAddTag={addTag}
              onRemoveTag={removeTag}
              imageSrc={catTwo}
              imageAlt="Illustration of a black cat"
            />

            <PromptExampleSection
              exampleDescription={exampleDescription}
              exampleInput={exampleInput}
              exampleOutput={exampleOutput}
              onExampleDescriptionChange={setExampleDescription}
              onExampleInputChange={setExampleInput}
              onExampleOutputChange={setExampleOutput}
              previewImageUrl={displayedImageUrl}
              previewImageName={displayedImageName}
              previewImageSize={displayedImageSize}
              onPreviewImageSelect={handlePreviewImageSelect}
              onPreviewImageRemove={handlePreviewImageRemove}
              isProcessingImage={isProcessingImage}
              imageError={imageError}
              imageSrc={dogTwo}
              imageAlt="Illustration of a dog"
            />

            <PromptSettings
              visibility={visibility}
              onVisibilityChange={setVisibility}
            />

            <SubmitPromptActions
              isEditMode={isEditMode}
              isSaving={isSaving}
              id={id}
            />

          </form>

        ) : (

          <PromptPreview
            category={category}
            model={model}
            title={title}
            description={description}
            content={content}
            tags={tags}
            exampleDescription={exampleDescription}
            exampleInput={exampleInput}
            exampleOutput={exampleOutput}
            previewImageUrl={displayedImageUrl}
          />

        )}

      </main>

    </div>
  );
}
