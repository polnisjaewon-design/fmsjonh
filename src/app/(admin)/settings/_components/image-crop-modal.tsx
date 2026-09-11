"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
  RotateCcw,
  Check,
  Globe,
  Loader2,
  FileImage,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import {
  LiyonDialog,
  LiyonDialogHeader,
  LiyonDialogCloseButton,
  LiyonDialogBody,
  LiyonDialogFooter,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
import { useT } from "@/shared/lib/i18n/client";
import { cn } from "@/shared/lib/utils";

interface ImageCropModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (file: File) => Promise<void> | void;
  currentLogoUrl?: string;
}

const PREVIEW_SIZE = 320;
const MAX_FILE_SIZE_BYTES = 200 * 1024; // 200 KB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export function ImageCropModal({
  open,
  onOpenChange,
  onApply,
  currentLogoUrl,
}: ImageCropModalProps) {
  const t = useT();

  // Selected image state
  const [_imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [originalMime, setOriginalMime] = useState<string>("image/jpeg");
  const [urlInput, setUrlInput] = useState<string>(currentLogoUrl ?? "");
  const [loadingUrl, setLoadingUrl] = useState<boolean>(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Editor controls state
  const [zoom, setZoom] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Dragging inside canvas
  const [isDraggingCanvas, setIsDraggingCanvas] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Drop zone state
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);

  // Compression & Live file size state
  const [calculatedSizeKb, setCalculatedSizeKb] = useState<number | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset controls when a new image is loaded
  const resetTransforms = useCallback(() => {
    setZoom(1.0);
    setRotation(0);
    setPan({ x: 0, y: 0 });
  }, []);

  // Handle setting image source
  const loadSource = useCallback(
    (src: string, mime = "image/jpeg") => {
      setImageSrc(src);
      setOriginalMime(mime);
      setUrlError(null);
      resetTransforms();

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setImageElement(img);
      };
      img.onerror = () => {
        setUrlError("ไม่สามารถโหลดภาพจากแหล่งนี้ได้ (อาจติดปัญหา CORS หรือลิงก์ไม่ถูกต้อง)");
      };
      img.src = src;
    },
    [resetTransforms]
  );

  // Handle local file selection
  const handleFile = useCallback(
    (file: File) => {
      if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
        setUrlError("รองรับเฉพาะไฟล์ประเภท PNG, JPG, JPEG เท่านั้น");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          loadSource(result, file.type);
        }
      };
      reader.readAsDataURL(file);
    },
    [loadSource]
  );

  // Handle external URL load
  const handleLoadFromUrl = useCallback(() => {
    if (!urlInput.trim()) return;
    setLoadingUrl(true);
    setUrlError(null);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setImageElement(img);
      setImageSrc(urlInput.trim());
      setOriginalMime("image/jpeg");
      resetTransforms();
      setLoadingUrl(false);
    };
    img.onerror = () => {
      setUrlError("ไม่สามารถเข้าถึงรูปภาพจาก URL นี้ได้ กรุณาตรวจสอบลิงก์หรือบันทึกรูปลงเครื่องแล้วอัปโหลด");
      setLoadingUrl(false);
    };
    img.src = urlInput.trim();
  }, [urlInput, resetTransforms]);

  // Draw preview onto canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageElement) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = PREVIEW_SIZE;
    const height = PREVIEW_SIZE;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Save
    ctx.save();

    // Clip to rounded crop frame
    const cornerRadius = 16;
    ctx.beginPath();
    ctx.moveTo(cornerRadius, 0);
    ctx.lineTo(width - cornerRadius, 0);
    ctx.quadraticCurveTo(width, 0, width, cornerRadius);
    ctx.lineTo(width, height - cornerRadius);
    ctx.quadraticCurveTo(width, height, width - cornerRadius, height);
    ctx.lineTo(cornerRadius, height);
    ctx.quadraticCurveTo(0, height, 0, height - cornerRadius);
    ctx.lineTo(0, cornerRadius);
    ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
    ctx.closePath();
    ctx.clip();

    // Fill subtle checkerboard/canvas background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    // Subtle grid pattern for transparency awareness
    ctx.fillStyle = "#e2e8f0";
    const tileSize = 16;
    for (let x = 0; x < width; x += tileSize * 2) {
      for (let y = 0; y < height; y += tileSize * 2) {
        ctx.fillRect(x, y, tileSize, tileSize);
        ctx.fillRect(x + tileSize, y + tileSize, tileSize, tileSize);
      }
    }

    // Apply transformations (Center -> Pan -> Rotate -> Zoom)
    ctx.translate(width / 2, height / 2);
    ctx.translate(pan.x, pan.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Draw image centered
    const imgAspect = imageElement.width / imageElement.height;
    let drawWidth = width;
    let drawHeight = height;

    if (imgAspect > 1) {
      drawHeight = height;
      drawWidth = height * imgAspect;
    } else {
      drawWidth = width;
      drawHeight = width / imgAspect;
    }

    ctx.drawImage(
      imageElement,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    );

    // Restore
    ctx.restore();

    // Draw crop boundary overlay border
    ctx.save();
    ctx.strokeStyle = "rgba(59, 130, 246, 0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, width - 4, height - 4);

    // Draw 3x3 rule of thirds guide lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 3, 0);
    ctx.lineTo(width / 3, height);
    ctx.moveTo((width * 2) / 3, 0);
    ctx.lineTo((width * 2) / 3, height);
    ctx.moveTo(0, height / 3);
    ctx.lineTo(width, height / 3);
    ctx.moveTo(0, (height * 2) / 3);
    ctx.lineTo(width, (height * 2) / 3);
    ctx.stroke();

    ctx.restore();
  }, [imageElement, zoom, rotation, pan]);

  // Produce compressed export blob (guarantee <= 200 KB)
  const generateExportBlob = useCallback(
    async (): Promise<{ blob: Blob; sizeKb: number } | null> => {
      if (!imageElement) return null;

      const exportSizes = [512, 400, 320];
      const targetMime = originalMime === "image/png" ? "image/png" : "image/jpeg";

      for (const outSize of exportSizes) {
        const offscreen = document.createElement("canvas");
        offscreen.width = outSize;
        offscreen.height = outSize;
        const ctx = offscreen.getContext("2d");
        if (!ctx) continue;

        // Fill background white for JPEG (or transparent for PNG)
        if (targetMime === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, outSize, outSize);
        }

        const scaleRatio = outSize / PREVIEW_SIZE;

        ctx.save();
        ctx.translate(outSize / 2, outSize / 2);
        ctx.translate(pan.x * scaleRatio, pan.y * scaleRatio);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(zoom * scaleRatio, zoom * scaleRatio);

        const imgAspect = imageElement.width / imageElement.height;
        let drawWidth = PREVIEW_SIZE;
        let drawHeight = PREVIEW_SIZE;
        if (imgAspect > 1) {
          drawHeight = PREVIEW_SIZE;
          drawWidth = PREVIEW_SIZE * imgAspect;
        } else {
          drawWidth = PREVIEW_SIZE;
          drawHeight = PREVIEW_SIZE / imgAspect;
        }

        ctx.drawImage(
          imageElement,
          -drawWidth / 2,
          -drawHeight / 2,
          drawWidth,
          drawHeight
        );
        ctx.restore();

        // If target is PNG, test if it fits <= 200 KB
        if (targetMime === "image/png") {
          const pngBlob = await new Promise<Blob | null>((res) =>
            offscreen.toBlob(res, "image/png")
          );
          if (pngBlob && pngBlob.size <= MAX_FILE_SIZE_BYTES) {
            return { blob: pngBlob, sizeKb: Math.round(pngBlob.size / 1024) };
          }
        }

        // If PNG exceeds or JPEG is selected, compress via JPEG quality step-down
        const qualitySteps = [0.92, 0.82, 0.72, 0.62, 0.52, 0.4];
        for (const q of qualitySteps) {
          const jpegBlob = await new Promise<Blob | null>((res) =>
            offscreen.toBlob(res, "image/jpeg", q)
          );
          if (jpegBlob && jpegBlob.size <= MAX_FILE_SIZE_BYTES) {
            return { blob: jpegBlob, sizeKb: Math.round(jpegBlob.size / 1024) };
          }
        }
      }

      // Fallback: lowest acceptable resolution and quality
      const offscreen = document.createElement("canvas");
      offscreen.width = 256;
      offscreen.height = 256;
      const ctx = offscreen.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 256, 256);
        ctx.drawImage(imageElement, 0, 0, 256, 256);
      }
      const finalBlob = await new Promise<Blob | null>((res) =>
        offscreen.toBlob(res, "image/jpeg", 0.6)
      );
      if (finalBlob) {
        return { blob: finalBlob, sizeKb: Math.round(finalBlob.size / 1024) };
      }
      return null;
    },
    [imageElement, originalMime, pan, rotation, zoom]
  );

  // Calculate live preview size when transform or image changes
  useEffect(() => {
    if (!imageElement) return;

    let active = true;
    const timer = setTimeout(async () => {
      setIsCompressing(true);
      try {
        const res = await generateExportBlob();
        if (active && res) {
          setCalculatedSizeKb(res.sizeKb);
        }
      } finally {
        if (active) setIsCompressing(false);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [imageElement, zoom, rotation, pan, generateExportBlob]);

  // Handle canvas mouse/touch dragging (pan)
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDraggingCanvas(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingCanvas) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  // Center alignment handler (ปรับตรงกลาง)
  const handleCenterAlign = () => {
    setPan({ x: 0, y: 0 });
  };

  // Rotate 90 degrees handler
  const handleRotate90 = () => {
    setRotation((prev) => (prev + 90 > 180 ? prev + 90 - 360 : prev + 90));
  };

  // Apply and save
  const handleApply = async () => {
    if (!imageElement) return;
    setIsSaving(true);
    try {
      const exportData = await generateExportBlob();
      if (!exportData) {
        setUrlError("ไม่สามารถส่งออกภาพได้");
        return;
      }
      const ext = exportData.blob.type === "image/png" ? "png" : "jpg";
      const file = new File([exportData.blob], `logo-cropped-${Date.now()}.${ext}`, {
        type: exportData.blob.type,
      });

      await onApply(file);
      onOpenChange(false);
    } catch (err) {
      setUrlError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการบันทึกภาพ");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <LiyonDialog open={open} onOpenChange={onOpenChange} wide>
      <LiyonDialogCloseButton label={t("settings.cancel")} />
      <LiyonDialogHeader
        title={t("settings.cropModalTitle")}
        description={t("settings.cropModalDesc")}
      />

      <LiyonDialogBody className="space-y-4">
        {urlError && (
          <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{urlError}</span>
          </div>
        )}

        {/* SECTION 1: Image Source Selection (Dropzone & URL Import) */}
        {!imageElement ? (
          <div className="space-y-4">
            {/* Drag and drop zone */}
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
                isDraggingFile
                  ? "border-brand bg-brand/5 scale-[1.01]"
                  : "border-border hover:border-brand/60 hover:bg-muted/40"
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingFile(true);
              }}
              onDragLeave={() => setIsDraggingFile(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingFile(false);
                const droppedFile = e.dataTransfer.files?.[0];
                if (droppedFile) handleFile(droppedFile);
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                  e.target.value = "";
                }}
              />
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="p-3 bg-brand/10 text-brand rounded-full">
                  <Upload className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-base">
                    {t("settings.dropZonePrompt")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("settings.dropZoneHint")}
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  <FileImage className="mr-2 h-4 w-4" />
                  เลือกไฟล์จากเครื่อง
                </Button>
              </div>
            </div>

            {/* External URL Import */}
            <div className="p-4 bg-muted/40 rounded-xl border border-border/50 space-y-2">
              <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-brand" />
                {t("settings.fromUrlTitle")}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder={t("settings.fromUrlPlaceholder")}
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/40"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleLoadFromUrl();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleLoadFromUrl}
                  disabled={loadingUrl || !urlInput.trim()}
                >
                  {loadingUrl ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    t("settings.loadFromUrl")
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* SECTION 2: Interactive Cropper Canvas & Manipulation Tools */
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
              {/* Canvas viewport */}
              <div className="relative group shrink-0">
                <canvas
                  ref={canvasRef}
                  width={PREVIEW_SIZE}
                  height={PREVIEW_SIZE}
                  className="rounded-2xl shadow-md border border-border/80 cursor-grab active:cursor-grabbing bg-slate-900/5 transition-transform"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{ width: `${PREVIEW_SIZE}px`, height: `${PREVIEW_SIZE}px` }}
                  title="คลิกแล้วลากเพื่อปรับเลื่อนตำแหน่งรูปภาพ"
                />
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/65 text-white text-[11px] rounded-md backdrop-blur-sm pointer-events-none flex items-center gap-1">
                  <Move className="h-3 w-3" />
                  ลากเพื่อขยับ
                </div>
              </div>

              {/* Manipulation Control Sliders */}
              <div className="flex-1 w-full space-y-4 max-w-sm">
                {/* Tool: Zoom (ย่อ/ขยาย) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <ZoomIn className="h-3.5 w-3.5 text-brand" />
                      {t("settings.toolZoom")}
                    </span>
                    <span className="text-muted-foreground tabular-nums">
                      {zoom.toFixed(2)}x
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setZoom((z) => Math.max(0.5, Number((z - 0.1).toFixed(2))))}
                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                      title="ย่อขนาด"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-brand"
                    />
                    <button
                      type="button"
                      onClick={() => setZoom((z) => Math.min(3.0, Number((z + 0.1).toFixed(2))))}
                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                      title="ขยายขนาด"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Tool: Rotation & Tilt (ปรับความเอียง) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <RotateCw className="h-3.5 w-3.5 text-brand" />
                      {t("settings.toolRotate")}
                    </span>
                    <span className="text-muted-foreground tabular-nums">{rotation}°</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="1"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value, 10))}
                      className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-brand"
                    />
                  </div>
                </div>

                {/* Quick alignment buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCenterAlign}
                    className="text-xs h-8 gap-1.5"
                  >
                    <Move className="h-3.5 w-3.5" />
                    {t("settings.toolCenter")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRotate90}
                    className="text-xs h-8 gap-1.5"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    {t("settings.rotate90")}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={resetTransforms}
                    className="text-xs h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t("settings.resetCrop")}
                  </Button>
                </div>

                {/* Live Compressed File Size Indicator (<= 200 KB) */}
                <div className="p-2.5 rounded-lg border bg-muted/40 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {t("settings.fileSizeLabel")}
                    </span>
                    <span className="font-semibold tabular-nums text-foreground flex items-center gap-1">
                      {isCompressing ? (
                        <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                      ) : (
                        `${calculatedSizeKb ?? 0} KB`
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
                    <Check className="h-3.5 w-3.5 shrink-0" />
                    <span>{t("settings.fileSizeOk")}</span>
                  </div>
                </div>

                {/* Switch picture button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setImageElement(null);
                    setImageSrc(null);
                    setCalculatedSizeKb(null);
                  }}
                  className="text-xs h-7 text-muted-foreground hover:text-foreground w-full justify-center"
                >
                  <RefreshCw className="mr-1.5 h-3 w-3" />
                  เลือกรูปภาพใหม่
                </Button>
              </div>
            </div>
          </div>
        )}
      </LiyonDialogBody>

      <LiyonDialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isSaving}
        >
          {t("settings.cancel")}
        </Button>
        {imageElement && (
          <Button
            type="button"
            onClick={handleApply}
            disabled={isSaving || isCompressing}
            className="gap-2 bg-brand text-white hover:bg-brand/90"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("settings.cropProcessing")}
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                {t("settings.applyCrop")}
              </>
            )}
          </Button>
        )}
      </LiyonDialogFooter>
    </LiyonDialog>
  );
}
