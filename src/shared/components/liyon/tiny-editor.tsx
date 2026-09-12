"use client";

import { useEffect, useRef, useState, useId } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface TinyMceInstance {
  setContent: (content: string) => void;
  getContent: () => string;
  remove: () => void;
  on: (events: string, handler: () => void) => void;
  mode: {
    set: (mode: "readonly" | "design") => void;
  };
}

export interface TinyMceGlobal {
  get: (id: string) => TinyMceInstance | null | undefined;
  init: (settings: Record<string, unknown>) => void;
}

declare global {
  interface Window {
    tinymce?: TinyMceGlobal;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadTinyMceScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.tinymce) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="tinymce"]');
    if (existing) {
      if (window.tinymce) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", (err) => reject(err));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.3/tinymce.min.js";
    script.referrerPolicy = "origin";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export interface TinyEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  disabled?: boolean;
  className?: string;
}

export function TinyEditor({
  id: customId,
  value,
  onChange,
  placeholder = "พิมพ์เนื้อหาข่าวสารที่นี่...",
  height = 360,
  disabled = false,
  className,
}: TinyEditorProps) {
  const generatedId = useId().replace(/:/g, "_");
  const editorId = customId || `tinymce_${generatedId}`;
  const [ready, setReady] = useState(false);
  const editorRef = useRef<TinyMceInstance | null>(null);
  const isInternalChange = useRef(false);
  const latestValueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const disabledRef = useRef(disabled);

  useEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  useEffect(() => {
    let isMounted = true;

    loadTinyMceScript()
      .then(() => {
        if (!isMounted) return;
        if (!window.tinymce) return;

        // Clean up previous instance if exists
        const existingEditor = window.tinymce.get(editorId);
        if (existingEditor) {
          existingEditor.remove();
        }

        window.tinymce.init({
          selector: `#${editorId}`,
          height,
          menubar: false,
          statusbar: true,
          branding: false,
          promotion: false,
          elementpath: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "table",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough | forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
            "table link blockquote hr | removeformat code fullscreen",
          placeholder,
          readonly: disabledRef.current,
          content_style: `
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              font-size: 14px;
              line-height: 1.65;
              color: #1c1917;
              padding: 10px 14px;
            }
            p { margin: 0 0 10px 0; }
            h1, h2, h3, h4 { color: #0c0a09; font-weight: 700; margin-top: 14px; margin-bottom: 8px; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 12px; }
            th, td { border: 1px solid #e7e5e4; padding: 6px 10px; }
            th { background-color: #f5f5f4; font-weight: 600; }
            blockquote { border-left: 3px solid #d97706; padding-left: 12px; margin: 12px 0; color: #78716c; font-style: italic; }
          `,
          setup: (editor: TinyMceInstance) => {
            editorRef.current = editor;

            editor.on("init", () => {
              if (isMounted) {
                setReady(true);
                if (latestValueRef.current) {
                  editor.setContent(latestValueRef.current);
                }
              }
            });

            const handleContentChange = () => {
              const html = editor.getContent();
              isInternalChange.current = true;
              onChangeRef.current(html);
            };

            editor.on("change keyup paste input undo redo", handleContentChange);
          },
        });
      })
      .catch((err) => {
        console.error("Failed to load TinyMCE script:", err);
      });

    return () => {
      isMounted = false;
      if (window.tinymce) {
        const editor = window.tinymce.get(editorId);
        if (editor) {
          editor.remove();
        }
      }
      editorRef.current = null;
    };
  }, [editorId, height, placeholder]);

  // Synchronize value updates from outside (e.g. Gemini AI translate, form reset)
  useEffect(() => {
    if (!editorRef.current || !ready) return;

    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }

    const currentContent = editorRef.current.getContent();
    if (value !== currentContent) {
      editorRef.current.setContent(value || "");
    }
  }, [value, ready]);

  // Handle disabled prop update
  useEffect(() => {
    if (editorRef.current && ready) {
      editorRef.current.mode.set(disabled ? "readonly" : "design");
    }
  }, [disabled, ready]);

  return (
    <div
      className={cn(
        "relative rounded-lg border border-border/80 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-brand/40 bg-background",
        className
      )}
    >
      <style>{`
        .tox-tinymce-aux {
          z-index: 99999 !important;
        }
        .tox.tox-tinymce {
          border: none !important;
          border-radius: 0 !important;
        }
        .tox .tox-statusbar {
          border-top: 1px solid hsl(var(--border) / 0.6) !important;
        }
      `}</style>
      {!ready && (
        <div
          className="flex flex-col items-center justify-center gap-2 bg-muted/20 text-muted-foreground"
          style={{ height }}
        >
          <Loader2 className="w-5 h-5 animate-spin text-brand" />
          <span className="text-xs">กำลังโหลดตัวแก้ไขข้อความ Tiny Editor...</span>
        </div>
      )}
      <div
        className={cn(
          "w-full",
          !ready && "opacity-0 absolute top-0 left-0 pointer-events-none -z-10"
        )}
      >
        <textarea id={editorId} defaultValue={value} />
      </div>
    </div>
  );
}
