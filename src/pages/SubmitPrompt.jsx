import { useEffect, useMemo, useState } from "react";
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

import catOne from "../assets/pic16.png";
import dogOne from "../assets/pic17.png";
import catTwo from "../assets/pic19.png";
import dogTwo from "../assets/pic18.png";

// ---------------------------------------------------------
// Temporary mock data.
// This will eventually come from your backend.
// ---------------------------------------------------------

const mockPrompts = [
  {
    id: "prompt-1",
    title: "Senior React Hooks Consultant",
    description:
      "A prompt that helps analyze React hook usage and suggest production-quality improvements.",
    content:
      "Act as a senior React engineer. Analyze the following React component...",
    category: "Coding",
    tags: ["React", "JavaScript", "Frontend"],
    model: "ChatGPT",
    visibility: "public",
  },
];

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

  const [exampleInput, setExampleInput] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");

  const [showPreview, setShowPreview] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // -------------------------------------------------------
  // Populate form when editing
  // -------------------------------------------------------

  useEffect(() => {
    if (!existingPrompt) return;

    setTitle(existingPrompt.title || "");
    setDescription(existingPrompt.description || "");
    setContent(existingPrompt.content || "");
    setCategory(existingPrompt.category || "");
    setModel(existingPrompt.model || "");
    setVisibility(existingPrompt.visibility || "public");
    setTags(existingPrompt.tags || []);
  }, [existingPrompt]);

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

    setIsSaving(true);

    const promptData = {
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      category,
      model,
      tags,
      visibility,
      exampleInput: exampleInput.trim(),
      exampleOutput: exampleOutput.trim(),
    };

    // Simulate async operation
    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    if (isEditMode) {
      // Update existing prompt
      updatePrompt(id, promptData);
      setIsSaving(false);
      navigate(`/prompt/${id}`);
    } else {
      // Create new prompt
      addPrompt(promptData);
      setIsSaving(false);
      navigate("/profile");
    }
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
              exampleInput={exampleInput}
              exampleOutput={exampleOutput}
              onExampleInputChange={setExampleInput}
              onExampleOutputChange={setExampleOutput}
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
          />

        )}

      </main>

    </div>
  );
}